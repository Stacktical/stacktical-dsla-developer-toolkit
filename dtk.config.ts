import { StackticalConfiguration } from './types';
import {
  appRoot,
  CONTRACT_NAMES,
  PERIOD_TYPE,
  SENetworkNames,
  SENetworkNamesBytes32,
  SENetworks,
  SLO_TYPE,
  TOKEN_NAMES,
  USE_CASES,
} from './constants';
import { EthereumERC20__factory, PolygonERC20__factory } from './typechain';

export const develop: StackticalConfiguration = {
  chainlink: {
    isProduction: false,
    deleteOldJobs: true,
    nodeFunds: '10',
    gasLimit: undefined,
    ethWsUrl: 'ws://host.docker.internal:8545',
    ethHttpUrl: 'http://host.docker.internal:8545',
    nodesConfiguration: [
      {
        name: 'node-1',
        restApiUrl: 'http://localhost',
        restApiPort: '6688',
        email: 'test@stacktical.com',
        password: 'PaSSword123456',
      },
    ],
  },
  addresses: {},
  checkPastPeriods: false,
  tokens: [
    {
      factory: EthereumERC20__factory,
      name: TOKEN_NAMES.DSLA,
    },
    {
      factory: EthereumERC20__factory,
      name: TOKEN_NAMES.DAI,
    },
    {
      factory: EthereumERC20__factory,
      name: TOKEN_NAMES.USDC,
    },
    {
      factory: EthereumERC20__factory,
      name: TOKEN_NAMES.USDT,
      address: '0x34704c70e9eC9fB9A921da6DAAD7D3e19f43c734',
    },
  ],
  bootstrap: {
    allowance: [
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
          expiredPeriods: 14,
        },
      ],
      stake: {
        stakingParameters: {},
      },
      messengers: [
        {
          contract: CONTRACT_NAMES.SEMessenger,
          specificationPath: `${appRoot.path}/contracts/messengers/${USE_CASES.STAKING_EFFICIENCY}/${CONTRACT_NAMES.SEMessenger}.json`,
          useCaseName: USE_CASES.STAKING_EFFICIENCY,
          externalAdapterUrl: 'http://host.docker.internal:6060',
        },
      ],
    },
  },
  scripts: {
    deploy_sla: [
      {
        sloValue: 50 * 10 ** 3,
        sloType: SLO_TYPE.GreaterThan,
        whitelisted: false,
        periodType: PERIOD_TYPE.WEEKLY,
        initialPeriodId: 0,
        finalPeriodId: 10,
        extraData: [SENetworkNamesBytes32[SENetworks.ONE]],
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
          serviceTicker: SENetworkNames[SENetworks.ONE],
        },
      },
      {
        sloValue: 15 * 10 ** 3,
        sloType: SLO_TYPE.GreaterThan,
        whitelisted: false,
        periodType: PERIOD_TYPE.WEEKLY,
        initialPeriodId: 10,
        finalPeriodId: 30,
        extraData: [SENetworkNamesBytes32[SENetworks.ONE]],
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
          serviceTicker: SENetworkNames[SENetworks.ONE],
        },
      },
      {
        sloValue: 20 * 10 ** 3,
        sloType: SLO_TYPE.GreaterThan,
        whitelisted: false,
        periodType: PERIOD_TYPE.WEEKLY,
        initialPeriodId: 10,
        finalPeriodId: 30,
        extraData: [SENetworkNamesBytes32[SENetworks.ONE]],
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
          serviceTicker: SENetworkNames[SENetworks.ONE],
        },
      },
      {
        sloValue: 25 * 10 ** 3,
        sloType: SLO_TYPE.GreaterThan,
        whitelisted: false,
        periodType: PERIOD_TYPE.WEEKLY,
        initialPeriodId: 10,
        finalPeriodId: 30,
        extraData: [SENetworkNamesBytes32[SENetworks.ONE]],
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
          serviceTicker: SENetworkNames[SENetworks.ONE],
        },
      },
      {
        sloValue: 40 * 10 ** 3,
        sloType: SLO_TYPE.GreaterThan,
        whitelisted: false,
        periodType: PERIOD_TYPE.WEEKLY,
        initialPeriodId: 10,
        finalPeriodId: 30,
        extraData: [SENetworkNamesBytes32[SENetworks.ONE]],
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
          serviceTicker: SENetworkNames[SENetworks.ONE],
        },
      },
    ],
  },
};

export const kovan: StackticalConfiguration = {
  chainlink: {
    isProduction: true,
    deleteOldJobs: true,
    nodeFunds: '0.1',
    gasLimit: undefined,
    ethWsUrl: process.env.KOVAN_WS_URI,
    ethHttpUrl: process.env.KOVAN_URI,
    nodesConfiguration: [
      {
        name: 'berlin',
        restApiUrl: process.env.KOVAN_CHAINLINK_NODE_1_URL,
        restApiPort: process.env.KOVAN_CHAINLINK_NODE_1_PORT,
        email: process.env.KOVAN_CHAINLINK_NODE_1_USER,
        password: process.env.KOVAN_CHAINLINK_NODE_1_PASS,
      },
      {
        name: 'newyork',
        restApiUrl: process.env.KOVAN_CHAINLINK_NODE_2_URL,
        restApiPort: process.env.KOVAN_CHAINLINK_NODE_2_PORT,
        email: process.env.KOVAN_CHAINLINK_NODE_2_USER,
        password: process.env.KOVAN_CHAINLINK_NODE_2_PASS,
      },
      {
        name: 'paris',
        restApiUrl: process.env.KOVAN_CHAINLINK_NODE_3_URL,
        restApiPort: process.env.KOVAN_CHAINLINK_NODE_3_PORT,
        email: process.env.KOVAN_CHAINLINK_NODE_3_USER,
        password: process.env.KOVAN_CHAINLINK_NODE_3_PASS,
      },
    ],
  },
  addresses: {},
  checkPastPeriods: false,
  tokens: [
    {
      factory: EthereumERC20__factory,
      name: TOKEN_NAMES.DSLA,
    },
    {
      factory: EthereumERC20__factory,
      name: TOKEN_NAMES.DAI,
    },
    {
      factory: EthereumERC20__factory,
      name: TOKEN_NAMES.USDC,
    },
    {
      factory: EthereumERC20__factory,
      name: TOKEN_NAMES.USDT,
    },
  ],
  bootstrap: {
    allowance: [
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
          expiredPeriods: 14,
        },
      ],
      stake: {
        stakingParameters: {},
      },
      messengers: [
        {
          contract: CONTRACT_NAMES.SEMessenger,
          specificationPath: `${appRoot.path}/contracts/messengers/${USE_CASES.STAKING_EFFICIENCY}/${CONTRACT_NAMES.SEMessenger}.json`,
          useCaseName: USE_CASES.STAKING_EFFICIENCY,
          externalAdapterUrl:
            'https://europe-west3-stacktical-0.cloudfunctions.net/staking-efficiency-indexer',
        },
      ],
    },
  },
  scripts: develop.scripts,
};

export const ethereum: StackticalConfiguration = {
  checkPastPeriods: true,
  tokens: [
    {
      factory: EthereumERC20__factory,
      name: TOKEN_NAMES.DSLA,
      address: '0x3aFfCCa64c2A6f4e3B6Bd9c64CD2C969EFd1ECBe',
    },
    {
      factory: EthereumERC20__factory,
      name: TOKEN_NAMES.DAI,
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    },
    {
      factory: EthereumERC20__factory,
      name: TOKEN_NAMES.USDC,
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    },
  ],
  chainlink: {
    isProduction: true,
    deleteOldJobs: false,
    nodeFunds: '1',
    gasLimit: undefined,
    ethWsUrl: process.env.ETHEREUM_WS_URI,
    nodesConfiguration: [
      {
        name: 'berlin',
        restApiUrl: process.env.ETHEREUM_CHAINLINK_NODE_1_URL,
        restApiPort: process.env.ETHEREUM_CHAINLINK_NODE_1_PORT,
        email: process.env.ETHEREUM_CHAINLINK_NODE_1_USER,
        password: process.env.ETHEREUM_CHAINLINK_NODE_1_PASS,
      },
      {
        name: 'newyork',
        restApiUrl: process.env.ETHEREUM_CHAINLINK_NODE_2_URL,
        restApiPort: process.env.ETHEREUM_CHAINLINK_NODE_2_PORT,
        email: process.env.ETHEREUM_CHAINLINK_NODE_2_USER,
        password: process.env.ETHEREUM_CHAINLINK_NODE_2_PASS,
      },
      {
        name: 'paris',
        restApiUrl: process.env.ETHEREUM_CHAINLINK_NODE_3_URL,
        restApiPort: process.env.ETHEREUM_CHAINLINK_NODE_3_PORT,
        email: process.env.ETHEREUM_CHAINLINK_NODE_3_USER,
        password: process.env.ETHEREUM_CHAINLINK_NODE_3_PASS,
      },
    ],
  },
  addresses: {
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
    [CONTRACT_NAMES.Details]: '0x38b0cd8BB4C4608E32EE75b25A8846459cEAd513',
    [CONTRACT_NAMES.PreCoordinator]:
      '0x7db551Ce6677211309db39A67F73cA923e9d4944',
  },
  bootstrap: {
    allowance: [
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
        stakingParameters: {},
      },
      messengers: [
        {
          contract: CONTRACT_NAMES.SEMessenger,
          specificationPath: `${appRoot.path}/contracts/messengers/${USE_CASES.STAKING_EFFICIENCY}/${CONTRACT_NAMES.SEMessenger}.json`,
          useCaseName: 'staking-efficiency',
          externalAdapterUrl:
            'https://europe-west1-stacktical-0.cloudfunctions.net/dsla-indexer',
        },
      ],
    },
  },
  scripts: {
    deploy_sla: develop.scripts.deploy_sla,
  },
};

export const harmonytestnet: StackticalConfiguration = {
  checkPastPeriods: false,
  tokens: [
    {
      factory: EthereumERC20__factory,
      name: TOKEN_NAMES.DSLA,
    },
    {
      factory: EthereumERC20__factory,
      name: TOKEN_NAMES.DAI,
    },
    {
      factory: EthereumERC20__factory,
      name: TOKEN_NAMES.USDC,
    },
  ],
  chainlink: {
    isProduction: false,
    deleteOldJobs: true,
    nodeFunds: '1',
    gasLimit: undefined,
    ethWsUrl: process.env.HARMONYTESTNET_WS_URI,
    nodesConfiguration: develop.chainlink.nodesConfiguration,
  },
  addresses: {},
  bootstrap: {
    allowance: [
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
          expiredPeriods: 20,
        },
      ],
      stake: {
        stakingParameters: {
          dslaBurnedByVerification: '0',
          dslaPlatformReward: '500',
          burnDSLA: false,
        },
      },
      messengers: develop.bootstrap.registry.messengers,
    },
  },
  scripts: {
    deploy_sla: develop.scripts.deploy_sla,
  },
};

export const harmony: StackticalConfiguration = {
  checkPastPeriods: true,
  tokens: [
    {
      factory: EthereumERC20__factory,
      name: TOKEN_NAMES.DSLA,
      address: '0x34704c70e9eC9fB9A921da6DAAD7D3e19f43c734',
    },
    {
      factory: EthereumERC20__factory,
      name: TOKEN_NAMES.DAI,
      address: '0xEf977d2f931C1978Db5F6747666fa1eACB0d0339',
    },
    {
      factory: EthereumERC20__factory,
      name: TOKEN_NAMES.USDC,
      address: '0x985458E523dB3d53125813eD68c274899e9DfAb4',
    },
    {
      factory: EthereumERC20__factory,
      name: TOKEN_NAMES.USDT,
      address: '0x3C2B8Be99c50593081EAA2A724F0B8285F5aba8f',
    },
  ],
  chainlink: {
    isProduction: true,
    deleteOldJobs: true,
    nodeFunds: '1',
    gasLimit: undefined,
    ethWsUrl: process.env.HARMONY_WS_URI,
    ethHttpUrl: process.env.HARMONY_URI,
    nodesConfiguration: [
      {
        name: 'chainlink-node-1',
        restApiUrl: process.env.HARMONY_CHAINLINK_NODE_1_URL,
        restApiPort: process.env.HARMONY_CHAINLINK_NODE_1_PORT,
        email: process.env.HARMONY_CHAINLINK_NODE_1_USER,
        password: process.env.HARMONY_CHAINLINK_NODE_1_PASS,
      },
    ],
  },
  addresses: {
    [CONTRACT_NAMES.LinkToken]: '0x218532a12a389a4a92fC0C5Fb22901D1c19198aA',
  },
  bootstrap: {
    allowance: [
      {
        contract: CONTRACT_NAMES.SEMessenger,
        token: CONTRACT_NAMES.LinkToken,
        allowance: '100',
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
        stakingParameters: {
          dslaBurnedByVerification: '0',
          dslaPlatformReward: '500',
          burnDSLA: false,
        },
      },
      messengers: [
        {
          contract: CONTRACT_NAMES.SEMessenger,
          specificationPath: `${appRoot.path}/contracts/messengers/${USE_CASES.STAKING_EFFICIENCY}/${CONTRACT_NAMES.SEMessenger}.json`,
          useCaseName: 'staking-efficiency',
          externalAdapterUrl:
            'https://europe-west1-stacktical-0.cloudfunctions.net/dsla-indexer',
        },
      ],
    },
  },
  scripts: {
    deploy_sla: develop.scripts.deploy_sla,
  },
};

export const mumbai: StackticalConfiguration = {
  checkPastPeriods: false,
  tokens: [
    {
      factory: EthereumERC20__factory,
      name: TOKEN_NAMES.DSLA,
    },
    {
      factory: EthereumERC20__factory,
      name: TOKEN_NAMES.DAI,
    },
    {
      factory: EthereumERC20__factory,
      name: TOKEN_NAMES.USDC,
    },
    {
      factory: EthereumERC20__factory,
      name: TOKEN_NAMES.USDT,
    },
  ],
  chainlink: {
    isProduction: false,
    deleteOldJobs: true,
    nodeFunds: '0.001',
    gasLimit: undefined,
    ethWsUrl: process.env.MUMBAI_WS_URI,
    nodesConfiguration: develop.chainlink.nodesConfiguration,
  },
  addresses: {},
  bootstrap: {
    allowance: [
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
          expiredPeriods: 20,
        },
      ],
      stake: {
        stakingParameters: {
          dslaBurnedByVerification: '0',
          dslaPlatformReward: '500',
          dslaDepositByPeriod: '1000',
          dslaMessengerReward: '250',
          dslaUserReward: '250',
          burnDSLA: false,
        },
      },
      messengers: develop.bootstrap.registry.messengers,
    },
  },
  scripts: {
    deploy_sla: develop.scripts.deploy_sla,
  },
};

// export const polygon: StackticalConfiguration = {
//   checkPastPeriods: true,
//   tokens: [
//     {
//       factory: PolygonERC20__factory,
//       name: TOKEN_NAMES.DSLA,
//       address: '0xa0E390e9ceA0D0e8cd40048ced9fA9EA10D71639',
//     },
//     {
//       factory: PolygonERC20__factory,
//       name: TOKEN_NAMES.DAI,
//       address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
//     },
//     {
//       factory: PolygonERC20__factory,
//       name: TOKEN_NAMES.USDC,
//       address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
//     },
//   ],
//   chainlink: {
//     isProduction: true,
//     deleteOldJobs: true,
//     nodeFunds: '1',
//     gasLimit: undefined,
//     ethWsUrl: process.env.ETHEREUM_WS_URI,
//     nodesConfiguration: [
//       {
//         name: 'node-1',
//         restApiUrl: process.env.ETHEREUM_CHAINLINK_NODE_1_URL,
//         restApiPort: process.env.ETHEREUM_CHAINLINK_NODE_1_PORT,
//         email: process.env.ETHEREUM_CHAINLINK_NODE_1_USER,
//         password: process.env.ETHEREUM_CHAINLINK_NODE_1_PASS,
//       },
//       {
//         name: 'node-2',
//         restApiUrl: process.env.ETHEREUM_CHAINLINK_NODE_2_URL,
//         restApiPort: process.env.ETHEREUM_CHAINLINK_NODE_2_PORT,
//         email: process.env.ETHEREUM_CHAINLINK_NODE_2_USER,
//         password: process.env.ETHEREUM_CHAINLINK_NODE_2_PASS,
//       },
//       {
//         name: 'node-3',
//         restApiUrl: process.env.ETHEREUM_CHAINLINK_NODE_3_URL,
//         restApiPort: process.env.ETHEREUM_CHAINLINK_NODE_3_PORT,
//         email: process.env.ETHEREUM_CHAINLINK_NODE_3_USER,
//         password: process.env.ETHEREUM_CHAINLINK_NODE_3_PASS,
//       },
//     ],
//   },
//   addresses: {
//     [CONTRACT_NAMES.SLORegistry]: '0x0b1cfF33ad49690dB0Eb0bc17429613969C7dDcF',
//     [CONTRACT_NAMES.SLARegistry]: '0xf41EaA49BBae8650f051100d4385d5d7F9af4a54',
//     [CONTRACT_NAMES.MessengerRegistry]:
//       '0x8993F44B7Ee14446B12B6D879c325E3Cd624653B',
//     [CONTRACT_NAMES.PeriodRegistry]:
//       '0xEF12BDcF5E5D5ae4c950a9FaEb2A274d1646b48D',
//     [CONTRACT_NAMES.StakeRegistry]:
//       '0xc5C890444975f2211F84d3b543355f8DC74a6069',
//     [CONTRACT_NAMES.SEMessenger]: '0x3eBe46d0d873B635D1e003BEe76de67cE2F3a584',
//     [CONTRACT_NAMES.Details]: '0x857533E7d9DE216E8BdBd1620018099B88cDD792',
//     [CONTRACT_NAMES.PreCoordinator]:
//       '0x6e782e2c3f42003eE56d30BdD269555738A39e4A',
//     [CONTRACT_NAMES.StringUtils]: '0x143c0e6cB35AC53C7f06d4914199E4cAc3977AC7',
//     [CONTRACT_NAMES.Oracle]: '0x99F4e62a317cc666589c9e370c73c15B158f3c61',
//     [CONTRACT_NAMES.LinkToken]: '0xb0897686c545045afc77cf20ec7a532e3120e0f1 ',
//   },
//   bootstrap: {
//     allowance: [
//       {
//         contract: CONTRACT_NAMES.SEMessenger,
//         token: CONTRACT_NAMES.LinkToken,
//         allowance: '10',
//       },
//     ],
//     registry: {
//       periods: [
//         {
//           periodType: PERIOD_TYPE.WEEKLY,
//           amountOfPeriods: 52,
//           expiredPeriods: 0,
//         },
//       ],
//       stake: {
//         stakingParameters: {
//           dslaBurnedByVerification: '0',
//           dslaPlatformReward: '500',
//           dslaDepositByPeriod: '1000',
//           dslaMessengerReward: '250',
//           dslaUserReward: '250',
//           burnDSLA: false,
//         },
//       },
//       messengers: [
//         {
//           contract: CONTRACT_NAMES.SEMessenger,
//           specificationPath: `${appRoot.path}/contracts/messengers/${USE_CASES.STAKING_EFFICIENCY}/${CONTRACT_NAMES.SEMessenger}.json`,
//           useCaseName: 'staking-efficiency',
//           externalAdapterUrl:
//             'https://europe-west1-stacktical-0.cloudfunctions.net/dsla-indexer',
//         },
//       ],
//     },
//   },
//   scripts: {
//     deploy_sla: develop.scripts.deploy_sla,
//   },
// };
