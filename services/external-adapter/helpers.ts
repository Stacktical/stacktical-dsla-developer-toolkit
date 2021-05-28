require('dotenv').config();

const createClient = require('ipfs-http-client');
const bs58 = require('bs58');
const axios = require('axios');
import * as crypto from 'crypto';
const Web3 = require('web3');
const { toChecksumAddress, fromAscii } = require('web3-utils');
const { NetworkAnalyticsABI } = require('./abis');

const ipfsClient = createClient({ url: process.env.IPFS_URI });
const { SLAABI } = require('./abis');

function createRandomAddress() {
  return toChecksumAddress(`0x${crypto.randomBytes(20).toString('hex')}`);
}

function createValidatorData() {
  const delegatorsNumber = Math.floor(10 * Math.random()) + 1;
  const delegators = [];
  for (let index = 0; index < delegatorsNumber; index += 1) {
    const delegator = createRandomAddress();
    delegators.push(delegator);
  }
  const total = Math.floor(10000 * Math.random());
  const total_stake = Math.floor(10000 * Math.random());
  const hits = Math.floor((total * (100 - Math.random() * 20)) / 100);
  const misses = total - hits;
  const staking_efficiency_percent = (hits * 100) / total;
  return {
    total_stake,
    total,
    hits,
    misses,
    staking_efficiency_percent,
    delegators,
  };
}

function createWeekAnalyticsData() {
  return {
    'validator-address': { ...createValidatorData() },
  };
}

async function storeDataOnIFPS(ipfsData) {
  const dataString = JSON.stringify(ipfsData);
  const buffer = Buffer.from(dataString, 'utf-8');
  const { path: ipfsHash } = await ipfsClient.add(buffer);
  return ipfsHash;
}

function periodTypeNumberToString(periodType) {
  return ['Hourly', 'Daily', 'Weekly', 'BiWeekly', 'Monthly', 'Yearly'][
    periodType
  ];
}

function ipfsHashToBytes32(ipfsHash) {
  return bs58.decode(ipfsHash).slice(2).toString('hex');
}

function bytes32ToIPFSCID(bytes32) {
  return bs58.encode(Buffer.from(`1220${bytes32.replace('0x', '')}`, 'hex'));
}

async function getIPFSDataFromCID(cid) {
  const { data } = await axios.get(`${process.env.IPFS_URI}/ipfs/${cid}`);
  return data;
}

async function getAnalyticsFromNetworkAnalyticsContract(
  params,
  networkName,
  periodType
) {
  const web3 = new Web3(process.env.WEB3_URI);
  const networkAnalyticsContract = new web3.eth.Contract(
    NetworkAnalyticsABI,
    params.network_analytics_address
  );
  const ipfsBytes32 = await networkAnalyticsContract.methods
    .periodAnalytics(fromAscii(networkName), periodType, params.period_id)
    .call();
  const ipfsCID = bytes32ToIPFSCID(ipfsBytes32);
  console.log(`Analytics IPFS url: ${process.env.IPFS_URI}/ipfs/${ipfsCID}`);
  return getIPFSDataFromCID(ipfsCID);
}

async function getSLAData(address) {
  const web3 = new Web3(process.env.WEB3_URI);
  const slaContract = new web3.eth.Contract(SLAABI, address);
  const ipfsCID = await slaContract.methods.ipfsHash().call();
  console.log(`SLA IPFS url: ${process.env.IPFS_URI}/ipfs/${ipfsCID}`);
  const periodType = await slaContract.methods.periodType().call();
  const networkName = await slaContract.methods.extraData(0).call();
  const ipfsData = await getIPFSDataFromCID(ipfsCID);
  return { ...ipfsData, periodType, networkName };
}

module.exports = {
  getSLAData,
  getAnalyticsFromNetworkAnalyticsContract,
  periodTypeNumberToString,
  storeDataOnIFPS,
  ipfsHashToBytes32,
  createWeekAnalyticsData,
};
