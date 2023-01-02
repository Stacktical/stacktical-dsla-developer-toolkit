require('./env-validation');
const express = require('express');
const axios = require('axios');
const Web3 = require('web3');
const { SLAABI, MessengerABI } = require('./abis');
let web3Uri;
let nextPeriod;

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
  trackingNumber: string;
  courier: string;
};

type RequestData = {
  sla_address: string;
  network_name: string;
  sla_monitoring_start: number;
  sla_monitoring_end: number;
};

async function getSLAData(address): Promise<SLAData> {
  const web3 = new Web3(web3Uri);
  const slaContract = new web3.eth.Contract(SLAABI, address);
  const ipfsCID = await slaContract.methods.ipfsHash().call();
  console.log(`SLA IPFS url: ${process.env.DEVELOP_IPFS_URI}/ipfs/${ipfsCID}`);
  const periodType = await slaContract.methods.periodType().call();
  nextPeriod = await slaContract.methods.nextVerifiablePeriod().call();
  const messengerAddress = await slaContract.methods.messengerAddress().call();
  const { data } = await axios.get(
    `${process.env.IPFS_GATEWAY_URI}/ipfs/${ipfsCID}`
  );
  return { ...data, periodType, messengerAddress };
}

async function getSLI(requestData: RequestData) {
  const slaData = await getSLAData(requestData.sla_address);
  console.log('SLA Data:');
  console.log(slaData);

  if (
    slaData.serviceUseTestExternalAdapter &&
    slaData.serviceSliMockingPlan !== undefined
  ) {
    console.log('Using pre specified mock sli');
    const sli = slaData['serviceSliMockingPlan'][nextPeriod];
    console.log('mocking sli value ' + sli + ' for period ' + nextPeriod);
    return sli;
  } else {
    if (slaData.courier === 'dhl') {
      const options = {
        method: 'GET',
        url: 'https://api-eu.dhl.com/track/shipments',
        params: { trackingNumber: slaData.trackingNumber },
        headers: { 'DHL-API-Key': process.env.DHL_API_KEY },
      };
      try {
        let response = await axios.get(options).json();

        if (response.status === 200) {
          let shipments = response.data.shipments;
          const sli = shipments.every(
            (item) => item.status.status === 'DELIVERED'
          );
          return sli ? 1 : 0;
        } else {
          console.log(
            'did not receive a 200 status code, received instead: ',
            response.status
          );
          return;
        }
      } catch (error) {
        console.log(error);
        return;
      }
    } else {
      console.log('invalid courier external adapter failed');
      return;
    }
  }
}

const app = express();
app.use(express.json());

app.post('/', async (req, res) => {
  const { id, data } = req.body;
  console.log('Request Body:');
  console.log(req.body);
  const requestData = {
    sla_address: data.sla_address,
    network_name: data.network_name,
    sla_monitoring_start: data.sla_monitoring_start,
    sla_monitoring_end: data.sla_monitoring_end,
  };
  web3Uri = process.env[`${requestData.network_name.toUpperCase()}_URI`];
  const result = await getSLI(requestData);
  console.log('result:', result);
  res.send({
    jobRunID: id,
    data: {
      result,
    },
  });
});

app.listen(6070, () => {
  console.log(`External adapter initialized at http://localhost:${6070}`);
});
