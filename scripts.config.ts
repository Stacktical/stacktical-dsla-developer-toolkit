import {
  appRoot,
  CONTRACT_NAMES,
  PERIOD_TYPE,
  SLO_TYPE,
  USE_CASES,
} from './constants';
import { ScriptsConfiguration } from './types';
import * as fs from 'fs';

const SEMessengerSpec = JSON.parse(
  // @ts-ignore
  fs.readFileSync(
    `${appRoot.path}/contracts/messengers/${USE_CASES.STAKING_EFFICIENCY}/use-case-spec.json`
  )
);
const SENetworkNames = SEMessengerSpec.ipfsData.serviceTicker.values;

export const scripts: ScriptsConfiguration = {
  deploy_sla: [
    {
      sloValue: 100,
      sloType: SLO_TYPE.GreaterThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      messengerContract: CONTRACT_NAMES.BaseMessenger,
      initialPeriodId: 4,
      finalPeriodId: 3,
      extraData: [],
      initialTokenSupply: '10000000',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 1,
      leverage: 20,
      serviceMetadata: {
        serviceName: 'P-OPS',
        serviceDescription: 'Official bDSLA Beta Partner.',
        serviceImage:
          'https://storage.googleapis.com/bdsla-incentivized-beta/validators/chainode.svg',
        serviceURL: 'https://bdslaToken.network',
        serviceAddress: 'one1kf42rl6yg2avkjsu34ch2jn8yjs64ycn4n9wdj',
        serviceTicker: SENetworkNames[0],
      },
    },
    {
      sloValue: 8,
      sloType: SLO_TYPE.SmallerThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      messengerContract: CONTRACT_NAMES.SEMessenger,
      initialPeriodId: 4,
      finalPeriodId: 9,
      extraData: [],
      initialTokenSupply: '10000000',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 2,
      leverage: 50,
      serviceMetadata: {
        serviceName: 'P-OPS',
        serviceDescription: 'Official bDSLA Beta Partner.',
        serviceImage:
          'https://storage.googleapis.com/bdsla-incentivized-beta/validators/chainode.svg',
        serviceURL: 'https://bdslaToken.network',
        serviceAddress: 'one1kf42rl6yg2avkjsu34ch2jn8yjs64ycn4n9wdj',
        serviceTicker: SENetworkNames[0],
      },
    },
    {
      sloValue: 9,
      sloType: SLO_TYPE.GreaterThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      messengerContract: CONTRACT_NAMES.SEMessenger,
      initialPeriodId: 4,
      finalPeriodId: 9,
      extraData: [],
      initialTokenSupply: '10000000',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 2,
      leverage: 50,
      serviceMetadata: {
        serviceName: 'P-OPS',
        serviceDescription: 'Official bDSLA Beta Partner.',
        serviceImage:
          'https://storage.googleapis.com/bdsla-incentivized-beta/validators/chainode.svg',
        serviceURL: 'https://bdslaToken.network',
        serviceAddress: 'one1kf42rl6yg2avkjsu34ch2jn8yjs64ycn4n9wdj',
        serviceTicker: SENetworkNames[0],
      },
    },
    {
      sloValue: 10,
      sloType: SLO_TYPE.GreaterThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      messengerContract: CONTRACT_NAMES.SEMessenger,
      initialPeriodId: 4,
      finalPeriodId: 9,
      extraData: [],
      initialTokenSupply: '10000000',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 2,
      leverage: 50,
      serviceMetadata: {
        serviceName: 'P-OPS',
        serviceDescription: 'Official bDSLA Beta Partner.',
        serviceImage:
          'https://storage.googleapis.com/bdsla-incentivized-beta/validators/chainode.svg',
        serviceURL: 'https://bdslaToken.network',
        serviceAddress: 'one1kf42rl6yg2avkjsu34ch2jn8yjs64ycn4n9wdj',
        serviceTicker: SENetworkNames[0],
      },
    },
    {
      sloValue: 200,
      sloType: SLO_TYPE.GreaterThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      messengerContract: CONTRACT_NAMES.SEMessenger,
      initialPeriodId: 40, 
      finalPeriodId: 52, // Last period of the SLA Contract
      extraData: [],
      initialTokenSupply: '10000000',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 2,
      leverage: 50,
      serviceMetadata: {
        serviceName: 'P-OPS',
        serviceDescription: 'Official bDSLA Beta Partner.',
        serviceImage:
          'https://storage.googleapis.com/bdsla-incentivized-beta/validators/chainode.svg',
        serviceURL: 'https://bdslaToken.network',
        serviceAddress: 'one1kf42rl6yg2avkjsu34ch2jn8yjs64ycn4n9wdj',
        serviceTicker: SENetworkNames[0],
      },
    },
    {
      // This SLA agrees that the price of PAR must be greater than or equal to 99% of an EUR, so €0.99
      sloValue: 0.99,
      sloType: SLO_TYPE.GreaterOrEqualTo,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      messengerContract: CONTRACT_NAMES.PPMessenger,
      initialPeriodId: 14,
      finalPeriodId: 52,
      extraData: [],
      initialTokenSupply: '10000000',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 2,
      leverage: 50, // 100 / 50 = 2% premium
      serviceMetadata: {
        serviceName: 'P-OPS',
        serviceDescription: 'Official bDSLA Beta Partner.',
        serviceImage:
          'https://storage.googleapis.com/bdsla-incentivized-beta/validators/chainode.svg',
        serviceURL: 'https://bdslaToken.network',
        serviceAddress: 'one1kf42rl6yg2avkjsu34ch2jn8yjs64ycn4n9wdj',
        serviceTicker: SENetworkNames[0],
      },
    },
    {
      // This SLA agrees that the price of PAR must be greater than or equal to 99% of an EUR, so €0.99
      sloValue: 0.99,
      sloType: SLO_TYPE.GreaterOrEqualTo,
      whitelisted: false,
      periodType: PERIOD_TYPE.DAILY,
      messengerContract: CONTRACT_NAMES.PPMessenger,
      initialPeriodId: 337, // 3 Dec
      finalPeriodId: 365, 
      extraData: [],
      initialTokenSupply: '10000000',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 2,
      leverage: 50, // 100 / 50 = 2% premium
      serviceMetadata: {
        serviceName: 'P-OPS',
        serviceDescription: 'Official bDSLA Beta Partner.',
        serviceImage:
          'https://storage.googleapis.com/bdsla-incentivized-beta/validators/chainode.svg',
        serviceURL: 'https://bdslaToken.network',
        serviceAddress: 'one1kf42rl6yg2avkjsu34ch2jn8yjs64ycn4n9wdj',
        serviceTicker: SENetworkNames[0],
      },
    },
    // index 7 
    {
      // This SLA agrees that the price of PAR must be greater than or equal to 99% of an EUR, so €0.99
      sloValue: 0.99,
      sloType: SLO_TYPE.GreaterOrEqualTo,
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.PPMessenger,
      initialPeriodId: 11,
      finalPeriodId: 12, 
      extraData: [],
      initialTokenSupply: '10000000',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 2,
      leverage: 50, // 100 / 50 = 2% premium
      serviceMetadata: {
        serviceName: 'P-OPS',
        serviceDescription: 'Official bDSLA Beta Partner.',
        serviceImage:
          'https://storage.googleapis.com/bdsla-incentivized-beta/validators/chainode.svg',
        serviceURL: 'https://bdslaToken.network',
        serviceAddress: 'one1kf42rl6yg2avkjsu34ch2jn8yjs64ycn4n9wdj',
        serviceTicker: SENetworkNames[0],
      },
    },
  ],
};
