import {
  appRoot,
  CONTRACT_NAMES,
  PERIOD_TYPE,
  TOKEN_NAMES,
  USE_CASES,
} from '../constants';
import { EthereumERC20__factory } from '../typechain';
import { NetworkUserConfig } from 'hardhat/types';
import { scripts } from './scripts.config';

export const kovan: NetworkUserConfig = {
  chainId: 42,
  accounts: {
    mnemonic: process.env.TESTNET_MNEMONIC,
  },
  url: process.env.KOVAN_URI,
  stacktical: {
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
    scripts: scripts,
  },
};
