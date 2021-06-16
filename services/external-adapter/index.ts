require('./env-validation');
const express = require('express');
const axios = require('axios');
const Web3 = require('web3');
const { SLAABI, MessengerABI } = require('./abis');
let web3Uri;

type SLAData = {
  serviceName: string;
  serviceDescription: string;
  serviceImage: string;
  serviceURL: string;
  serviceAddress: string;
  serviceTicker: string;

  periodType: number;
  networkName: string;
  messengerAddress: string;
};

async function getSLAData(address): Promise<SLAData> {
  const web3 = new Web3(web3Uri);
  const slaContract = new web3.eth.Contract(SLAABI, address);
  const ipfsCID = await slaContract.methods.ipfsHash().call();
  console.log(`SLA IPFS url: ${process.env.IPFS_URI}/ipfs/${ipfsCID}`);
  const periodType = await slaContract.methods.periodType().call();
  const networkName = await slaContract.methods.extraData(0).call();
  const messengerAddress = await slaContract.methods.messengerAddress().call();
  const { data } = await axios.get(`${process.env.IPFS_URI}/ipfs/${ipfsCID}`);
  return { ...data, periodType, networkName, messengerAddress };
}

async function getSLI(slaData: SLAData) {
  const web3 = new Web3(web3Uri);
  const messenger = new web3.eth.Contract(
    MessengerABI,
    slaData.messengerAddress
  );
  const precision = await messenger.methods.messengerPrecision().call();
  // Just a random SLI, multiplied by 100 to get percentage
  const sli = Math.random() * 100;
  // times messenger precision to calculate on chain
  return Math.floor(sli * precision);
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
  const slaData = await getSLAData(requestData.sla_address);
  console.log('SLA Data:');
  console.log(slaData);
  const result = await getSLI(slaData);
  console.log('result:', result);
  res.send({
    jobRunID: id,
    data: {
      result,
    },
  });
});

app.listen(6060, () => {
  console.log(`External adapter initialized at http://localhost:${6060}`);
});
