import {
  appRoot,
  CONTRACT_NAMES,
  PERIOD_TYPE,
  TOKEN_NAMES,
  USE_CASES,
} from '../constants';
import { EthereumERC20__factory } from '../typechain';
import { NetworkUserConfig } from 'hardhat/types';
import { scripts } from '../scripts.config';

import Joi from 'joi';

const schema = Joi.object({
  TESTNET_MNEMONIC: Joi.string().required(),
  RINKEBY_URI: Joi.string().required(),
  RINKEBY_WS_URI: Joi.string().required(),
  STAKING_EFFICIENCY_INDEXER_URI: Joi.string().required(),
}).unknown();

const { error, value } = schema.validate(process.env);

if (error) {
  throw new Error(`.env file validation error: ${error.message}`);
} else {
  process.env = value;
}

export const rinkeby: NetworkUserConfig = {
  chainId: 4,
  accounts: {
    mnemonic: process.env.TESTNET_MNEMONIC,
  },
  gas: 19000000,
  url: process.env.RINKEBY_URI,
  stacktical: {
    checkPastPeriods: true,
    deployTokens: false,
    tokens: [
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.DSLA,
        address: '0x973f2ECb8c7585061854e22628d9b1d972aED2aF',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.DAI,
        address: '0x8D871ad02643D315adEd547B2801E1948d5F9042',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.USDC,
        address: '0xC54BA80Bd18413143220c6c2FB0B4a3267d49061',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.USDT,
        address: '0x71bae6022b61fa06dacfb6cc099f68c62d852c8a',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.WETH,
        address: '0xc778417e063141139fce010982780140aa0cd5ab',
      },
    ],
    chainlink: {
      deployLocal: true,
      deleteOldJobs: true,
      cleanLocalFolder: false,
      nodeFunds: '0.1',
      ethWsUrl: process.env.RINKEBY_WS_URI,
      ethHttpUrl: process.env.RINKEBY_URI,
      nodesConfiguration: [
          {
            name: 'newyork',
            restApiUrl: process.env.RINKEBY_CHAINLINK_NODE_1_URL,
            restApiPort: process.env.RINKEBY_CHAINLINK_NODE_1_PORT,
            email: process.env.RINKEBY_CHAINLINK_NODE_1_USER,
            password: process.env.RINKEBY_CHAINLINK_NODE_1_PASS,
          },
      ],
    },
    addresses: {
      [CONTRACT_NAMES.LinkToken]: '0x01BE23585060835E02B77ef475b0Cc51aA1e0709',
    },
    bootstrap: {
      allowance: [
        {
          contract: CONTRACT_NAMES.SEMessenger,
          token: CONTRACT_NAMES.LinkToken,
          allowance: '10',
        },
        {
          contract: CONTRACT_NAMES.SEAMessenger,
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
      },
    },
    messengers: [
      {
        contract: CONTRACT_NAMES.SEMessenger,
        useCaseName: USE_CASES.STAKING_EFFICIENCY,
        externalAdapterUrl: process.env.STAKING_EFFICIENCY_INDEXER_URI,
      },
      {
        contract: CONTRACT_NAMES.SEAMessenger,
        useCaseName: USE_CASES.STAKING_EFFICIENCY_ALT,
        externalAdapterUrl: process.env.STAKING_EFFICIENCY_INDEXER_ALT_URI,
      },
    ],
    scripts: scripts,
  },
};
