const { fromAscii, padRight } = require('web3-utils');
const express = require('express');
require('dotenv').config();

const { createAnalyticsData, getSLAData } = require('./helpers');

async function getValidatorAPR(params) {
  const slaData = await getSLAData(params.sla_address);
  console.log('SLA Data from IPFS:');
  const analyticsData = createAnalyticsData(slaData.serviceAddress);
  console.log('Analytics data:');
  console.log(analyticsData);
  const { hits, misses } = analyticsData[slaData.serviceAddress];
  console.log(`hits: ${hits}, misses: ${misses}`);
  const response = padRight(fromAscii(`${hits},${misses}`), 64);
  console.log(`hits,misses parsed to bytes32: ${response}`);
  return response;
}

const app = express();
app.use(express.json());

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
        sla_monitoring_start: data.sla_monitoring_start,
        sla_monitoring_end: data.sla_monitoring_end,
      };
      result = await getValidatorAPR(getAPR);
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

export default app;
