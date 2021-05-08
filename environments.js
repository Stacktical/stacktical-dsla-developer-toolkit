require('dotenv').config();

const { INFURA_PROJECT_ID } = process.env;

export const networkNames = {
  DEVELOP: 'develop',
  KOVAN: 'kovan',
  MAINNET: 'mainnet',
  HARMONYTESTNET: 'harmonytestnet',
};

export const environments = {
  [networkNames.MAINNET]: {
    web3WebsocketProviderUrl: `wss://mainnet.infura.io/ws/v3/${INFURA_PROJECT_ID}`,
    productionChainlinkNode: {
      oracles: [
        '0x972614782a893ad3139418Ef00e17fE95896A7c6',
        '0x972614782a893ad3139418Ef00e17fE95896A7c6',
        '0x972614782a893ad3139418Ef00e17fE95896A7c6',
      ],
      jobIds: [
        '0x329f60c5b0bf429597433e617544c71e',
        '0x9f4ff7c86eb94a11b5a45b9b020fc481',
        '0x5a08e037f50d4c73823b34b2e3a03eae',
      ],
      payments: [
        String(0.1 * 10 ** 18),
        String(0.1 * 10 ** 18),
        String(0.1 * 10 ** 18),
      ],
      email: '',
      password: '',
      externalAdapterUrL: null,
    },
    linkTokenAddress: '0x514910771af9ca656af840dff83e8264ecf986ca',
    dslaTokenAddress: '0x3affcca64c2a6f4e3b6bd9c64cd2c969efd1ecbe',
    daiTokenAddress: '0x6b175474e89094c44da98b954eedeac495271d0f',
    usdcTokenAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    checkPastPeriods: true,
    localChainlinkNode: null,
  },
  [networkNames.KOVAN]: {
    web3WebsocketProviderUrl: `wss://kovan.infura.io/ws/v3/${INFURA_PROJECT_ID}`,
    productionChainlinkNode: null,
    linkTokenAddress: '0xa36085F69e2889c224210F603D836748e7dC0088',
    dslaTokenAddress: null,
    daiTokenAddress: null,
    usdcTokenAddress: null,
    checkPastPeriods: false,
  },
  [networkNames.HARMONYTESTNET]: {
    web3WebsocketProviderUrl: 'wss://ws.s0.b.hmny.io',
    productionChainlinkNode: null,
    linkTokenAddress: null,
    dslaTokenAddress: null,
    daiTokenAddress: null,
    usdcTokenAddress: null,
    checkPastPeriods: false,
    chainlinkNodeFunds: '1',
    gas: 12000000,
  },
  [networkNames.DEVELOP]: {
    web3WebsocketProviderUrl: 'ws://localhost:8545',
    productionChainlinkNode: null,
    developChainlinkNode: {
      funds: '10',
      gasLimit: undefined,
      externalAdapterUrL: null,
    },
    linkTokenAddress: null,
    dslaTokenAddress: null,
    daiTokenAddress: null,
    usdcTokenAddress: null,
    checkPastPeriods: false,
  },
};

export const getEnvFromNetwork = (network) => environments[network];

export const getEnvFromNodeEnv = () => environments[process.env.NODE_ENV];
