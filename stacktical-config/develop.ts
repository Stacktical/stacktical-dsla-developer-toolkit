import { StackticalConfiguration } from '../types';
import {
  CONTRACT_NAMES,
  PERIOD_TYPE,
  SENetworkNames,
  SENetworkNamesBytes32,
  SENetworks,
  SLO_TYPE,
} from '../constants';
const appRoot = require('app-root-path');

const develop: StackticalConfiguration = {
  chainlink: {
    isProduction: false,
    deleteOldJobs: true,
    nodeFunds: '10',
    gasLimit: undefined,
    ethWsUrl: 'ws://host.docker.internal:8545',
    ethHttpUrl: 'http://host.docker.internal:8545',
    nodesConfiguration: [
      {
        name: 'develop-1',
        restApiUrl: 'http://localhost',
        restApiPort: '6688',
        email: 'test@stacktical.com',
        password: 'PaSSword123456',
        externalAdapterUrl: 'http://host.docker.internal:6060',
      },
    ],
  },
  addresses: {},
  checkPastPeriods: false,
  bootstrap: {
    allowance: [
      {
        contract: CONTRACT_NAMES.NetworkAnalytics,
        token: CONTRACT_NAMES.LinkToken,
        allowance: '10',
      },
      {
        contract: CONTRACT_NAMES.SEMessenger,
        token: CONTRACT_NAMES.LinkToken,
        allowance: '10',
      },
    ],
    messengers: {
      networkAnalytics: {
        allowedNetworks: SENetworkNames,
      },
    },
    registry: {
      periods: [
        {
          periodType: PERIOD_TYPE.HOURLY,
          amountOfPeriods: 5,
          expiredPeriods: 2,
        },
        {
          periodType: PERIOD_TYPE.DAILY,
          amountOfPeriods: 5,
          expiredPeriods: 2,
        },
        {
          periodType: PERIOD_TYPE.WEEKLY,
          amountOfPeriods: 52,
          expiredPeriods: 10,
        },
      ],
      stake: {
        allowedTokens: [CONTRACT_NAMES.DAI, CONTRACT_NAMES.USDC],
        stakingParameters: {},
      },
      messengers: [
        {
          contract: CONTRACT_NAMES.SEMessenger,
          specificationPath: `${appRoot.path}/messenger-specs/${CONTRACT_NAMES.SEMessenger}.json`,
        },
      ],
    },
  },
  scripts: {
    deploy_sla: {
      sloValue: 50 * 10 ** 3,
      sloType: SLO_TYPE.GreaterThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      initialPeriodId: 0,
      finalPeriodId: 10,
      extraData: [SENetworkNamesBytes32[SENetworks.DOT]],
      initialTokenSupply: '10000000',
      initialTokenSupplyDivisor: 100,
      leverage: 50,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 2,
      serviceMetadata: {
        serviceName: 'P-OPS',
        serviceDescription: 'Official bDSLA Beta Partner.',
        serviceImage:
          'https://storage.googleapis.com/bdsla-incentivized-beta/validators/chainode.svg',
        serviceURL: 'https://bdslaToken.network',
        serviceAddress: 'validator-address',
        serviceTicker: SENetworkNames[SENetworks.DOT],
      },
    },
  },
};

export default develop;
