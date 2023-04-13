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

function processVisualCrossingData(rawData: any) {
    const locationKey = Object.keys(rawData.locations)[0];
    const dailyData = rawData.locations[locationKey].values.map((day: any) => ({
        date: day.datetime,
        temperature: {
            avg: day.temp,
            min: day.mint,
            max: day.maxt,
        },
        precipitation: day.precip,
    }));

    return dailyData;
}


export async function fetchVisualCrossingData(params: VisualCrossingDataParams) {
    const { location, startDate, endDate, fields, unitScale } = params;

    const baseUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/history";
    const endpoint = `${baseUrl}?location=${location}&startDateTime=${startDate}T00:00:00&endDateTime=${endDate}T00:00:00&aggregateHours=24&unitGroup=us&contentType=json&key=${VISUALCROSSING_API_KEY}`;

    try {
        const response = await axios.get(endpoint);
        console.log("[RAW-DATA] Raw Visual Crossing data:", response.data);
        const processedData = processVisualCrossingData(response.data);
        console.log("[PROCESSED-DATA] Processed Visual Crossing data:", processedData);
        return processedData;
    } catch (error) {
        console.error("[ERROR] fetchVisualCrossingData:", error);
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
