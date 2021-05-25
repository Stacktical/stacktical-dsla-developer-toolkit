const { fromAscii, padRight, hexToUtf8 } = require('web3-utils');
const express = require('express');
require('dotenv').config();

const {
  ipfsHashToBytes32,
  storeDataOnIFPS,
  periodTypeNumberToString,
  getAnalyticsFromNetworkAnalyticsContract,
  getSLAData,
  createWeekAnalyticsData,
} = require('./helpers');

const { IPFS_URI } = process.env;

async function getValidatorAPR(params) {
  const slaData = await getSLAData(params.sla_address);
  console.log('SLA Data from IPFS:');
  console.log(slaData);
  const analyticsData = await getAnalyticsFromNetworkAnalyticsContract(
    params,
    hexToUtf8(slaData.networkName),
    slaData.periodType,
  );
  console.log('Analytics data:');
  console.log(analyticsData);
  const { hits, misses } = analyticsData.analytics_data[slaData.serviceAddress];
  console.log(`hits: ${hits}, misses: ${misses}`);
  const response = padRight(fromAscii(`${hits},${misses}`), 64);
  console.log(`hits,misses parsed to bytes32: ${response}`);
  return response;
}

async function getNetworkAnalytics(params) {
  const analytics_data = createWeekAnalyticsData(params.network_name);
  const analyticsDataIPFSObject = {
    period_id: params.period_id,
    period_type: periodTypeNumberToString(params.period_type),
    analytics_data,
  };
  console.log('Analytics data: ');
  console.log(analyticsDataIPFSObject);
  const ipfsHash = await storeDataOnIFPS(analyticsDataIPFSObject);
  console.log('Analytics IPFS url:');
  console.log(`${IPFS_URI}/ipfs/${ipfsHash}`);
  return ipfsHashToBytes32(ipfsHash);
}

/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */

const app = express();
app.use(express.json());
const port = 6060;

app.post('/', async (req, res) => {
  const { id, data } = req.body;
  console.log('Request Body:');
  console.log(req.body);
  let result;
  switch (data.job_type) {
    case 'staking_efficiency':
      // eslint-disable-next-line no-case-declarations
      const getAPR = {
        sla_address: data.sla_address,
        period_id: data.period_id,
        network_analytics_address: data.network_analytics_address,
      };
      result = await getValidatorAPR(getAPR);
      break;
    case 'staking_efficiency_analytics':
      // eslint-disable-next-line no-case-declarations
      const getAnalyticsParams = {
        network_name: data.network_name,
        period_id: data.period_id,
        period_type: data.period_type,
        sla_monitoring_start: data.sla_monitoring_start,
        sla_monitoring_end: data.sla_monitoring_end,
      };
      result = await getNetworkAnalytics(getAnalyticsParams);
      break;
    default:
      throw new Error('Job type not identified');
  }
  console.log('result:');
  console.log(result);
  res.send({
    jobRunID: id,
    data: {
      result,
    },
  });
});

app.listen(port, () => {
  console.log(`External adapter initialized at  http://localhost:${port}`);
});
