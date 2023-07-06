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

const AssetFloorOracleSpecs = JSON.parse(
  // @ts-ignore
  fs.readFileSync(
    `${appRoot.path}/contracts/messengers/${USE_CASES.ASSET_FLOOR}/use-case-spec.json`
  )
);

export const scripts: ScriptsConfiguration = {
  deploy_sla: [
    // INDEX 0 | Should be BREACHED
    {
      sloValue: 100, // Breached as SL0 > SLi is false
      sloType: SLO_TYPE.GreaterThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      messengerContract: CONTRACT_NAMES.BaseOracle, // BaseOracle returns SLIs (0~100)
      initialPeriodId: 0,
      finalPeriodId: 51,
      severity: [],
      penalty: [],
      initialTokenSupply: '10000000',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 1,
      leverage: 4,
      serviceMetadata: {
        serviceName: 'P-OPS',
        serviceDescription: 'Official bDSLA Beta Partner.',
        serviceImage:
          'https://storage.googleapis.com/bdsla-incentivized-beta/validators/chainode.svg',
        serviceURL: 'https://bdslaToken.network',
        serviceAddress: 'one1kf42rl6yg2avkjsu34ch2jn8yjs64ycn4n9wdj',
        serviceTicker: SENetworkNames[0],
        serviceUseTestExternalAdapter: true,
        serviceSliMockingPlan: [],
      },
    },
    // INDEX 1 | Should be HONORED
    {
      sloValue: 0, // Honored SLO > SLI of 0 is true
      sloType: SLO_TYPE.GreaterThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      messengerContract: CONTRACT_NAMES.BaseOracle,
      initialPeriodId: 0,
      finalPeriodId: 51,
      severity: [],
      penalty: [],
      initialTokenSupply: '10000000',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 1,
      leverage: 4,
      serviceMetadata: {
        serviceName: 'P-OPS',
        serviceDescription: 'Official bDSLA Beta Partner.',
        serviceImage:
          'https://storage.googleapis.com/bdsla-incentivized-beta/validators/chainode.svg',
        serviceURL: 'https://bdslaToken.network',
        serviceAddress: 'one1kf42rl6yg2avkjsu34ch2jn8yjs64ycn4n9wdj',
        serviceTicker: SENetworkNames[0],
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [],
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
      severity: [],
      penalty: [],
      initialTokenSupply: '10000000',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 1,
      leverage: 2,
      serviceMetadata: {
        serviceName: 'P-OPS',
        serviceDescription: 'Official bDSLA Beta Partner.',
        serviceImage:
          'https://storage.googleapis.com/bdsla-incentivized-beta/validators/chainode.svg',
        serviceURL: 'https://bdslaToken.network',
        serviceAddress: 'one1kf42rl6yg2avkjsu34ch2jn8yjs64ycn4n9wdj',
        serviceTicker: SENetworkNames[0],
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [],
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
      severity: [],
      penalty: [],
      initialTokenSupply: '10000000',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 1,
      leverage: 2,
      serviceMetadata: {
        serviceName: 'P-OPS',
        serviceDescription: 'Official bDSLA Beta Partner.',
        serviceImage:
          'https://storage.googleapis.com/bdsla-incentivized-beta/validators/chainode.svg',
        serviceURL: 'https://bdslaToken.network',
        serviceAddress: 'one1kf42rl6yg2avkjsu34ch2jn8yjs64ycn4n9wdj',
        serviceTicker: SENetworkNames[0],
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [],
      },
    },
    // INDEX 4 | Should be HONORED
    {
      sloValue: 100, // Honored as SLI 50 < SLO 100 is true
      sloType: SLO_TYPE.SmallerThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      messengerContract: CONTRACT_NAMES.BaseOracle, // BaseOracle returns SLIs (0~100)
      initialPeriodId: 0,
      finalPeriodId: 51,
      severity: [],
      penalty: [],
      initialTokenSupply: '10000000',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 1,
      leverage: 4,
      serviceMetadata: {
        serviceName: 'P-OPS',
        serviceDescription: 'Official bDSLA Beta Partner.',
        serviceImage:
          'https://storage.googleapis.com/bdsla-incentivized-beta/validators/chainode.svg',
        serviceURL: 'https://bdslaToken.network',
        serviceAddress: 'one1kf42rl6yg2avkjsu34ch2jn8yjs64ycn4n9wdj',
        serviceTicker: SENetworkNames[0],
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [],
      },
    },
    // INDEX 5 | Should be BREACHED
    {
      sloValue: 10, // Breached as SLI 50 < SLO 10 is false
      sloType: SLO_TYPE.SmallerThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      messengerContract: CONTRACT_NAMES.BaseOracle, // BaseOracle returns SLIs (0~100)
      initialPeriodId: 0,
      finalPeriodId: 51,
      severity: [],
      penalty: [],
      initialTokenSupply: '10000000',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 1,
      leverage: 4,
      serviceMetadata: {
        serviceName: 'P-OPS',
        serviceDescription: 'Official bDSLA Beta Partner.',
        serviceImage:
          'https://storage.googleapis.com/bdsla-incentivized-beta/validators/chainode.svg',
        serviceURL: 'https://bdslaToken.network',
        serviceAddress: 'one1kf42rl6yg2avkjsu34ch2jn8yjs64ycn4n9wdj',
        serviceTicker: SENetworkNames[0],
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [],
      },
    },
    // INDEX 6 | Should be HONORED
    {
      sloValue: 60, // Honored as SLI 50 < SLO 60 is true
      sloType: SLO_TYPE.SmallerOrEqualTo,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      messengerContract: CONTRACT_NAMES.BaseOracle, // BaseOracle returns SLIs (0~100)
      initialPeriodId: 0,
      finalPeriodId: 51,
      severity: [],
      penalty: [],
      initialTokenSupply: '10000000',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 1,
      leverage: 4,
      serviceMetadata: {
        serviceName: 'P-OPS',
        serviceDescription: 'Official bDSLA Beta Partner.',
        serviceImage:
          'https://storage.googleapis.com/bdsla-incentivized-beta/validators/chainode.svg',
        serviceURL: 'https://bdslaToken.network',
        serviceAddress: 'one1kf42rl6yg2avkjsu34ch2jn8yjs64ycn4n9wdj',
        serviceTicker: SENetworkNames[0],
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [],
      },
    },
    // INDEX 7 | Should be BREACHED
    {
      sloValue: 40, // Breached as SLI 50 < SLO 60 is false
      sloType: SLO_TYPE.SmallerOrEqualTo,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      messengerContract: CONTRACT_NAMES.BaseOracle, // BaseOracle returns SLIs (0~100)
      initialPeriodId: 0,
      finalPeriodId: 51,
      severity: [],
      penalty: [],
      initialTokenSupply: '10000000',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 1,
      leverage: 4,
      serviceMetadata: {
        serviceName: 'P-OPS',
        serviceDescription: 'Official bDSLA Beta Partner.',
        serviceImage:
          'https://storage.googleapis.com/bdsla-incentivized-beta/validators/chainode.svg',
        serviceURL: 'https://bdslaToken.network',
        serviceAddress: 'one1kf42rl6yg2avkjsu34ch2jn8yjs64ycn4n9wdj',
        serviceTicker: SENetworkNames[0],
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [],
      },
    },
    // INDEX 8 | Should be HONORED
    {
      sloValue: 50, // Breached as SLI 50 = SLO 50 is true
      sloType: SLO_TYPE.EqualTo,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      messengerContract: CONTRACT_NAMES.BaseOracle, // BaseOracle returns SLIs (0~100)
      initialPeriodId: 0,
      finalPeriodId: 51,
      severity: [],
      penalty: [],
      initialTokenSupply: '10000000',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 1,
      leverage: 4,
      serviceMetadata: {
        serviceName: 'P-OPS',
        serviceDescription: 'Official bDSLA Beta Partner.',
        serviceImage:
          'https://storage.googleapis.com/bdsla-incentivized-beta/validators/chainode.svg',
        serviceURL: 'https://bdslaToken.network',
        serviceAddress: 'one1kf42rl6yg2avkjsu34ch2jn8yjs64ycn4n9wdj',
        serviceTicker: SENetworkNames[0],
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [],
      },
    },
    // INDEX 9 | Should be BREACHED
    {
      sloValue: 51, // Breached as SLI 50 = SLO 51 is false
      sloType: SLO_TYPE.EqualTo,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      messengerContract: CONTRACT_NAMES.BaseOracle, // BaseOracle returns SLIs (0~100)
      initialPeriodId: 0,
      finalPeriodId: 51,
      severity: [],
      penalty: [],
      initialTokenSupply: '10000000',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 1,
      leverage: 4,
      serviceMetadata: {
        serviceName: 'P-OPS',
        serviceDescription: 'Official bDSLA Beta Partner.',
        serviceImage:
          'https://storage.googleapis.com/bdsla-incentivized-beta/validators/chainode.svg',
        serviceURL: 'https://bdslaToken.network',
        serviceAddress: 'one1kf42rl6yg2avkjsu34ch2jn8yjs64ycn4n9wdj',
        serviceTicker: SENetworkNames[0],
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [],
      },
    },
    // INDEX 10 | Should be HONORED
    {
      sloValue: 51, // Breached as SLI 50 != SLO 51 is true
      sloType: SLO_TYPE.NotEqualTo,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      messengerContract: CONTRACT_NAMES.BaseOracle, // BaseOracle returns SLIs (0~100)
      initialPeriodId: 0,
      finalPeriodId: 51,
      severity: [],
      penalty: [],
      initialTokenSupply: '10000000',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 1,
      leverage: 4,
      serviceMetadata: {
        serviceName: 'P-OPS',
        serviceDescription: 'Official bDSLA Beta Partner.',
        serviceImage:
          'https://storage.googleapis.com/bdsla-incentivized-beta/validators/chainode.svg',
        serviceURL: 'https://bdslaToken.network',
        serviceAddress: 'one1kf42rl6yg2avkjsu34ch2jn8yjs64ycn4n9wdj',
        serviceTicker: SENetworkNames[0],
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [],
      },
    },
    // INDEX 11 | Should be BREACHED
    {
      sloValue: 50, // Breached as SLI 50 != SLO 50 is false
      sloType: SLO_TYPE.NotEqualTo,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      messengerContract: CONTRACT_NAMES.BaseOracle, // BaseOracle returns SLIs (0~100)
      initialPeriodId: 0,
      finalPeriodId: 51,
      severity: [],
      penalty: [],
      initialTokenSupply: '10000000',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 1,
      leverage: 4,
      serviceMetadata: {
        serviceName: 'P-OPS',
        serviceDescription: 'Official bDSLA Beta Partner.',
        serviceImage:
          'https://storage.googleapis.com/bdsla-incentivized-beta/validators/chainode.svg',
        serviceURL: 'https://bdslaToken.network',
        serviceAddress: 'one1kf42rl6yg2avkjsu34ch2jn8yjs64ycn4n9wdj',
        serviceTicker: SENetworkNames[0],
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [],
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
      severity: [],
      penalty: [],
      initialTokenSupply: '10000000',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 2,
      leverage: 2, // 100 / 50 = 2% premium
      serviceMetadata: {
        serviceName: 'Federal Reserve',
        serviceDescription:
          'The U.S. Federal Reserve (FED) inflation-driven monetary policy updates.',
        serviceImage: 'https://via.placeholder.com/1200x600',
        serviceURL: 'https://www.federalreserve.gov/',
        serviceAddress: '0x0000000000000000000000000000000000000000',
        serviceTicker: 'CPI',
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [],
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
      severity: [],
      penalty: [],
      initialTokenSupply: '10000000',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 2,
      leverage: 2, // 100 / 50 = 2% premium
      serviceMetadata: {
        serviceName: 'Federal Reserve',
        serviceDescription:
          'The U.S. Federal Reserve (FED) inflation-driven monetary policy updates.',
        serviceImage: 'https://via.placeholder.com/1200x600',
        serviceURL: 'https://www.federalreserve.gov/',
        serviceAddress: '0x0000000000000000000000000000000000000000',
        serviceTicker: 'CPI',
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [],
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
      severity: [],
      penalty: [],
      initialTokenSupply: '10000000',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 2,
      leverage: 2, // 100 / 50 = 2% premium
      serviceMetadata: {
        serviceName: 'Federal Reserve',
        serviceDescription:
          'The U.S. Federal Reserve (FED) inflation-driven monetary policy updates.',
        serviceImage: 'https://via.placeholder.com/1200x600',
        serviceURL: 'https://www.federalreserve.gov/',
        serviceAddress: '0x0000000000000000000000000000000000000000',
        serviceTicker: 'CPI',
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [],
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
      severity: [],
      penalty: [],
      initialTokenSupply: '10000000',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 2,
      leverage: 2, // 100 / 50 = 2% premium
      serviceMetadata: {
        serviceName: 'Federal Reserve',
        serviceDescription:
          'The U.S. Federal Reserve (FED) inflation-driven monetary policy updates.',
        serviceImage: 'https://via.placeholder.com/1200x600',
        serviceURL: 'https://www.federalreserve.gov/',
        serviceAddress: '0x0000000000000000000000000000000000000000',
        serviceTicker: 'CPI',
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [],
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
      severity: [],
      penalty: [],
      initialTokenSupply: '10000000',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 2,
      leverage: 2, // 100 / 50 = 2% premium
      serviceMetadata: {
        serviceName: 'Federal Reserve',
        serviceDescription:
          'The U.S. Federal Reserve (FED) inflation-driven monetary policy updates.',
        serviceImage: 'https://via.placeholder.com/1200x600',
        serviceURL: 'https://www.federalreserve.gov/',
        serviceAddress: '0x0000000000000000000000000000000000000000',
        serviceTicker: 'CPI',
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [],
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
      severity: [],
      penalty: [],
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName:
          'Staking Integration test moked Not Respected case reward not capped',
        serviceDescription:
          'The U.S. Federal Reserve (FED) inflation-driven monetary policy updates.',
        serviceImage: 'https://via.placeholder.com/1200x600',
        serviceURL: 'https://www.federalreserve.gov/',
        serviceAddress: '0x0000000000000000000000000000000000000000',
        serviceTicker: 'CPI',
        serviceUseTestExternalAdapter: true, // as sloValue is multiplied by prescision before comparison an slo of 90 will be rised to 90000 if precision is 1000
        serviceSliMockingPlan: [45000, 45000, 45000, 45000, 45000], // mocked sli values must be prepared acordingly
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
      severity: [],
      penalty: [],
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName:
          'Staking Integration test moked Not Respected case reward capped',
        serviceDescription:
          'The U.S. Federal Reserve (FED) inflation-driven monetary policy updates.',
        serviceImage: 'https://via.placeholder.com/1200x600',
        serviceURL: 'https://www.federalreserve.gov/',
        serviceAddress: '0x0000000000000000000000000000000000000000',
        serviceTicker: 'CPI',
        serviceUseTestExternalAdapter: true, // as sloValue is multiplied by prescision before comparison an slo of 90 will be rised to 90000 if precision is 1000
        serviceSliMockingPlan: [30000, 30000, 30000, 30000, 30000], // mocked sli values must be prepared acordingly
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
      severity: [],
      penalty: [],
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName:
          'Staking Integration test moked Respected case reward not capped',
        serviceDescription:
          'The U.S. Federal Reserve (FED) inflation-driven monetary policy updates.',
        serviceImage: 'https://via.placeholder.com/1200x600',
        serviceURL: 'https://www.federalreserve.gov/',
        serviceAddress: '0x0000000000000000000000000000000000000000',
        serviceTicker: 'CPI',
        serviceUseTestExternalAdapter: true, // as sloValue is multiplied by prescision before comparison an slo of 90 will be rised to 90000 if precision is 1000
        serviceSliMockingPlan: [60000, 60000, 60000, 60000, 60000], // mocked sli values must be prepared acordingly
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
      severity: [],
      penalty: [],
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName:
          'Staking Integration test moked Respected case reward capped',
        serviceDescription:
          'The U.S. Federal Reserve (FED) inflation-driven monetary policy updates.',
        serviceImage: 'https://via.placeholder.com/1200x600',
        serviceURL: 'https://www.federalreserve.gov/',
        serviceAddress: '0x0000000000000000000000000000000000000000',
        serviceTicker: 'CPI',
        serviceUseTestExternalAdapter: true, // as sloValue is multiplied by prescision before comparison an slo of 90 will be rised to 90000 if precision is 1000
        serviceSliMockingPlan: [90000, 90000, 90000, 90000, 90000], // mocked sli values must be prepared acordingly
      },
    },
    // INDEX 21, Contract for IT staking parametric tests: Edge cases
    // Cases: price close to next severity level, negative severity
    {
      sloValue: 1,
      sloType: SLO_TYPE.SmallerThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.StakingParametricOracle,
      initialPeriodId: 0,
      finalPeriodId: 2,
      severity: [0, 100000, 250000], // [0%, 100%, 250%] (1000 == 1%) [price stable or down, up 100%, up 250%]
      penalty: [100, 1000, 2500], // [1%, 10%, 25%]
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName:
          'Staking Parametric Integration test moked Not Respected case',
        serviceDescription:
          'Parametric staking APR based on DSLA Token value variation between months',
        serviceImage: 'https://via.placeholder.com/1200x600',
        serviceURL: '',
        serviceAddress: '',
        serviceTicker: 'PH',
        serviceUseTestExternalAdapter: true,
        serviceSliMockingPlan: [1000, 100000, 250000],
        ...StakingParametricMessengerSpec,
      },
    },
    // INDEX 22, Contract for IT staking parametric tests: Breached case, max compensation of 25%
    // Cases: price stable, price rise,  price huge rise (capped reward) USED CONTRACT CONF
    {
      sloValue: 1,
      sloType: SLO_TYPE.SmallerThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.StakingParametricOracle,
      initialPeriodId: 0,
      finalPeriodId: 2,
      severity: [0, 100000, 250000], // [0%, 100%, 250%] (1000 == 1%) [price stable or down, up 100%, up 250%]
      penalty: [100, 1000, 2500], // [1%, 10%, 25%]
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 100,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName:
          'Staking Parametric Integration test moked Not Respected case',
        serviceDescription:
          'Parametric staking APR based on DSLA Token value variation between months',
        serviceImage: 'https://via.placeholder.com/1200x600',
        serviceURL: '',
        serviceAddress: '',
        serviceTicker: 'PH',
        serviceUseTestExternalAdapter: true,
        serviceSliMockingPlan: [1000, 100001, 250001],
        ...StakingParametricMessengerSpec,
      },
    },
    // INDEX 23, Contract for IT staking parametric tests: Breached case, max compensation of 25%
    // Cases: price stable, price rise,  price huge rise (capped reward)
    {
      sloValue: 102,
      sloType: SLO_TYPE.SmallerThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.HOURLY,
      messengerContract: CONTRACT_NAMES.StakingParametricOracle,
      initialPeriodId: 0,
      finalPeriodId: 23,
      severity: [0, 100000, 250000], // [0%, 100%, 250%] (1000 == 1%) [price stable or down, up 100%, up 250%]
      penalty: [1000, 10000, 25000], // [1%, 10%, 25%]
      initialTokenSupply: '1000000',
      initialTokenSupplyDivisor: 1,
      deployerStakeTimes: 1,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName: 'DSLA Parametric Staking',
        serviceDescription:
          'Upside Hedging SLA. A $DSLA staking experience with an APR indexed on $DSLA Month-on-Month price increase.',
        serviceImage: 'https://storage.googleapis.com/dsla-network/dsla.png',
        serviceURL: 'https://dsla.network',
        serviceAddress: 'dsla.eth',
        serviceTicker: 'PS',
        serviceUseTestExternalAdapter: true,
        serviceSliMockingPlan: [1000, 100000, 250000],
        ...StakingParametricMessengerSpec,
      },
    },
    // INDEX 24, Contract for mainnet deployment of DSLA Parametric Staking
    {
      sloValue: 103,
      sloType: SLO_TYPE.SmallerThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.StakingParametricOracle,
      initialPeriodId: 0,
      finalPeriodId: 11,
      severity: [0, 100000, 250000], // [0%, 100%, 250%] (1000 == 1%) [price stable or down, up 100%, up 250%]
      penalty: [1000, 10000, 25000], // [1%, 10%, 25%]
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 1,
      deployerStakeTimes: 1,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName: 'DSLA Parametric Staking',
        serviceDescription:
          'Upside Hedging SLA. A DSLA staking experience where the APR is indexed on the Month-on-Month upside price performance of the DSLA token.',
        serviceImage: 'https://storage.googleapis.com/dsla-network/dsla.png',
        serviceURL: 'https://dsla.network',
        serviceAddress: 'dsla.eth',
        serviceTicker: 'DSLA',
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [1000, 100000, 250000],
        ...StakingParametricMessengerSpec,
      },
    },
    // INDEX 25, Contract for mainnet deployment of DSLA Parametric Staking v2.0
    {
      sloValue: 1,
      sloType: SLO_TYPE.SmallerThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.StakingParametricOracle,
      initialPeriodId: 2,
      finalPeriodId: 7,
      severity: [0, 100000, 250000], // [0%, 100%, 250%] (1000 == 1%) [price stable or down, up 100%, up 250%]
      penalty: [100, 1000, 2500], // [1%, 10%, 25%]
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 1,
      deployerStakeTimes: 1,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName: 'DSLA Parametric Staking',
        serviceDescription:
          'Upside Hedging SLA. A DSLA staking experience where the APR is indexed on the Month-on-Month upside price performance of the DSLA token.',
        serviceImage: 'https://storage.googleapis.com/dsla-network/dsla.png',
        serviceURL: 'https://dsla.network',
        serviceAddress: 'dsla.eth',
        serviceTicker: 'DSLA',
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [1000, 100000, 250000],
        ...StakingParametricMessengerSpec,
      },
    },
    // INDEX 26, Contract for 1st official NFT listing (DSLA Astromancer)
    {
      sloValue: 0.075,
      sloType: SLO_TYPE.GreaterThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      messengerContract: CONTRACT_NAMES.AssetFloorOracle,
      initialPeriodId: 13, // 09/01/2023 00:00:00
      finalPeriodId: 17, // 06/02/2023 00:00:00
      severity: [], // SLI vs SLO Deviation
      penalty: [], // SLI vs SLO Deviation
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 1,
      deployerStakeTimes: 1,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName: 'DSLA Astromancers',
        serviceDescription:
          '10,000 unique collectibles on the Ethereum blockchain. Official DSLA collection.',
        serviceImage:
          'https://storage.googleapis.com/dsla-network/collections/astromancer.jpg',
        serviceURL: 'https://dsla.network/metaverse',
        serviceAddress: '0xd88329bF3b7776Bff90D0c942F160Cb55bf5BaeC',
        serviceTicker: 'ASTRO',
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [5, 15, 25],
        ...AssetFloorOracleSpecs,
      },
    },
    // INDEX 27, Contract for 1st official NFT listing (BAYC)
    {
      sloValue: 80,
      sloType: SLO_TYPE.GreaterThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      messengerContract: CONTRACT_NAMES.AssetFloorOracle,
      initialPeriodId: 11, // 09/01/2023 00:00:00
      finalPeriodId: 15, // 06/02/2023 00:00:00
      severity: [], // SLI vs SLO Deviation
      penalty: [], // SLI vs SLO Deviation
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 1,
      deployerStakeTimes: 1,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName: 'Bored Ape Yacht Club',
        serviceDescription:
          '10,000 unique collectibles on the Ethereum blockchain.',
        serviceImage:
          'https://storage.googleapis.com/dsla-network/collections/bayc.jpg',
        serviceURL: 'https://boredapeyachtclub.com/',
        serviceAddress: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
        serviceTicker: 'BAYC',
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [5, 15, 25],
        ...AssetFloorOracleSpecs,
      },
    },
    // INDEX 28, Contract for 1st official NFT listing (MAYC)
    {
      sloValue: 18,
      sloType: SLO_TYPE.GreaterThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      messengerContract: CONTRACT_NAMES.AssetFloorOracle,
      initialPeriodId: 11, // 09/01/2023 00:00:00
      finalPeriodId: 15, // 06/02/2023 00:00:00
      severity: [], // SLI vs SLO Deviation
      penalty: [], // SLI vs SLO Deviation
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 1,
      deployerStakeTimes: 1,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName: 'Mutant Ape Yacht Club',
        serviceDescription:
          '20,000 unique collectibles on the Ethereum blockchain.',
        serviceImage:
          'https://storage.googleapis.com/dsla-network/collections/mayc.jpg',
        serviceURL: 'https://boredapeyachtclub.com/',
        serviceAddress: '0x60E4d786628Fea6478F785A6d7e704777c86a7c6',
        serviceTicker: 'MAYC',
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [5, 15, 25],
        ...AssetFloorOracleSpecs,
      },
    },
    // INDEX 29, Contract for 1st official NFT listing (Azuki)
    {
      sloValue: 18,
      sloType: SLO_TYPE.GreaterThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      messengerContract: CONTRACT_NAMES.AssetFloorOracle,
      initialPeriodId: 11, // 09/01/2023 00:00:00
      finalPeriodId: 15, // 06/02/2023 00:00:00
      severity: [], // SLI vs SLO Deviation
      penalty: [], // SLI vs SLO Deviation
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 1,
      deployerStakeTimes: 1,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName: 'Azuki',
        serviceDescription:
          '10,000 unique collectibles on the Ethereum blockchain.',
        serviceImage:
          'https://storage.googleapis.com/dsla-network/collections/azuki.jpg',
        serviceURL: 'https://www.azuki.com/',
        serviceAddress: '0xED5AF388653567Af2F388E6224dC7C4b3241C544',
        serviceTicker: 'AZUKI',
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [5, 15, 25],
        ...AssetFloorOracleSpecs,
      },
    },
    // INDEX 30, Contract for 1st official NFT listing (Pudgy Penguins)
    {
      sloValue: 7,
      sloType: SLO_TYPE.GreaterThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      messengerContract: CONTRACT_NAMES.AssetFloorOracle,
      initialPeriodId: 11, // 09/01/2023 00:00:00
      finalPeriodId: 15, // 06/02/2023 00:00:00
      severity: [], // SLI vs SLO Deviation
      penalty: [], // SLI vs SLO Deviation
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 1,
      deployerStakeTimes: 1,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName: 'Pudgy Penguins',
        serviceDescription:
          '8,888 unique collectibles on the Ethereum blockchain.',
        serviceImage:
          'https://storage.googleapis.com/dsla-network/collections/pudgypenguins.jpg',
        serviceURL: 'https://www.pudgypenguins.com/',
        serviceAddress: '0xBd3531dA5CF5857e7CfAA92426877b022e612cf8',
        serviceTicker: 'PPG',
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [5, 15, 25],
        ...AssetFloorOracleSpecs,
      },
    },
    // INDEX 31, Contract for 1st official LSD listing (stETH)
    {
      sloValue: 99,
      sloType: SLO_TYPE.GreaterThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.AssetPegOracle,
      initialPeriodId: 4, // 03/01/2023 00:00:00
      finalPeriodId: 7, // 06/01/2023 00:00:00
      severity: [], // SLI vs SLO Deviation
      penalty: [], // SLI vs SLO Deviation
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 1,
      deployerStakeTimes: 1,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName: 'stETH by Lido',
        serviceDescription:
          'stETH is a liquid staking derivative (LSD) by Lido pegged 1:1 against ETH.',
        serviceImage:
          'https://storage.googleapis.com/dsla-network/services/LIDO.png',
        serviceURL: 'https://lido.fi/',
        serviceAddress: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
        serviceTicker: 'stETH',
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [5, 15, 25],
      },
    },
    // INDEX 32, Contract for 1st official LSD listing (frxETH)
    {
      sloValue: 99,
      sloType: SLO_TYPE.GreaterThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.AssetPegOracle,
      initialPeriodId: 4, // 03/01/2023 00:00:00
      finalPeriodId: 7, // 06/01/2023 00:00:00
      severity: [], // SLI vs SLO Deviation
      penalty: [], // SLI vs SLO Deviation
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 1,
      deployerStakeTimes: 1,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName: 'frxETH by Frax',
        serviceDescription:
          'frxETH is an liquid staking derivative (LSD) by Frax pegged 1:1 against ETH.',
        serviceImage:
          'https://storage.googleapis.com/dsla-network/services/FRAX.svg',
        serviceURL: 'https://frax.finance/',
        serviceAddress: '0x5E8422345238F34275888049021821E8E08CAa1f',
        serviceTicker: 'frxETH',
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [5, 15, 25],
      },
    },
    // INDEX 33, Contract for 1st official stablecoin listing (BUSD)
    {
      sloValue: 99,
      sloType: SLO_TYPE.GreaterThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.AssetPegOracle,
      initialPeriodId: 4, // 03/01/2023 00:00:00
      finalPeriodId: 7, // 06/01/2023 00:00:00
      severity: [], // SLI vs SLO Deviation
      penalty: [], // SLI vs SLO Deviation
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 1,
      deployerStakeTimes: 1,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName: 'Binance USD',
        serviceDescription: 'BUSD is an USD stablecoin issued by Paxos and used by the Binance exchange.',
        serviceImage:
          'https://storage.googleapis.com/dsla-network/currencies/BUSD.svg',
        serviceURL: 'https://paxos.com/',
        serviceAddress: '0x4Fabb145d64652a948d72533023f6E7A623C7C53',
        serviceTicker: 'BUSD',
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [5, 15, 25],
      },
    },
    // INDEX 34, Contract for listing Lybra Finance (eUSD)
    {
      sloValue: 99,
      sloType: SLO_TYPE.GreaterThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.AssetPegOracle,
      initialPeriodId: 9, // 08/01/2023 00:00:00
      finalPeriodId: 10, // 09/07/2023 00:00:00
      severity: [], // SLI vs SLO Deviation
      penalty: [], // SLI vs SLO Deviation
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 1,
      deployerStakeTimes: 1,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName: 'Lybra eUSD',
        serviceDescription: "eUSD is an USD stablecoin issued by Lybra Finance that is backed by liquid staking tokens (LSD).",
        serviceImage:
          'https://storage.googleapis.com/dsla-network/currencies/EUSD.png',
        serviceURL: 'https://lybra.finance/',
        serviceAddress: '0x97de57ec338ab5d51557da3434828c5dbfada371',
        serviceTicker: 'eUSD',
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [5, 15, 25],
      },
    },
    // INDEX 35, Contract for listing Lido (sTETH)
    {
      sloValue: 99,
      sloType: SLO_TYPE.GreaterThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.AssetPegOracle,
      initialPeriodId: 9, // 08/01/2023 00:00:00
      finalPeriodId: 11, // 31/10/2023 00:00:00
      severity: [], // SLI vs SLO Deviation
      penalty: [], // SLI vs SLO Deviation
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 1,
      deployerStakeTimes: 1,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName: 'Lido stEPH',
        serviceDescription: 'stETH is a token that represents staked ether in Lido, combining the value of initial deposit + staking rewards. stETH tokens are pegged 1:1 to the ETH staked with Lido and can be used as one would use ether, allowing users to earn Eth2 staking rewards whilst benefiting from Defi yields.',
        serviceImage:
          'https://storage.googleapis.com/dsla-network/currencies/STEPH.png',
        serviceURL: 'https://stake.lido.fi/',
        serviceAddress: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
        serviceTicker: 'stETH',
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [5, 15, 25],
      },
    },
    // INDEX 36, Contract for listing Coinbase Wrapped Staked ETH (cbETH)
    {
      sloValue: 99,
      sloType: SLO_TYPE.GreaterThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.AssetPegOracle,
      initialPeriodId: 9, // 08/01/2023 00:00:00
      finalPeriodId: 11, // 31/10/2023 00:00:00
      severity: [], // SLI vs SLO Deviation
      penalty: [], // SLI vs SLO Deviation
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 1,
      deployerStakeTimes: 1,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName: 'Coinbase Wrapped Staked ETH',
        serviceDescription: 'Coinbase Wrapped Staked ETH (“cbETH”) is a utility token and liquid representation of ETH staked through Coinbase. cbETH gives customers the option to sell, transfer, or otherwise use their staked ETH in dapps while it remains locked by the Ethereum protocol.',
        serviceImage:
          'https://storage.googleapis.com/dsla-network/currencies/CBEPH.png',
        serviceURL: 'https://stake.lido.fi/',
        serviceAddress: '0xBe9895146f7AF43049ca1c1AE358B0541Ea49704',
        serviceTicker: 'cbETH',
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [5, 15, 25],
      },
    },
    // INDEX 37, Contract for listing Rocket Pool ETH (rETH)
    {
      sloValue: 99,
      sloType: SLO_TYPE.GreaterThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.AssetPegOracle,
      initialPeriodId: 9, // 08/01/2023 00:00:00
      finalPeriodId: 11, // 31/10/2023 00:00:00
      severity: [], // SLI vs SLO Deviation
      penalty: [], // SLI vs SLO Deviation
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 1,
      deployerStakeTimes: 1,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName: 'Rocket Pool ETH',
        serviceDescription: 'Rocket Pool is a decentralised Ethereum Proof of Stake pool.',
        serviceImage:
          'https://storage.googleapis.com/dsla-network/currencies/RETH.png',
        serviceURL: 'https://stake.lido.fi/',
        serviceAddress: '0xae78736Cd615f374D3085123A210448E74Fc6393',
        serviceTicker: 'rETH',
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [5, 15, 25],
      },
    },
    // INDEX 38, Contract for listing Staked Frax Ether (sfrxETH)
    {
      sloValue: 99,
      sloType: SLO_TYPE.GreaterThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.AssetPegOracle,
      initialPeriodId: 9, // 08/01/2023 00:00:00
      finalPeriodId: 11, // 31/10/2023 00:00:00
      severity: [], // SLI vs SLO Deviation
      penalty: [], // SLI vs SLO Deviation
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 1,
      deployerStakeTimes: 1,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName: 'Staked Frax Ether sfrxETH',
        serviceDescription: "sfrxETH is the version of frxETH which accrues staking yield. All profit generated from Frax Ether validators is distributed to sfrxETH holders. By exchanging frxETH for sfrxETH, one become's eligible for staking yield, which is redeemed upon converting sfrxETH back to frxETH.",
        serviceImage:
          'https://storage.googleapis.com/dsla-network/currencies/SFRXETH.png',
        serviceURL: 'https://app.frax.finance/',
        serviceAddress: '0xac3E018457B222d93114458476f3E3416Abbe38F',
        serviceTicker: 'sfrxETH',
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [5, 15, 25],
      },
    },
    // INDEX 39, Contract for listing StakeWise Staked ETH2 (sETH2)
    {
      sloValue: 99,
      sloType: SLO_TYPE.GreaterThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.AssetPegOracle,
      initialPeriodId: 9, // 08/01/2023 00:00:00
      finalPeriodId: 11, // 31/10/2023 00:00:00
      severity: [], // SLI vs SLO Deviation
      penalty: [], // SLI vs SLO Deviation
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 1,
      deployerStakeTimes: 1,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName: 'StakeWise Staked ETH2',
        serviceDescription: "sETH2 represents ETH that has been deposited into StakeWise Pool. It doesn't reflect the accrued staking rewards, only the principal amount, i.e. deposit.",
        serviceImage:
          'https://storage.googleapis.com/dsla-network/currencies/STETH2.png',
        serviceURL: 'https://stakewise.io/',
        serviceAddress: '0xFe2e637202056d30016725477c5da089Ab0A043A',
        serviceTicker: 'sETH2',
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [5, 15, 25],
      },
    },
    // INDEX 40, Contract for listing Binance staked ETH
    {
      sloValue: 99,
      sloType: SLO_TYPE.GreaterThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.AssetPegOracle,
      initialPeriodId: 9, // 08/01/2023 00:00:00
      finalPeriodId: 11, // 31/10/2023 00:00:00
      severity: [], // SLI vs SLO Deviation
      penalty: [], // SLI vs SLO Deviation
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 1,
      deployerStakeTimes: 1,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName: 'Binance staked ETH',
        serviceDescription: 'WBETH is a new liquid staking token, where 1 WBETH represents 1 BETH and the total staking rewards accrued by the BETH token.',
        serviceImage: 'https://storage.googleapis.com/dsla-network/currencies/WBETH.png',
        serviceURL: 'https://www.binance.com/en/',
        serviceAddress: '0xa2E3356610840701BDf5611a53974510Ae27E2e1',
        serviceTicker: 'wBETH',
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [5, 15, 25],
      },
    },
    // INDEX 41, Contract for listing StakeHound stakedETH (stETH)
    {
      sloValue: 99,
      sloType: SLO_TYPE.GreaterThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.AssetPegOracle,
      initialPeriodId: 9, // 08/01/2023 00:00:00
      finalPeriodId: 11, // 31/10/2023 00:00:00
      severity: [], // SLI vs SLO Deviation
      penalty: [], // SLI vs SLO Deviation
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 1,
      deployerStakeTimes: 1,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName: 'StakeHound stakedETH (stETH)',
        serviceDescription: "stakedETH (stETH) from StakeHound is a tokenized representation of ETH staked in Ethereum 2.0 mainnet which allows holders to earn Eth2 staking rewards while participating in the Ethereum DeFi ecosystem. Staking rewards are distributed directly into holders' wallets.",
        serviceImage: 'https://storage.googleapis.com/dsla-network/currencies/STAKEDETH.png',
        serviceURL: 'https://stakehound.com/',
        serviceAddress: '0xDFe66B14D37C77F4E9b180cEb433d1b164f0281D',
        serviceTicker: 'stETH',
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [5, 15, 25],
      },
    },
    // INDEX 42, Contract for listing Ankr Staked ETH (ankrETH)
    {
      sloValue: 99,
      sloType: SLO_TYPE.GreaterThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.AssetPegOracle,
      initialPeriodId: 9, // 08/01/2023 00:00:00
      finalPeriodId: 11, // 31/10/2023 00:00:00
      severity: [], // SLI vs SLO Deviation
      penalty: [], // SLI vs SLO Deviation
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 1,
      deployerStakeTimes: 1,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName: 'Ankr Staked ETH ankrETH',
        serviceDescription: "Ankr's Eth2 staking solution provides the best user experience and highest level of safety, combined with an attractive reward mechanism and instant staking liquidity through a bond-like synthetic token called aETH.",
        serviceImage:
          'https://storage.googleapis.com/dsla-network/currencies/ANKRETH.png',
        serviceURL: 'https://www.ankr.com/staking-crypto/',
        serviceAddress: '0xE95A203B1a91a908F9B9CE46459d101078c2c3cb',
        serviceTicker: 'ankrETH',
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [5, 15, 25],
      },
    },
    // INDEX 42, Contract for listing SweLl Network swETH
    {
      sloValue: 99,
      sloType: SLO_TYPE.GreaterThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.AssetPegOracle,
      initialPeriodId: 9, // 08/01/2023 00:00:00
      finalPeriodId: 11, // 31/10/2023 00:00:00
      severity: [], // SLI vs SLO Deviation
      penalty: [], // SLI vs SLO Deviation
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 1,
      deployerStakeTimes: 1,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName: 'SweLl Network swETH',
        serviceDescription: 'swETH is a decentralized and non-custodial liquid staking token that provides users with the opportunity to earn staking rewards while retaining liquidity over their Ethereum holdings.',
        serviceImage:
          'https://storage.googleapis.com/dsla-network/currencies/SWETH.png',
        serviceURL: 'https://www.swellnetwork.io/',
        serviceAddress: '0xf951E335afb289353dc249e82926178EaC7DEd78',
        serviceTicker: 'swETH',
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [5, 15, 25],
      },
    },
    // INDEX 43, Contract for listing Cream ETH Token (CRETH2)
    {
      sloValue: 99,
      sloType: SLO_TYPE.GreaterThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.AssetPegOracle,
      initialPeriodId: 9, // 08/01/2023 00:00:00
      finalPeriodId: 11, // 31/10/2023 00:00:00
      severity: [], // SLI vs SLO Deviation
      penalty: [], // SLI vs SLO Deviation
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 1,
      deployerStakeTimes: 1,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName: 'Cream ETH Token (CRETH2)',
        serviceDescription: 'Cream.Finance offers flexible stake ETH with C.R.E.A.M. for Eth2.',
        serviceImage:
          'https://storage.googleapis.com/dsla-network/currencies/CRETH2.png',
        serviceURL: 'https://classic.cream.finance/eth2/',
        serviceAddress: '0x49D72e3973900A195A155a46441F0C08179FdB64',
        serviceTicker: 'CRETH2',
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [5, 15, 25],
      },
    },
    // INDEX 44, Contract for listing StaFi Staked ETH
    {
      sloValue: 99,
      sloType: SLO_TYPE.GreaterThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.AssetPegOracle,
      initialPeriodId: 9, // 08/01/2023 00:00:00
      finalPeriodId: 11, // 31/10/2023 00:00:00
      severity: [], // SLI vs SLO Deviation
      penalty: [], // SLI vs SLO Deviation
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 1,
      deployerStakeTimes: 1,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName: 'StaFi Staked ETH',
        serviceDescription: "StaFi protocol is the first decentralized protocol unlocking liquidity of Staked assets.StaFi aims to solve the contradiction between Mainnet security and token liquidity in PoS consensus.",
        serviceImage:
          'https://storage.googleapis.com/dsla-network/currencies/STAFIRETH.png',
        serviceURL: 'https://app.stafi.io',
        serviceAddress: '0x9559aaa82d9649c7a7b220e7c461d2e74c9a3593',
        serviceTicker: 'rETH',
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [5, 15, 25],
      },
    },    // INDEX 45, Contract for listing Guarded Ether (GETH)
    {
      sloValue: 99,
      sloType: SLO_TYPE.GreaterThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.AssetPegOracle,
      initialPeriodId: 9, // 08/01/2023 00:00:00
      finalPeriodId: 11, // 31/10/2023 00:00:00
      severity: [], // SLI vs SLO Deviation
      penalty: [], // SLI vs SLO Deviation
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 1,
      deployerStakeTimes: 1,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName: 'Guarded Ether GETH',
        serviceDescription: 'Guarda Wallet is a non-custodial cryptocurrency wallet. Stake, exchange, earn and buy Ethereum, Bitcoin, and thousands of other assets. Guarded Ether is ETH2 stake token.',
        serviceImage:
          'https://storage.googleapis.com/dsla-network/currencies/GETH.png',
        serviceURL: 'https://guarda.com/staking/ethereum-staking/',
        serviceAddress: '0x3802c218221390025bceabbad5d8c59f40eb74b8',
        serviceTicker: 'GETH',
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [5, 15, 25],
      },
    },    // INDEX 46, Contract for listing NodeDAO ETH (nETH)
    {
      sloValue: 99,
      sloType: SLO_TYPE.GreaterThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.AssetPegOracle,
      initialPeriodId: 9, // 08/01/2023 00:00:00
      finalPeriodId: 11, // 31/10/2023 00:00:00
      severity: [], // SLI vs SLO Deviation
      penalty: [], // SLI vs SLO Deviation
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 1,
      deployerStakeTimes: 1,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName: 'NodeDAO nETH',
        serviceDescription: 'NodeDAO has introduced nETH, a liquid staking token that is minted upon staking ETH',
        serviceImage:
          'https://storage.googleapis.com/dsla-network/currencies/NETH.png',
        serviceURL: 'https://www.nodedao.com/',
        serviceAddress: '0xC6572019548dfeBA782bA5a2093C836626C7789A',
        serviceTicker: 'nETH',
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [5, 15, 25],
      },
    },    // INDEX 47, Contract for listing Hord hETH
    {
      sloValue: 99,
      sloType: SLO_TYPE.GreaterThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.MONTHLY,
      messengerContract: CONTRACT_NAMES.AssetPegOracle,
      initialPeriodId: 9, // 08/01/2023 00:00:00
      finalPeriodId: 11, // 31/10/2023 00:00:00
      severity: [], // SLI vs SLO Deviation
      penalty: [], // SLI vs SLO Deviation
      initialTokenSupply: '0',
      initialTokenSupplyDivisor: 1,
      deployerStakeTimes: 1,
      notDeployerStakeTimes: 1,
      leverage: 1,
      serviceMetadata: {
        serviceName: 'HordETH hETH',
        serviceDescription: 'Hord offers a safe and easy way for users to stake their ETH by taking care of the validators and the technical operation.',
        serviceImage:
          'https://storage.googleapis.com/dsla-network/currencies/HETH.png',
        serviceURL: 'https://app.hord.fi/',
        serviceAddress: '0x5bBe36152d3CD3eB7183A82470b39b29EedF068B',
        serviceTicker: 'hETH',
        serviceUseTestExternalAdapter: false,
        serviceSliMockingPlan: [5, 15, 25],
      },
    }
  ],
};
