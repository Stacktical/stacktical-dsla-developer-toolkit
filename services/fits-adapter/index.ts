require('./env-validation');
import express, { Request, Response } from 'express';
import axios from 'axios';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { SLAABI, MessengerABI } from './abis';

// import { fetchOpenWeatherData, fetchWeatherbitData, fetchNoaaData, fetchWeatherSourceData } from './weather-data-sources';
import { fetchWeatherSourceData } from './weather-data-sources';

const networkName = process.env.NETWORK_NAME;

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
};

async function getSLAData(address: string, networkName: string): Promise<SLAData> {
    console.log('[SLA] networkName:', networkName);
    const web3 = new Web3(process.env[`${networkName.toUpperCase()}_URI`]);
    const slaContract = new web3.eth.Contract(SLAABI as AbiItem[], address);
    const ipfsCID = await slaContract.methods.ipfsHash().call();
    const periodType = await slaContract.methods.periodType().call();
    const messengerAddress = await slaContract.methods.messengerAddress().call();
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
    const history = await fetchWeatherSourceData({ location, startDate, endDate });

    console.log('[WEATHER] fetchWeatherData in index.ts:', { history });

    return { history };
}

/*
function processDataAndCalculateSLI(weatherData, periodStart, periodEnd, precision, coverageType) {
    const deviations = [];

    // Calculate z-scores for each data source
    const zScores = calculateZScores(weatherData);

    console.log('[PROCESS] processDataAndCalculateSLI: zScores:', zScores);

    for (const day in weatherData) {
        const dailyDeviations = [];

        for (const source in weatherData[day]) {
            const deviation = zScores[day][source];
            dailyDeviations.push(deviation);
        }

        // Calculate the weighted average of z-scores for the day
        const weightedAvgZScore = calculateWeightedAverage(dailyDeviations);
        deviations.push(weightedAvgZScore);
    }

    // Calculate the average deviation across all days in the vacation period
    const avgDeviation = deviations.reduce((sum, deviation) => sum + deviation, 0) / deviations.length;

    // Determine if the deviation meets the criteria for compensation
    let compensation = false;

    if (coverageType === 'tooCold' && avgDeviation < 0) {
        compensation = true;
    } else if (coverageType === 'tooHot' && avgDeviation > 0) {
        compensation = true;
    } else if (coverageType === 'both' && avgDeviation !== 0) {
        compensation = true;
    }

    // Calculate the SLI based on the compensation status and the average deviation
    const SLI = compensation ? precision * (1 + Math.abs(avgDeviation)) : precision * (1 - Math.abs(avgDeviation));

    return SLI;
}

function calculateZScores(weatherData) {
    const zScores = {};
    const deviationsBySource = {};

    const historyData = weatherData.weatherSourceData.history;

    for (const day in historyData) {
        zScores[day] = {};

        for (const source in historyData[day]) {

            const historicalAvg = historyData[day][source].historicalAvg;
            const dailyAvg = historyData[day][source].dailyAvg;
            const deviation = dailyAvg - historicalAvg;

            if (!deviationsBySource[source]) {
                deviationsBySource[source] = [];
            }

            deviationsBySource[source].push(deviation);
        }
    }

    const sourceStats = {};

    for (const source in deviationsBySource) {
        const mean = calculateMean(deviationsBySource[source]);
        const standardDeviation = calculateStandardDeviation(deviationsBySource[source], mean);

        sourceStats[source] = { mean, standardDeviation };
    }

    console.log('[CALCULATE] sourceStats:', JSON.stringify(sourceStats, null, 2));
    console.log('[CALCULATE] deviationsBySource:', JSON.stringify(deviationsBySource, null, 2));

    for (const day in historyData) {
        for (const source in historyData[day]) {

            if (sourceStats[source]) {
                const { mean, standardDeviation } = sourceStats[source];
                const deviation = historyData[day][source].dailyAvg - historyData[day][source].historicalAvg;

                zScores[day][source] = (deviation - mean) / standardDeviation;
            } else {
                zScores[day][source] = null;
            }
        }
    }

    console.log('[CALCULATE] calculated zScores:', zScores);

    return zScores;
}
*/

function processDataAndCalculateSLI(weatherData, periodStart, periodEnd, precision, coverageType) {
    const deviations = [];

    // Calculate percentage deviations for each data source
    console.log('[PROCESS] weatherData: ', weatherData);
    for (const day in weatherData) {
        const dailyDeviations = [];

        for (const source in weatherData[day]) {

            // console.log('[PROCESS] weatherData[day]: ', weatherData[day]);

            const historicalAvg = weatherData[day][source].historicalAvg;
            const dailyAvg = weatherData[day][source].dailyAvg;
            const deviation = ((dailyAvg - historicalAvg) / historicalAvg) * 100;
            dailyDeviations.push(deviation);
        }

        // Calculate the weighted average of percentage deviations for the day
        const weightedAvgPercentageDeviation = calculateWeightedAverage(dailyDeviations);
        deviations.push(weightedAvgPercentageDeviation);
    }

    // Calculate the average deviation across all days in the vacation period
    const avgDeviation = deviations.reduce((sum, deviation) => sum + deviation, 0) / deviations.length;

    return avgDeviation;
}

function calculateMean(data) {
    const sum = data.reduce((a, b) => a + b, 0);
    const mean = sum / data.length;
    return mean;
}

function calculateStandardDeviation(data, mean) {
    const squaredDifferences = data.map((value) => (value - mean) ** 2);
    const meanOfSquaredDifferences = calculateMean(squaredDifferences);
    const standardDeviation = Math.sqrt(meanOfSquaredDifferences);
    return standardDeviation;
}

function calculateWeightedAverage(dailyDeviations) {
    // Calculate the weighted average of deviations for the day
    // This can be customized based on the reliability or quality of each data source
    // For simplicity, I assume equal weights for all sources in this example
    const sum = dailyDeviations.reduce((accumulator, deviation) => accumulator + deviation, 0);
    return sum / dailyDeviations.length;
}

app.post('/', async (req: Request, res: Response) => {
    try {
        const { data } = req.body;
        const { period_start: periodStart, period_end: periodEnd, address: slaAddress, network_name: networkName, location, coverageType } = data;

        // Log entire request body
        console.log('[POST] Request body:', req.body);

        const slaData = await getSLAData(slaAddress, networkName);
        const messengerPrecision = await getMessengerPrecision(slaData.messengerAddress, networkName);

        const weatherData = await fetchWeatherData(location, periodStart, periodEnd);

        console.log("[POST] Fetched weather data:", weatherData);

        const serviceQualityPercentage = processDataAndCalculateSLI(weatherData, periodStart, periodEnd, messengerPrecision, coverageType);
        res.status(200).json({ data: { result: serviceQualityPercentage } });
    } catch (error: any) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

app.post('/test-sli', async (req: Request, res: Response) => {
    try {
        const { data } = req.body;
        const { period_start: periodStart, period_end: periodEnd, location, coverageType } = data;
        const precision = 1; // Replace with a suitable precision value for testing

        console.log('[POST] Request body:', req.body);

        const weatherData = await fetchWeatherData(location, periodStart, periodEnd);

        console.log("[POST] Fetched weather data:", weatherData);

        const serviceQualityPercentage = processDataAndCalculateSLI(weatherData, periodStart, periodEnd, precision, coverageType);
        res.status(200).json({ data: { result: serviceQualityPercentage } });
    } catch (error: any) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
    }
});

const HOST = process.env.HOST || '0.0.0.0';
// const PORT = Number(process.env.PORT) || 6070;
const PORT = 3002;


app.listen(PORT, HOST, () => {
    console.log(`Server is running on port ${PORT}`);
});

console.log(`Trying to start server on port ${PORT}`);