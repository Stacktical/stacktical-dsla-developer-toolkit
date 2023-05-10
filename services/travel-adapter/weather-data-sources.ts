// weather-data-sources.ts

import axios from 'axios';

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const WEATHERSOURCE_API_KEY = process.env.WEATHERSOURCE_API_KEY;
const TOMORROW_API_KEY = process.env.TOMORROW_API_KEY;
const VISUALCROSSING_API_KEY = process.env.VISUALCROSSING_API_KEY;

interface APIDataParams {
    location: string;
    startDate: string;
    endDate: string;
    fields?: string;
    unitScale?: string;
}

function processVisualCrossingData(actualData: any, historicalData: any) {
    const locationKey = Object.keys(actualData.locations)[0];
    const actualValues = actualData.locations[locationKey].values;
    const historicalValues = historicalData.locations[locationKey].values;

    const dailyData = actualValues.map((day: any) => {
        const date = new Date(day.datetime).toISOString().split("T")[0].substring(5); // Get MM-DD
        const actualDate = day.datetime;

        const historicalDays = historicalValues.filter((historicalDay: any) => {
            const historicalDate = new Date(historicalDay.datetime).toISOString().split("T")[0].substring(5); // Get MM-DD
            return historicalDate === date;
        });

        const historicalTemperature = {
            avg: historicalDays.reduce((sum: number, day: any) => sum + day.temp, 0) / historicalDays.length,
            min: historicalDays.reduce((sum: number, day: any) => sum + day.mint, 0) / historicalDays.length,
            max: historicalDays.reduce((sum: number, day: any) => sum + day.maxt, 0) / historicalDays.length,
        };

        const historicalPrecipitation =
            historicalDays.reduce((sum: number, day: any) => sum + day.precip, 0) / historicalDays.length;

        return {
            date: actualDate,
            actualTemperature: {
                avg: day.temp,
                min: day.mint,
                max: day.maxt,
            },
            actualPrecipitation: day.precip,
            historicalTemperature,
            historicalPrecipitation,
        };
    });

    return dailyData;
}

export async function fetchVisualCrossingData(params: APIDataParams) {
    const { location, startDate, endDate, fields, unitScale } = params;

    const baseUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/history";
    const endpoint = `${baseUrl}?location=${location}&startDateTime=${startDate}T00:00:00&endDateTime=${endDate}T00:00:00&aggregateHours=24&unitGroup=us&contentType=json&key=${VISUALCROSSING_API_KEY}`;

    // fetch historical data
    const historicalPromises = [];
    for (let i = 0; i < 10; i++) {
        const historicalStartDate = new Date(new Date(startDate).setFullYear(new Date(startDate).getFullYear() - i)).toISOString().split('T')[0];
        const historicalEndDate = new Date(new Date(endDate).setFullYear(new Date(endDate).getFullYear() - i)).toISOString().split('T')[0];
        const historicalEndpoint = `${baseUrl}?location=${location}&startDateTime=${historicalStartDate}T00:00:00&endDateTime=${historicalEndDate}T00:00:00&aggregateHours=24&unitGroup=us&contentType=json&key=${VISUALCROSSING_API_KEY}`;
        historicalPromises.push(axios.get(historicalEndpoint));
    }

    try {
        const actualResponse = await axios.get(endpoint);
        const historicalResponses = await Promise.all(historicalPromises);

        // Combine historical data
        const locationKey = Object.keys(actualResponse.data.locations)[0];
        const historicalValues = [];
        for (const response of historicalResponses) {
            historicalValues.push(...response.data.locations[locationKey].values);
        }

        const historicalData = {
            locations: {
                [locationKey]: {
                    values: historicalValues,
                },
            },
        };

        const processedData = processVisualCrossingData(actualResponse.data, historicalData);
        console.log("[PROCESSED-DATA] Processed Visual Crossing data:", processedData);
        return processedData;
    } catch (error) {
        throw error;
    }
}

/*
export async function fetchTomorrowIOData(params: APIDataParams) {
    const { location, startDate, endDate } = params;
    const [latitude, longitude] = location.split(',');

    const fields = [
        'temperatureAvg',
        'temperatureMax',
        'temperatureMin',
        'precipitationAccumulationSum',
    ];

    const baseUrl = 'https://api.tomorrow.io/v4/timelines';
    const actualEndpoint = `${baseUrl}?location=${latitude},${longitude}&fields=${fields.join(',')}&timesteps=1d&startTime=${startDate}T00:00:00Z&endTime=${endDate}T00:00:00Z&apikey=${TOMORROW_API_KEY}`;

    const historicalBaseUrl = 'https://api.tomorrow.io/v4/historical/normals';
    const historicalStart = startDate.slice(5);
    const historicalEnd = endDate.slice(5);

    try {
        const actualResponse = await axios.get(actualEndpoint);

        const historicalResponse = await axios.post(
            `${historicalBaseUrl}?apikey=${TOMORROW_API_KEY}`,
            {
                location: `${latitude},${longitude}`,
                fields: fields,
                timesteps: ['1d'],
                startDate: historicalStart,
                endDate: historicalEnd,
                units: 'metric',
            },
            {
                headers: {
                    'Accept-Encoding': 'gzip',
                    'Content-Type': 'application/json',
                },
            },
        );

        //const processedData = processTomorrowIOData(actualResponse.data, historicalResponse.data);
        //console.log("[PROCESSED-DATA] Processed Tomorrow.io data:", processedData);
        console.log("[FETCHED-DATA] actual Tomorrow.io data:", actualResponse.data);
        console.log("[FETCHED-DATA] actual Tomorrow.io data:", historicalResponse.data);
        //return processedData;
    } catch (error) {
        throw error;
    }
}
*/

/*
export async function fetchWeatherSourceAPIsData(params: APIDataParams) {
    const { location, startDate, endDate, fields, unitScale } = params;
    const latLong = location.split(','); // Assuming location is in 'latitude,longitude' format

    const baseUrl = "https://history.weathersourceapis.com/v2";
    const endpoint = `/points/${latLong[0]},${latLong[1]}/days/${startDate},${endDate}`;

    // fetch historical data
    const historicalPromises = [];
    for (let i = 0; i < 10; i++) {
        const historicalStartDate = new Date(new Date(startDate).setFullYear(new Date(startDate).getFullYear() - i)).toISOString().split('T')[0];
        const historicalEndDate = new Date(new Date(endDate).setFullYear(new Date(endDate).getFullYear() - i)).toISOString().split('T')[0];
        const historicalEndpoint = `/points/${latLong[0]},${latLong[1]}/days/${historicalStartDate},${historicalEndDate}`;
        historicalPromises.push(axios.get(baseUrl + historicalEndpoint, {
            headers: { 'X-API-KEY': WEATHERSOURCE_API_KEY },
            params: {
                fields: fields || 'tempAvg,tempMin,tempMax,precip',
                unitScale: unitScale || 'IMPERIAL',
            },
        }));
    }

    try {
        const actualResponse = await axios.get(baseUrl + endpoint, {
            headers: { 'X-API-KEY': WEATHERSOURCE_API_KEY },
            params: {
                fields: fields || 'tempAvg,tempMin,tempMax,precip',
                unitScale: unitScale || 'IMPERIAL',
            },
        });
        const historicalResponses = await Promise.all(historicalPromises);

        // Combine historical data
        const historicalData = {
            locations: {
                [location]: {
                    values: [],
                },
            },
        };

        for (const response of historicalResponses) {
            historicalData.locations[location].values.push(...response.data);
        }

        //const processedData = processWeatherSourceData(actualResponse.data, historicalData);
        //console.log("[PROCESSED-DATA] Processed Weather Source data:", processedData);
        console.log("[RESPONSE-DATA] Weather Source data:", actualResponse.data);
        //return processedData;
    } catch (error) {
        throw error;
    }
}
*/

/*
export async function fetchOpenWeatherMapData(params: APIDataParams) {
    const { location, startDate, endDate, fields, unitScale } = params;
    const latLong = location.split(','); // Assuming location is in 'latitude,longitude' format

    const baseUrl = "https://history.openweathermap.org/data/2.5/history/city";
    const startUnix = Math.floor(new Date(startDate).getTime() / 1000);
    const endUnix = Math.floor(new Date(endDate).getTime() / 1000);
    const endpoint = `${baseUrl}?lat=${latLong[0]}&lon=${latLong[1]}&type=hour&start=${startUnix}&end=${endUnix}&appid=${OPENWEATHER_API_KEY}&units=imperial`;

    // fetch historical data
    const historicalPromises = [];
    for (let i = 0; i < 10; i++) {
        const historicalStartDate = new Date(new Date(startDate).setFullYear(new Date(startDate).getFullYear() - i)).getTime();
        const historicalEndDate = new Date(new Date(endDate).setFullYear(new Date(endDate).getFullYear() - i)).getTime();
        const historicalStartUnix = Math.floor(historicalStartDate / 1000);
        const historicalEndUnix = Math.floor(historicalEndDate / 1000);
        const historicalEndpoint = `${baseUrl}?lat=${latLong[0]}&lon=${latLong[1]}&type=hour&start=${historicalStartUnix}&end=${historicalEndUnix}&appid=${OPENWEATHER_API_KEY}&units=imperial`;
        historicalPromises.push(axios.get(historicalEndpoint));
    }

    try {
        const actualResponse = await axios.get(endpoint);
        const historicalResponses = await Promise.all(historicalPromises);

        // Combine historical data
        const historicalData = {
            locations: {
                [location]: {
                    values: [],
                },
            },
        };

        for (const response of historicalResponses) {
            historicalData.locations[location].values.push(...response.data.list);
        }

        // const processedData = processOpenWeatherMapData(actualResponse.data, historicalData);
        // console.log("[PROCESSED-DATA] Processed OpenWeatherMap data:", processedData);
        // return processedData;
        return actualResponse.data;
    } catch (error) {
        throw error;
    }
}
*/