import { StackticalConfiguration } from './types';
import {
  CONTRACT_NAMES,
  PERIOD_TYPE,
  SENetworkNames,
  SENetworkNamesBytes32,
  SENetworks,
  SLO_TYPE,
} from './constants';

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

const ethereum: StackticalConfiguration = {
  chainlink: {
    isProduction: true,
    deleteOldJobs: true,
    nodeFunds: '1',
    gasLimit: undefined,
    ethWsUrl: process.env.ETHEREUM_WS_URI,
    nodesConfiguration: [
      {
        name: 'ethereum-1',
        restApiUrl: process.env.ETHEREUM_CHAINLINK_NODE_1_URL,
        restApiPort: process.env.ETHEREUM_CHAINLINK_NODE_1_PORT,
        email: process.env.ETHEREUM_CHAINLINK_NODE_1_USER,
        password: process.env.ETHEREUM_CHAINLINK_NODE_1_PASS,
        externalAdapterUrl:
          'https://europe-west1-stacktical-0.cloudfunctions.net/dsla-indexer',
      },
      {
        name: 'ethereum-2',
        restApiUrl: process.env.ETHEREUM_CHAINLINK_NODE_2_URL,
        restApiPort: process.env.ETHEREUM_CHAINLINK_NODE_2_PORT,
        email: process.env.ETHEREUM_CHAINLINK_NODE_2_USER,
        password: process.env.ETHEREUM_CHAINLINK_NODE_2_PASS,
        externalAdapterUrl:
          'https://europe-west1-stacktical-0.cloudfunctions.net/dsla-indexer',
      },
      {
        name: 'ethereum-3',
        restApiUrl: process.env.ETHEREUM_CHAINLINK_NODE_3_URL,
        restApiPort: process.env.ETHEREUM_CHAINLINK_NODE_3_PORT,
        email: process.env.ETHEREUM_CHAINLINK_NODE_3_USER,
        password: process.env.ETHEREUM_CHAINLINK_NODE_3_PASS,
        externalAdapterUrl:
          'https://europe-west1-stacktical-0.cloudfunctions.net/dsla-indexer',
      },
    ],
  },
  addresses: {
    [CONTRACT_NAMES.DSLA]: '0x3aFfCCa64c2A6f4e3B6Bd9c64CD2C969EFd1ECBe',
    [CONTRACT_NAMES.DAI]: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    [CONTRACT_NAMES.USDC]: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    [CONTRACT_NAMES.Oracle]: '0x99F4e62a317cc666589c9e370c73c15B158f3c61',
    [CONTRACT_NAMES.LinkToken]: '0x514910771af9ca656af840dff83e8264ecf986ca',
    [CONTRACT_NAMES.SLORegistry]: '0x1bE60A36Ba9De2eCeFe8be8d2720B67f932EC487',
    [CONTRACT_NAMES.SLARegistry]: '0xB63a13825e129fBa2f2205847158461bec5f265A',
    [CONTRACT_NAMES.MessengerRegistry]:
      '0x766C0b52fADC43Bc3EEAe8BC64536404981951bE',
    [CONTRACT_NAMES.PeriodRegistry]:
      '0x5Da279bE9D6CeB11e7D7117915075066909357bc',
    [CONTRACT_NAMES.StakeRegistry]:
      '0x4b48AdDd838A11061cE285106f4a30cc5636735C',
    [CONTRACT_NAMES.SEMessenger]: '0xFB29aFC3F4B78755f07faD5B86448595D2EEC86C',
    [CONTRACT_NAMES.NetworkAnalytics]:
      '0xC33492F8D76918A9527165A9fD71089980656357',
    [CONTRACT_NAMES.Details]: '0x38b0cd8BB4C4608E32EE75b25A8846459cEAd513',
    [CONTRACT_NAMES.PreCoordinator]:
      '0x7db551Ce6677211309db39A67F73cA923e9d4944',
  },
  checkPastPeriods: true,
  bootstrap: {
    messengers: {
      networkAnalytics: {
        allowedNetworks: SENetworkNames,
      },
    },
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
    registry: {
      periods: [
        {
          periodType: PERIOD_TYPE.WEEKLY,
          amountOfPeriods: 52,
          expiredPeriods: 0,
        },
      ],
      stake: {
        allowedTokens: [CONTRACT_NAMES.DAI, CONTRACT_NAMES.USDC],
        stakingParameters: {},
      },
      messengers: [
        {
          contract: CONTRACT_NAMES.SEMessenger,
          specificationPath: `${appRoot.path}/messenger-specs/${CONTRACT_NAMES.SEMessenger}`,
        },
      ],
    },
  },
  scripts: {
    deploy_sla: develop.scripts.deploy_sla,
  },
};

const harmonytestnet: StackticalConfiguration = {
  chainlink: {
    isProduction: true,
    deleteOldJobs: true,
    nodeFunds: '1',
    gasLimit: undefined,
    ethWsUrl: process.env.ETHEREUM_WS_URI,
    nodesConfiguration: [
      {
        name: 'ethereum-1',
        restApiUrl: process.env.ETHEREUM_CHAINLINK_NODE_1_URL,
        restApiPort: process.env.ETHEREUM_CHAINLINK_NODE_1_PORT,
        email: process.env.ETHEREUM_CHAINLINK_NODE_1_USER,
        password: process.env.ETHEREUM_CHAINLINK_NODE_1_PASS,
        externalAdapterUrl:
          'https://europe-west1-stacktical-0.cloudfunctions.net/dsla-indexer',
      },
      {
        name: 'ethereum-2',
        restApiUrl: process.env.ETHEREUM_CHAINLINK_NODE_2_URL,
        restApiPort: process.env.ETHEREUM_CHAINLINK_NODE_2_PORT,
        email: process.env.ETHEREUM_CHAINLINK_NODE_2_USER,
        password: process.env.ETHEREUM_CHAINLINK_NODE_2_PASS,
        externalAdapterUrl:
          'https://europe-west1-stacktical-0.cloudfunctions.net/dsla-indexer',
      },
      {
        name: 'ethereum-3',
        restApiUrl: process.env.ETHEREUM_CHAINLINK_NODE_3_URL,
        restApiPort: process.env.ETHEREUM_CHAINLINK_NODE_3_PORT,
        email: process.env.ETHEREUM_CHAINLINK_NODE_3_USER,
        password: process.env.ETHEREUM_CHAINLINK_NODE_3_PASS,
        externalAdapterUrl:
          'https://europe-west1-stacktical-0.cloudfunctions.net/dsla-indexer',
      },
    ],
  },
  addresses: {
    [CONTRACT_NAMES.DSLA]: '0x3aFfCCa64c2A6f4e3B6Bd9c64CD2C969EFd1ECBe',
    [CONTRACT_NAMES.DAI]: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    [CONTRACT_NAMES.USDC]: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    [CONTRACT_NAMES.Oracle]: '0x99F4e62a317cc666589c9e370c73c15B158f3c61',
    [CONTRACT_NAMES.LinkToken]: '0x514910771af9ca656af840dff83e8264ecf986ca',
    [CONTRACT_NAMES.SLORegistry]: '0x1bE60A36Ba9De2eCeFe8be8d2720B67f932EC487',
    [CONTRACT_NAMES.SLARegistry]: '0xB63a13825e129fBa2f2205847158461bec5f265A',
    [CONTRACT_NAMES.MessengerRegistry]:
      '0x766C0b52fADC43Bc3EEAe8BC64536404981951bE',
    [CONTRACT_NAMES.PeriodRegistry]:
      '0x5Da279bE9D6CeB11e7D7117915075066909357bc',
    [CONTRACT_NAMES.StakeRegistry]:
      '0x4b48AdDd838A11061cE285106f4a30cc5636735C',
    [CONTRACT_NAMES.SEMessenger]: '0xFB29aFC3F4B78755f07faD5B86448595D2EEC86C',
    [CONTRACT_NAMES.NetworkAnalytics]:
      '0xC33492F8D76918A9527165A9fD71089980656357',
    [CONTRACT_NAMES.Details]: '0x38b0cd8BB4C4608E32EE75b25A8846459cEAd513',
    [CONTRACT_NAMES.PreCoordinator]:
      '0x7db551Ce6677211309db39A67F73cA923e9d4944',
  },
  checkPastPeriods: true,
  bootstrap: {
    messengers: {
      networkAnalytics: {
        allowedNetworks: SENetworkNames,
      },
    },
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
    registry: {
      periods: [
        {
          periodType: PERIOD_TYPE.WEEKLY,
          amountOfPeriods: 52,
          expiredPeriods: 0,
        },
      ],
      stake: {
        allowedTokens: [CONTRACT_NAMES.DAI, CONTRACT_NAMES.USDC],
        stakingParameters: {},
      },
      messengers: [
        {
          contract: CONTRACT_NAMES.SEMessenger,
          specificationPath: `${appRoot.path}/messenger-specs/${CONTRACT_NAMES.SEMessenger}`,
        },
      ],
    },
  },
  scripts: {
    deploy_sla: develop.scripts.deploy_sla,
  },
};

const polygon: StackticalConfiguration = {
  chainlink: {
    isProduction: true,
    deleteOldJobs: true,
    nodeFunds: '1',
    gasLimit: undefined,
    ethWsUrl: process.env.ETHEREUM_WS_URI,
    nodesConfiguration: [
      {
        name: 'polygon`-1',
        restApiUrl: process.env.ETHEREUM_CHAINLINK_NODE_1_URL,
        restApiPort: process.env.ETHEREUM_CHAINLINK_NODE_1_PORT,
        email: process.env.ETHEREUM_CHAINLINK_NODE_1_USER,
        password: process.env.ETHEREUM_CHAINLINK_NODE_1_PASS,
        externalAdapterUrl:
          'https://europe-west1-stacktical-0.cloudfunctions.net/dsla-indexer',
      },
      {
        name: 'polygon`-2',
        restApiUrl: process.env.ETHEREUM_CHAINLINK_NODE_2_URL,
        restApiPort: process.env.ETHEREUM_CHAINLINK_NODE_2_PORT,
        email: process.env.ETHEREUM_CHAINLINK_NODE_2_USER,
        password: process.env.ETHEREUM_CHAINLINK_NODE_2_PASS,
        externalAdapterUrl:
          'https://europe-west1-stacktical-0.cloudfunctions.net/dsla-indexer',
      },
      {
        name: 'polygon`-3',
        restApiUrl: process.env.ETHEREUM_CHAINLINK_NODE_3_URL,
        restApiPort: process.env.ETHEREUM_CHAINLINK_NODE_3_PORT,
        email: process.env.ETHEREUM_CHAINLINK_NODE_3_USER,
        password: process.env.ETHEREUM_CHAINLINK_NODE_3_PASS,
        externalAdapterUrl:
          'https://europe-west1-stacktical-0.cloudfunctions.net/dsla-indexer',
      },
    ],
  },
  addresses: {
    [CONTRACT_NAMES.DSLA]: '0x3aFfCCa64c2A6f4e3B6Bd9c64CD2C969EFd1ECBe',
    [CONTRACT_NAMES.DAI]: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    [CONTRACT_NAMES.USDC]: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    [CONTRACT_NAMES.Oracle]: '0x99F4e62a317cc666589c9e370c73c15B158f3c61',
    [CONTRACT_NAMES.LinkToken]: '0x514910771af9ca656af840dff83e8264ecf986ca',
    [CONTRACT_NAMES.SLORegistry]: '0x1bE60A36Ba9De2eCeFe8be8d2720B67f932EC487',
    [CONTRACT_NAMES.SLARegistry]: '0xB63a13825e129fBa2f2205847158461bec5f265A',
    [CONTRACT_NAMES.MessengerRegistry]:
      '0x766C0b52fADC43Bc3EEAe8BC64536404981951bE',
    [CONTRACT_NAMES.PeriodRegistry]:
      '0x5Da279bE9D6CeB11e7D7117915075066909357bc',
    [CONTRACT_NAMES.StakeRegistry]:
      '0x4b48AdDd838A11061cE285106f4a30cc5636735C',
    [CONTRACT_NAMES.SEMessenger]: '0xFB29aFC3F4B78755f07faD5B86448595D2EEC86C',
    [CONTRACT_NAMES.NetworkAnalytics]:
      '0xC33492F8D76918A9527165A9fD71089980656357',
    [CONTRACT_NAMES.Details]: '0x38b0cd8BB4C4608E32EE75b25A8846459cEAd513',
    [CONTRACT_NAMES.PreCoordinator]:
      '0x7db551Ce6677211309db39A67F73cA923e9d4944',
  },
  checkPastPeriods: true,
  bootstrap: {
    messengers: {
      networkAnalytics: {
        allowedNetworks: SENetworkNames,
      },
    },
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
    registry: {
      periods: [
        {
          periodType: PERIOD_TYPE.WEEKLY,
          amountOfPeriods: 52,
          expiredPeriods: 0,
        },
      ],
      stake: {
        allowedTokens: [CONTRACT_NAMES.DAI, CONTRACT_NAMES.USDC],
        stakingParameters: {},
      },
      messengers: [
        {
          contract: CONTRACT_NAMES.SEMessenger,
          specificationPath: `${appRoot.path}/messenger-specs/${CONTRACT_NAMES.SEMessenger}`,
        },
      ],
    },
  },
  scripts: {
    deploy_sla: develop.scripts.deploy_sla,
  },
};

export { develop, ethereum, harmonytestnet, polygon };
