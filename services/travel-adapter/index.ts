require('./env-validation');
import express, { Request, Response } from 'express';
import axios from 'axios';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { SLAABI, MessengerABI } from './abis';

// import { fetchVisualCrossingData, fetchOpenWeatherData, fetchWeatherbitData, fetchWeatherSourceData, fetchTomorrowIOData } from './weather-data-sources';
import { fetchVisualCrossingData } from './weather-data-sources';

type SLAData = {
    serviceName: string;
    serviceDescription: string;
    serviceImage: string;
    serviceURL: string;
    serviceAddress: string;
    serviceTicker: string;
    serviceUseTestExternalAdapter: boolean;
    serviceSliMockingPlan: Array<number>;
    periodType: number;
    messengerAddress: string;
    coverageType: string;
    tripStartDate: number;
    tripEndDate: number;
    coordinates: {
        lat: number;
        long: number;
    };
    maxDeviation: number;
};

async function getSLAData(address: string, networkName: string): Promise<SLAData> {
    console.log('[SLA] Contract address:', address); // Log the contract address
    console.log('[SLA] Network name:', networkName); // Log the network name
    const web3 = new Web3(process.env[`${networkName.toUpperCase()}_URI`]);
    const slaContract = new web3.eth.Contract(SLAABI as AbiItem[], address);
    console.log('[SLA] Successfully instantiated web3 and slaContract variables'); // Log progress

    const periodType = await slaContract.methods.periodType().call();
    console.log('[SLA] Period type:', periodType); // Log the period type

    const ipfsCID = await slaContract.methods.ipfsHash().call();
    console.log('[SLA] IPFS CID:', ipfsCID); // Log the IPFS CID

    const messengerAddress = await slaContract.methods.messengerAddress().call();
    console.log('[SLA] Messenger address:', messengerAddress); // Log the messenger address

    const { data } = await axios.get(`${process.env.IPFS_GATEWAY_URI}/ipfs/${ipfsCID}`);
    return { ...data, periodType, messengerAddress };
}

async function getMessengerPrecision(messengerAddress: string, networkName: string): Promise<number> {
    console.log('[MESSENGER] networkName:', networkName);
    const web3 = new Web3(process.env[`${networkName.toUpperCase()}_URI`]);
    const messenger = new web3.eth.Contract(MessengerABI as AbiItem[], messengerAddress);
    return await messenger.methods.messengerPrecision().call();
}

const app = express();
app.use(express.json());

async function fetchWeatherData(location, startDate, endDate) {
    // Convert Unix timestamps to ISO date strings for weather API calls
    const startDateISO = new Date(startDate * 1000).toISOString().split('T')[0];
    const endDateISO = new Date(endDate * 1000).toISOString().split('T')[0];

    const visualCrossingData = await fetchVisualCrossingData({ location, startDate: startDateISO, endDate: endDateISO });
    // Add additional data source calls here

    console.log('[WEATHER] fetchVisualCrossingData in index.ts:', { visualCrossingData });

    const weatherDataSources = [
        visualCrossingData,
    ];

    return weatherDataSources;
}

function calculatePercentageDifference(actual: number, historical: number) {
    if (historical === 0) {
        return actual === 0 ? 0 : 100;
    } else {
        return Math.abs(((actual - historical) / historical) * 100);
    }
}

function processDataAndCalculateSLI(weatherDataSources: any[], messengerPrecision, slaData: SLAData) {
    const totalDays = weatherDataSources[0].length;
    const totalDataSources = weatherDataSources.length;
    const maxDeviation = slaData.maxDeviation / messengerPrecision;

    console.log('[SLO] maxDeviation:', maxDeviation);
    console.log('[SLO] coverageType:', slaData.coverageType);

    let daysMetMaxDeviation = 0;
    let daysInTrip = 0;

    // Get start and end dates Unix timestamp
    const tripStartDateTimestamp = slaData.tripStartDate;
    const tripEndDateTimestamp = slaData.tripEndDate;
    console.log('[SLI] tripStartDateTimeStamp:', tripStartDateTimestamp, ' - readable:', new Date(tripStartDateTimestamp * 1000).toUTCString());
    console.log('[SLI] tripEndDateTimeStamp:', tripEndDateTimestamp, ' - readable:', new Date(tripEndDateTimestamp * 1000).toUTCString());


    // Iterate over the days
    for (let i = 0; i < totalDays; i++) {
        const dailyData = weatherDataSources.map(source => source[i]);

        // Convert the raw date to a Unix timestamp
        const rawDateTimestamp = new Date(dailyData[0].date).getTime() / 1000;

        console.log('[SLI] rawDateTimeStamp:', rawDateTimestamp, ' - readable:', new Date(rawDateTimestamp * 1000).toUTCString());

        // Check if the date is within the trip dates
        if (rawDateTimestamp >= tripStartDateTimestamp && rawDateTimestamp <= tripEndDateTimestamp) {
            daysInTrip++;

            const avgActualTemperature = dailyData.reduce((sum, day) => sum + day.actualTemperature.avg, 0) / totalDataSources;
            const avgActualPrecipitation = dailyData.reduce((sum, day) => sum + day.actualPrecipitation, 0) / totalDataSources;
            const avgHistoricalTemperature = dailyData.reduce((sum, day) => sum + day.historicalTemperature.avg, 0) / totalDataSources;
            const avgHistoricalPrecipitation = dailyData.reduce((sum, day) => sum + day.historicalPrecipitation, 0) / totalDataSources;

            console.log('[SLI-TRIP] readableDate:', new Date(dailyData[0].date).toUTCString());
            console.log('[SLI-TRIP] rawDate:', dailyData[0].date);
            console.log('[SLI-TRIP] avgActualTemperature:', avgActualTemperature);
            console.log('[SLI-TRIP] avgActualPrecipitation:', avgActualPrecipitation);
            console.log('[SLI-TRIP] avgHistoricalTemperature:', avgHistoricalTemperature);
            console.log('[SLI-TRIP] avgHistoricalPrecipitation:', avgHistoricalPrecipitation);

            // Calculate the percentage difference for temperature and precipitation
            const temperatureDifference = calculatePercentageDifference(avgActualTemperature, avgHistoricalTemperature);
            const precipitationDifference = calculatePercentageDifference(avgActualPrecipitation, avgHistoricalPrecipitation);

            console.log('[SLI-TRIP] temperatureDifference:', temperatureDifference);
            console.log('[SLI-TRIP] precipitationDifference:', precipitationDifference);

            // Check if the day met the maxDeviation parameter
            if (slaData.coverageType === 'temperature') {
                // For temperature coverage type, we only care about temperature difference
                if (avgActualTemperature < avgHistoricalTemperature) {
                    if (temperatureDifference <= maxDeviation) {
                        daysMetMaxDeviation++;
                    }
                } else {
                    daysMetMaxDeviation++; // Actual temperature is greater than or equal to Historical, so it meets the SLA
                }
            } else if (slaData.coverageType === 'precipitation') {
                // For precipitation coverage type, we only care about precipitation difference
                if (avgActualPrecipitation > avgHistoricalPrecipitation) {
                    if (precipitationDifference <= maxDeviation) {
                        daysMetMaxDeviation++;
                    }
                } else {
                    daysMetMaxDeviation++; // Actual precipitation is less than or equal to Historical, so it meets the SLA
                }
            }

        }
    }

    console.log('[SLI] daysInTrip:', daysInTrip);
    console.log('[SLI] daysMetMaxDeviation:', daysMetMaxDeviation);

    // Calculate the SLI based on the number of days meeting the SLO within the trip dates
    let SLI = 0;
    if (daysInTrip > 0) {
        SLI = (daysMetMaxDeviation / daysInTrip) * 100;
    }

    console.log('[SLI] SLI:', SLI);

    return Math.round(SLI * messengerPrecision);
}

app.post('/', async (req: Request, res: Response) => {
    try {
        const { data } = req.body;
        const { period_start: periodStart, period_end: periodEnd, network_name: networkName, coverageType } = data;

        // Log entire request body
        console.log(`[POST] Request received with periodStart: ${periodStart}, periodEnd: ${periodEnd}, networkName: ${networkName}, coverageType: ${coverageType}`);
        console.log('[POST] Request body:', req.body);

        const requestData = {
            sla_address: data.sla_address,
        };

        const slaData = await getSLAData(requestData.sla_address, networkName);
        console.log('[POST] SLA Data:', slaData);

        const location = slaData.coordinates;
        const locationString = `${slaData.coordinates.lat},${slaData.coordinates.long}`;
        console.log('[POST] SLA Data retrieved with location:', location);
        console.log('[POST] Location string conversion:', locationString);

        const messengerPrecision = await getMessengerPrecision(slaData.messengerAddress, networkName);
        console.log('[POST] Messenger Precision:', messengerPrecision);

        const weatherData = await fetchWeatherData(locationString, periodStart, periodEnd);

        console.log("[POST] Fetched weather data:", weatherData);

        const SLI = processDataAndCalculateSLI(weatherData, messengerPrecision, slaData);
        console.log('[POST] Calculated SLI:', SLI);

        res.status(200).json({ data: { result: SLI } });
    } catch (error: any) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Testing endpoint for use when adding new data sources to allow testing without full SLA / DTK deployment
app.post('/test-sli', async (req: Request, res: Response) => {
    try {
        const { data } = req.body;
        const { period_start: periodStart, period_end: periodEnd, location, maxDeviation, coordinates, coverageType, tripStartDate, tripEndDate } = data;
        const precision = 1000000; // Replace with a suitable precision value for testing

        console.log('[POST] Request body:', req.body);

        const weatherData = await fetchWeatherData(location, periodStart, periodEnd);

        console.log("[POST] Fetched weather data:", weatherData);

        // Create a custom slaData object using values from the request body
        const customSLAData: SLAData = {
            serviceName: "Test Service",
            serviceDescription: "Test Service Description",
            serviceImage: "",
            serviceURL: "",
            serviceAddress: "",
            serviceTicker: "",
            serviceUseTestExternalAdapter: false,
            serviceSliMockingPlan: [],
            periodType: 0,
            messengerAddress: "",
            coverageType: coverageType,
            tripStartDate: tripStartDate,
            tripEndDate: tripEndDate,
            coordinates: coordinates,
            maxDeviation: maxDeviation,
        };

        const SLI = processDataAndCalculateSLI(weatherData, precision, customSLAData);
        res.status(200).json({ data: { result: SLI } });
    } catch (error: any) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

const HOST = process.env.HOST || '0.0.0.0';
const PORT = Number(process.env.PORT) || 6070;

app.listen(PORT, HOST, () => {
    console.log(`Server is running on port ${PORT}`);
});

console.log(`Trying to start server on port ${PORT}`);