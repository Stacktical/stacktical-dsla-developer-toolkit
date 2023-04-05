require('./env-validation');
import express, { Request, Response } from 'express';
import axios from 'axios';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { SLAABI, MessengerABI } from './abis';

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
  console.log(`networkName: ${networkName}`); // Add this line
  const web3 = new Web3(process.env[`${networkName.toUpperCase()}_URI`]);
  const slaContract = new web3.eth.Contract(SLAABI as AbiItem[], address);
  const ipfsCID = await slaContract.methods.ipfsHash().call();
  const periodType = await slaContract.methods.periodType().call();
  const messengerAddress = await slaContract.methods.messengerAddress().call();
  const { data } = await axios.get(`${process.env.IPFS_GATEWAY_URI}/ipfs/${ipfsCID}`);
  return { ...data, periodType, messengerAddress };
}

async function getMessengerPrecision(messengerAddress: string, networkName: string): Promise<number> {
  console.log(`networkName: ${networkName}`); // Add this line
  const web3 = new Web3(process.env[`${networkName.toUpperCase()}_URI`]);
  const messenger = new web3.eth.Contract(MessengerABI as AbiItem[], messengerAddress);
  return await messenger.methods.messengerPrecision().call();
}


const app = express();
app.use(express.json());

const STATUSPAGE_API_BASE = 'https://status.openai.com/api/v2';

function calculateServiceQualityPercentage(
  incidents: any[],
  periodStart: number,
  periodEnd: number,
  precision: number
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
    const serviceQualityPercentage = (((totalMinutes - totalDowntimeMinutes) / totalMinutes) * 100) * precision;
    return serviceQualityPercentage;
  }


  app.post('/', async (req: Request, res: Response) => {
    try {
      const { data } = req.body;
      const { period_start: periodStart, period_end: periodEnd, address: slaAddress, network_name: networkName } = data;
  
      // Log entire request body
      console.log('Request body:', req.body);
  
      // Log the timestamp values received and their converted date representations
      console.log('Timestamps received:', { periodStart, periodEnd });
      console.log('Dates received:', {
        periodStartDate: new Date(Number(periodStart) * 1000).toLocaleString(),
        periodEndDate: new Date(Number(periodEnd) * 1000).toLocaleString(),
      });
  
      const requestData = {
        sla_address: data.sla_address,
        network_name: data.network_name,
        sla_monitoring_start: data.sla_monitoring_start,
        sla_monitoring_end: data.sla_monitoring_end,
      };
      const slaData = await getSLAData(requestData.sla_address, requestData.network_name);
  
      const messengerPrecision = await getMessengerPrecision(slaData.messengerAddress, requestData.network_name);
  
      const incidentsResponse = await axios.get(`${STATUSPAGE_API_BASE}/incidents.json`);
      const incidentsData = incidentsResponse.data;
  
      if (!incidentsData || incidentsResponse.status !== 200) {
        throw new Error('Failed to fetch incidents data');
      }
  
      // console.log('Incidents data:', incidentsData);
  
      const incidents = incidentsData.incidents;
      //const serviceQualityPercentage = calculateServiceQualityPercentage(incidents, periodStart, periodEnd);
      const serviceQualityPercentage = calculateServiceQualityPercentage(incidents, parseInt(periodStart) * 1000, parseInt(periodEnd) * 1000, messengerPrecision);
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
