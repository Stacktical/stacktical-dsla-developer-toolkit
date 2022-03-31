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
  periodType: number;
  messengerAddress: string;
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
  const web3 = new Web3(web3Uri);
  const messenger = new web3.eth.Contract(
    MessengerABI,
    slaData.messengerAddress
  );
  const precision = await messenger.methods.messengerPrecision().call();
  if ((slaData.useTestExternalAdapter) &&
    (slaData.sliMockingPlan !== undefined)){
      console.log('Using pre specified mock sli');
      const periodId = nextPeriod
      const sli = slaData['sliMockingPlan'][nextPeriod]
      console.log('mocking sli value ' + sli + ' for period ' + periodId)
      return sli
  }
  else {
    // Just a random SLI, multiplied by 100 to get percentage
    const sli = Math.random() * 100;
    // times messenger precision to calculate on chain
    return Math.floor(sli * precision);
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
