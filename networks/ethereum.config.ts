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
  MAINNET_MNEMONIC: Joi.string().required(),
  ETHEREUM_URI: Joi.string().required(),
  ETHEREUM_WS_URI: Joi.string().required(),
  STAKING_EFFICIENCY_INDEXER_URI: Joi.string().required(),
}).unknown();

const { error, value } = schema.validate(process.env);

if (error) {
  throw new Error(`.env file validation error: ${error.message}`);
} else {
  process.env = value;
}

export const ethereum: NetworkUserConfig = {
  chainId: 1,
  accounts: {
    mnemonic: process.env.MAINNET_MNEMONIC,
  },
  url: process.env.ETHEREUM_URI,
  stacktical: {
    checkPastPeriods: true,
    deployTokens: false,
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
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.USDT,
        address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      },
    ],
    chainlink: {
      deployLocal: false,
      deleteOldJobs: false,
      cleanLocalFolder: false,
      nodeFunds: '1',
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
      [CONTRACT_NAMES.LinkToken]: '0x514910771af9ca656af840dff83e8264ecf986ca',
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
          stakingParameters: {
            dslaBurnedByVerification: '10000',
            dslaPlatformReward: '75',
            dslaDepositByPeriod: '25000',
            dslaMessengerReward: '4925',
            dslaUserReward: '10000',
            burnDSLA: true,
          },
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
