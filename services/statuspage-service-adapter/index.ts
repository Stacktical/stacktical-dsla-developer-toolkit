import express, { Request, Response } from 'express';
import axios from 'axios';

const app = express();
app.use(express.json());

const STATUSPAGE_API_BASE = 'https://status.openai.com/api/v2';

function calculateServiceQualityPercentage(
    incidents: any[],
    periodStart: number,
    periodEnd: number
  ): number {
    if (!Array.isArray(incidents)) {
      throw new Error('Incidents data is not an array');
    }
  
    let totalDowntimeMinutes = 0;
  
    incidents.forEach((incident) => {
      if (incident.impact !== 'none') {
        const incidentStart = Date.parse(incident.created_at);
        const incidentEnd = Date.parse(incident.resolved_at);

        if (incidentStart >= periodStart && incidentEnd <= periodEnd) {
          totalDowntimeMinutes += (incidentEnd - incidentStart) / 60000;
        }
      }
    });
  
    const totalMinutes = (periodEnd - periodStart) / 60000;
    const serviceQualityPercentage = ((totalMinutes - totalDowntimeMinutes) / totalMinutes) * 100;
  
    return serviceQualityPercentage;
  }


  app.post('/', async (req: Request, res: Response) => {
    try {
      const { data } = req.body;
      const { period_start: periodStart, period_end: periodEnd } = req.body.data;

      // Log entire request body
      // console.log('Request body:', req.body);
  
      // Log the timestamp values received and their converted date representations
      // console.log('Timestamps received:', { periodStart, periodEnd });
      // console.log('Dates received:', {
        periodStartDate: new Date(Number(periodStart) * 1000).toLocaleString(),
        periodEndDate: new Date(Number(periodEnd) * 1000).toLocaleString(),
      });
      
      
  
      const incidentsResponse = await axios.get(`${STATUSPAGE_API_BASE}/incidents.json`);
      const incidentsData = incidentsResponse.data;
  
      if (!incidentsData || incidentsResponse.status !== 200) {
        throw new Error('Failed to fetch incidents data');
      }
  
      // console.log('Incidents data:', incidentsData);
  
      const incidents = incidentsData.incidents;
      //const serviceQualityPercentage = calculateServiceQualityPercentage(incidents, periodStart, periodEnd);
      const serviceQualityPercentage = calculateServiceQualityPercentage(incidents, parseInt(periodStart) * 1000, parseInt(periodEnd) * 1000);
      res.status(200).json({ data: { result: serviceQualityPercentage } });
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


// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
