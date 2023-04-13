// test-fetch-data.ts
import 'dotenv/config';

import { fetchVisualCrossingData } from './weather-data-sources';

async function testFetchData() {
    const params = {
        location: '40.7128,-74.0060',
        startDate: '2023-04-02',
        endDate: '2023-04-08',
    };

    try {
        const data = await fetchVisualCrossingData(params);
        console.log('[TEST] Fetched data:', data);
    } catch (error) {
        console.error('[TEST] Error fetching data:', error);
    }
}

testFetchData();
