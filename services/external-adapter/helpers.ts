require('dotenv').config();

const axios = require('axios');
import * as crypto from 'crypto';
const Web3 = require('web3');
const { toChecksumAddress } = require('web3-utils');

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

function createAnalyticsData(validatorAddress) {
  return {
    [validatorAddress]: { ...createValidatorData() },
  };
}

async function getIPFSDataFromCID(cid) {
  const { data } = await axios.get(`${process.env.IPFS_URI}/ipfs/${cid}`);
  return data;
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
  createAnalyticsData,
};
