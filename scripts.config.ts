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
    `${appRoot.path}/contracts/messengers/${USE_CASES.STAKING_REWARDS}/use-case-spec.json`
  )
);
const SENetworkNames = SEMessengerSpec.ipfsData.serviceTicker.values;
const StakingParametricMessengerSpec = JSON.parse(
  // @ts-ignore
  fs.readFileSync(
    `${appRoot.path}/contracts/messengers/${USE_CASES.STAKING_PARAMETRIC}/use-case-spec.json`
  )
);

export const scripts: ScriptsConfiguration = {
  deploy_sla: [
    // INDEX 0 | Should be BREACHED
    {
      sloValue: 100,  // Breached as SL0 > SLi is false
      sloType: SLO_TYPE.GreaterThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      messengerContract: CONTRACT_NAMES.BaseOracle, // BaseOracle returns SLIs (0~100)
      initialPeriodId: 0,
      finalPeriodId: 51,
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
        serviceUseTestExternalAdapter: true,
        serviceSliMockingPlan: []
      },
    },
    // INDEX 1 | Should be HONORED
    {
      sloValue: 0,  // Honored SLO > SLI of 0 is true
      sloType: SLO_TYPE.GreaterThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      messengerContract: CONTRACT_NAMES.BaseOracle,
      initialPeriodId: 0,
      finalPeriodId: 51,
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
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan:[],
      },
    },
    // INDEX 2 | Should be HONORED
    {
      sloValue: 50, // SLI of 50 >= SLO of 50 is true
      sloType: SLO_TYPE.GreaterOrEqualTo,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      messengerContract: CONTRACT_NAMES.BaseOracle,
      initialPeriodId: 0,
      finalPeriodId: 51,
      extraData: [],
      initialTokenSupply: '10000000',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 1,
      leverage: 50,
      serviceMetadata: {
        serviceName: 'P-OPS',
        serviceDescription: 'Official bDSLA Beta Partner.',
        serviceImage:
          'https://storage.googleapis.com/bdsla-incentivized-beta/validators/chainode.svg',
        serviceURL: 'https://bdslaToken.network',
        serviceAddress: 'one1kf42rl6yg2avkjsu34ch2jn8yjs64ycn4n9wdj',
        serviceTicker: SENetworkNames[0],
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan:[],
      },
    },
    // INDEX 3 | Should be BREACHED
    {
      sloValue: 60, // SLI of 50 >= SLO of 60 is false
      sloType: SLO_TYPE.GreaterOrEqualTo,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      messengerContract: CONTRACT_NAMES.BaseOracle,
      initialPeriodId: 0,
      finalPeriodId: 51,
      extraData: [],
      initialTokenSupply: '10000000',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 1,
      leverage: 50,
      serviceMetadata: {
        serviceName: 'P-OPS',
        serviceDescription: 'Official bDSLA Beta Partner.',
        serviceImage:
          'https://storage.googleapis.com/bdsla-incentivized-beta/validators/chainode.svg',
        serviceURL: 'https://bdslaToken.network',
        serviceAddress: 'one1kf42rl6yg2avkjsu34ch2jn8yjs64ycn4n9wdj',
        serviceTicker: SENetworkNames[0],
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan:[],
      },
    },
    // INDEX 4 | Should be HONORED
    {
      sloValue: 100,  // Honored as SLI 50 < SLO 100 is true
      sloType: SLO_TYPE.SmallerThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      messengerContract: CONTRACT_NAMES.BaseOracle, // BaseOracle returns SLIs (0~100)
      initialPeriodId: 0,
      finalPeriodId: 51,
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
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan:[],
      },
    },
    // INDEX 5 | Should be BREACHED
    {
      sloValue: 10,  // Breached as SLI 50 < SLO 10 is false
      sloType: SLO_TYPE.SmallerThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      messengerContract: CONTRACT_NAMES.BaseOracle, // BaseOracle returns SLIs (0~100)
      initialPeriodId: 0,
      finalPeriodId: 51,
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
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan:[],
      },
    },
    // INDEX 6 | Should be HONORED
    {
      sloValue: 60,  // Honored as SLI 50 < SLO 60 is true
      sloType: SLO_TYPE.SmallerOrEqualTo,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      messengerContract: CONTRACT_NAMES.BaseOracle, // BaseOracle returns SLIs (0~100)
      initialPeriodId: 0,
      finalPeriodId: 51,
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
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan:[],
      },
    },
    // INDEX 7 | Should be BREACHED
    {
      sloValue: 40,  // Breached as SLI 50 < SLO 60 is false
      sloType: SLO_TYPE.SmallerOrEqualTo,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      messengerContract: CONTRACT_NAMES.BaseOracle, // BaseOracle returns SLIs (0~100)
      initialPeriodId: 0,
      finalPeriodId: 51,
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
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan:[],
      },
    },
    // INDEX 8 | Should be HONORED
    {
      sloValue: 50,  // Breached as SLI 50 = SLO 50 is true
      sloType: SLO_TYPE.EqualTo,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      messengerContract: CONTRACT_NAMES.BaseOracle, // BaseOracle returns SLIs (0~100)
      initialPeriodId: 0,
      finalPeriodId: 51,
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
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan:[],
      },
    },
    // INDEX 9 | Should be BREACHED
    {
      sloValue: 51,  // Breached as SLI 50 = SLO 51 is false
      sloType: SLO_TYPE.EqualTo,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      messengerContract: CONTRACT_NAMES.BaseOracle, // BaseOracle returns SLIs (0~100)
      initialPeriodId: 0,
      finalPeriodId: 51,
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
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan:[],
      },
    },
    // INDEX 10 | Should be HONORED
    {
      sloValue: 51,  // Breached as SLI 50 != SLO 51 is true
      sloType: SLO_TYPE.NotEqualTo,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      messengerContract: CONTRACT_NAMES.BaseOracle, // BaseOracle returns SLIs (0~100)
      initialPeriodId: 0,
      finalPeriodId: 51,
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
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan:[],
      },
    },
    // INDEX 11 | Should be BREACHED
    {
      sloValue: 50,  // Breached as SLI 50 != SLO 50 is false
      sloType: SLO_TYPE.NotEqualTo,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      messengerContract: CONTRACT_NAMES.BaseOracle, // BaseOracle returns SLIs (0~100)
      initialPeriodId: 0,
      finalPeriodId: 51,
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
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan:[],
      },
    },
    // INDEX 12
    {
      sloValue: 0.99,
      sloType: SLO_TYPE.SmallerThan, // You want less inflation :)
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.InflationOracle,
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
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan:[],
      },
    },
    // INDEX 13
    {
      sloValue: 99,
      sloType: SLO_TYPE.SmallerThan, // You want less inflation :)
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.InflationOracle,
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
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan:[],
      },
    },
    // INDEX 14
    {
      sloValue: 9,
      sloType: SLO_TYPE.SmallerOrEqualTo, // You want less inflation :)
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.InflationOracle,
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
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan:[],
      },
    },
    // INDEX 15
    {
      sloValue: 9,
      sloType: SLO_TYPE.GreaterOrEqualTo, // You want less inflation :)
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.InflationOracle,
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
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan:[],
      },
    },
    // INDEX 16
    {
      sloValue: 0.1,
      sloType: SLO_TYPE.GreaterOrEqualTo, // You want less inflation :)
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.InflationOracle,
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
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan:[],
      },
    },
    // INDEX 17, Contract for IT staking tests: Not Respected case
    {
      sloValue: 50,
      sloType: SLO_TYPE.GreaterThan, // You want less inflation :)
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.BaseOracle,
      initialPeriodId: 0,
      finalPeriodId: 5,
      extraData: [],
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName: 'Staking Integration test moked Not Respected case reward not capped',
        serviceDescription:
          'The U.S. Federal Reserve (FED) inflation-driven monetary policy updates.',
        serviceImage: 'https://via.placeholder.com/1200x600',
        serviceURL: 'https://www.federalreserve.gov/',
        serviceAddress: '0x0000000000000000000000000000000000000000',
        serviceTicker: 'CPI',
        serviceUseTestExternalAdapter: true, // as sloValue is multiplied by prescision before comparison an slo of 90 will be rised to 90000 if precision is 1000
        serviceSliMockingPlan: [45000, 45000, 45000, 45000, 45000] // mocked sli values must be prepared acordingly
      },
    },
    // INDEX 18, Contract for IT staking tests: Not Respected case
    {
      sloValue: 50,
      sloType: SLO_TYPE.GreaterThan, // You want less inflation :)
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.BaseOracle,
      initialPeriodId: 0,
      finalPeriodId: 5,
      extraData: [],
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName: 'Staking Integration test moked Not Respected case reward capped',
        serviceDescription:
          'The U.S. Federal Reserve (FED) inflation-driven monetary policy updates.',
        serviceImage: 'https://via.placeholder.com/1200x600',
        serviceURL: 'https://www.federalreserve.gov/',
        serviceAddress: '0x0000000000000000000000000000000000000000',
        serviceTicker: 'CPI',
        serviceUseTestExternalAdapter: true, // as sloValue is multiplied by prescision before comparison an slo of 90 will be rised to 90000 if precision is 1000
        serviceSliMockingPlan: [30000, 30000, 30000, 30000, 30000] // mocked sli values must be prepared acordingly
      },
    },
    // INDEX 19, Contract for IT staking tests: Respected case
    {
      sloValue: 50,
      sloType: SLO_TYPE.GreaterThan, // You want less inflation :)
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.BaseOracle,
      initialPeriodId: 0,
      finalPeriodId: 5,
      extraData: [],
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName: 'Staking Integration test moked Respected case reward not capped',
        serviceDescription:
          'The U.S. Federal Reserve (FED) inflation-driven monetary policy updates.',
        serviceImage: 'https://via.placeholder.com/1200x600',
        serviceURL: 'https://www.federalreserve.gov/',
        serviceAddress: '0x0000000000000000000000000000000000000000',
        serviceTicker: 'CPI',
        serviceUseTestExternalAdapter: true, // as sloValue is multiplied by prescision before comparison an slo of 90 will be rised to 90000 if precision is 1000
        serviceSliMockingPlan: [60000, 60000, 60000, 60000, 60000] // mocked sli values must be prepared acordingly
      },
    },
    // INDEX 20, Contract for IT staking tests: Respected case
    {
      sloValue: 50,
      sloType: SLO_TYPE.GreaterThan, // You want less inflation :)
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.BaseOracle,
      initialPeriodId: 0,
      finalPeriodId: 5,
      extraData: [],
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName: 'Staking Integration test moked Respected case reward capped',
        serviceDescription:
          'The U.S. Federal Reserve (FED) inflation-driven monetary policy updates.',
        serviceImage: 'https://via.placeholder.com/1200x600',
        serviceURL: 'https://www.federalreserve.gov/',
        serviceAddress: '0x0000000000000000000000000000000000000000',
        serviceTicker: 'CPI',
        serviceUseTestExternalAdapter: true, // as sloValue is multiplied by prescision before comparison an slo of 90 will be rised to 90000 if precision is 1000
        serviceSliMockingPlan: [90000, 90000, 90000, 90000, 90000] // mocked sli values must be prepared acordingly
      },
    },
    // INDEX 21, Contract for IT staking parametric tests: Breached case
    {
      sloValue: 1,
      sloType: SLO_TYPE.SmallerThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.StakingParametricOracle,
      initialPeriodId: 0,
      finalPeriodId: 2,
      extraData: [],
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 0,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName: 'Staking Parametric Integration test moked Not Respected case',
        serviceDescription:
          'Parametric staking APR based on DSLA Token value variation between months',
        serviceImage: 'https://via.placeholder.com/1200x600',
        serviceURL: '',
        serviceAddress: '',
        serviceTicker: 'PH',
        // TODO Moove this in new parameter "testConfig"
        serviceUseTestExternalAdapter: true, // as sloValue is multiplied by prescision before comparison an slo of 90 will be rised to 90000 if precision is 1000
        serviceSliMockingPlan: [1, 7, 0], // mocked sli values must be prepared acordingly
        ...StakingParametricMessengerSpec
      },
    },
  ],
};