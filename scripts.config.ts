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
  ],
};
