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
      initialPeriodId: 0,
      finalPeriodId: 5,
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
      sloType: SLO_TYPE.GreaterOrEqualTo,
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
      sloValue: 0.99,
      sloType: SLO_TYPE.SmallerThan, // You want less inflation :)
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.CPIMessenger,
      initialPeriodId: 0,
      finalPeriodId: 11,
      extraData: [],
      initialTokenSupply: '10000000',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 2,
      leverage: 50, // 100 / 50 = 2% premium
      serviceMetadata: {
        serviceName: 'Federal Reserve',
        serviceDescription:
          'The U.S. Federal Reserve (FED) inflation-driven monetary policy updates.',
        serviceImage: 'https://via.placeholder.com/1200x600',
        serviceURL: 'https://www.federalreserve.gov/',
        serviceAddress: '0x0000000000000000000000000000000000000000',
        serviceTicker: 'CPI',
      },
    },
    {
      sloValue: 99,
      sloType: SLO_TYPE.SmallerThan, // You want less inflation :)
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.CPIMessenger,
      initialPeriodId: 0,
      finalPeriodId: 11,
      extraData: [],
      initialTokenSupply: '10000000',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 2,
      leverage: 50, // 100 / 50 = 2% premium
      serviceMetadata: {
        serviceName: 'Federal Reserve',
        serviceDescription:
          'The U.S. Federal Reserve (FED) inflation-driven monetary policy updates.',
        serviceImage: 'https://via.placeholder.com/1200x600',
        serviceURL: 'https://www.federalreserve.gov/',
        serviceAddress: '0x0000000000000000000000000000000000000000',
        serviceTicker: 'CPI',
      },
    },
    {
      sloValue: 9,
      sloType: SLO_TYPE.SmallerOrEqualTo, // You want less inflation :)
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.CPIMessenger,
      initialPeriodId: 0,
      finalPeriodId: 11,
      extraData: [],
      initialTokenSupply: '10000000',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 2,
      leverage: 50, // 100 / 50 = 2% premium
      serviceMetadata: {
        serviceName: 'Federal Reserve',
        serviceDescription:
          'The U.S. Federal Reserve (FED) inflation-driven monetary policy updates.',
        serviceImage: 'https://via.placeholder.com/1200x600',
        serviceURL: 'https://www.federalreserve.gov/',
        serviceAddress: '0x0000000000000000000000000000000000000000',
        serviceTicker: 'CPI',
      },
    },
    {
      sloValue: 9,
      sloType: SLO_TYPE.GreaterOrEqualTo, // You want less inflation :)
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.CPIMessenger,
      initialPeriodId: 0,
      finalPeriodId: 11,
      extraData: [],
      initialTokenSupply: '10000000',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 2,
      leverage: 50, // 100 / 50 = 2% premium
      serviceMetadata: {
        serviceName: 'Federal Reserve',
        serviceDescription:
          'The U.S. Federal Reserve (FED) inflation-driven monetary policy updates.',
        serviceImage: 'https://via.placeholder.com/1200x600',
        serviceURL: 'https://www.federalreserve.gov/',
        serviceAddress: '0x0000000000000000000000000000000000000000',
        serviceTicker: 'CPI',
      },
    },
    {
      sloValue: 0.1,
      sloType: SLO_TYPE.GreaterOrEqualTo, // You want less inflation :)
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.CPIMessenger,
      initialPeriodId: 0,
      finalPeriodId: 11,
      extraData: [],
      initialTokenSupply: '10000000',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 2,
      leverage: 50, // 100 / 50 = 2% premium
      serviceMetadata: {
        serviceName: 'Federal Reserve',
        serviceDescription:
          'The U.S. Federal Reserve (FED) inflation-driven monetary policy updates.',
        serviceImage: 'https://via.placeholder.com/1200x600',
        serviceURL: 'https://www.federalreserve.gov/',
        serviceAddress: '0x0000000000000000000000000000000000000000',
        serviceTicker: 'CPI',
      },
    }
  ],
};
