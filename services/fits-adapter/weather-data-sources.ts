// weather-data-sources.ts

import axios from 'axios';

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const WEATHERSOURCE_API_KEY = process.env.WEATHERSOURCE_API_KEY;
const TOMORROW_API_KEY = process.env.TOMORROW_API_KEY;
const VISUALCROSSING_API_KEY = process.env.VISUALCROSSING_API_KEY;

interface VisualCrossingDataParams {
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

export async function fetchVisualCrossingData(params: VisualCrossingDataParams) {
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
export async function fetchWeatherSourceData(params: WeatherSourceDataParams) {
    const { location, startDate, endDate, fields, unitScale } = params;
    const [latitude, longitude] = location.split(',');

    const baseUrl = 'https://history.weathersourceapis.com/v2';
    const endpoint = `/points/${latitude},${longitude}/days/${startDate},${endDate}`;

    const response = await axios.get(baseUrl + endpoint, {
        headers: {
            'X-API-KEY': WEATHERSOURCE_API_KEY,
        },
        params: {
            fields: fields || 'popular',
            unitScale: unitScale || 'IMPERIAL',
        },
    });

    console.log("[RAW-DATA] Raw weather data:", response.data);

    return processWeatherSourceData(response.data);
}
*/

/*
export async function fetchOpenWeatherData(location: string, startDate: string, endDate: string) {
    // Fetch data from OpenWeatherMap API
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall/timemachine`, {
            params: {
                lat: location.lat,
                lon: location.lon,
                dt: Math.floor(new Date(startDate).getTime() / 1000),
                appid: OPENWEATHER_API_KEY,
            },
        });

        // Extract and return the relevant data
        return response.data;
    } catch (error) {
        console.error('Error fetching OpenWeatherMap data:', error);
        throw error;
    }
}
*/

/*
export async function fetchWeatherbitData(location: string, startDate: string, endDate: string) {
    // Fetch data from Weatherbit API
    try {
        const response = await axios.get(`https://api.weatherbit.io/v2.0/history/daily`, {
            params: {
                lat: location.lat,
                lon: location.lon,
                start: startDate,
                end: endDate,
                key: WEATHERBIT_API_KEY,
            },
        });

        // Extract and return the relevant data
        return response.data;
    } catch (error) {
        console.error('Error fetching Weatherbit data:', error);
        throw error;
    }
}
*/

// Add more data source fetching functions as needed
