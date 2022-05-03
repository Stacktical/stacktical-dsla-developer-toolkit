import {
  appRoot,
  CONTRACT_NAMES,
  PERIOD_TYPE,
  SERVICE_CREDITS,
  TOKEN_NAMES,
  USE_CASES,
} from '../constants';
import { EthereumERC20__factory } from '../typechain';
import { NetworkUserConfig } from 'hardhat/types';
import { scripts } from '../scripts.config';

import Joi from 'joi';

const schema = Joi.object({
  TESTNET_MNEMONIC: Joi.string().required(),
  KOVAN_URI: Joi.string().required(),
  KOVAN_WS_URI: Joi.string().required(),
  STAKING_EFFICIENCY_INDEXER_URI: Joi.string().required(),
}).unknown();

const { error, value } = schema.validate(process.env);

if (error) {
  throw new Error(`.env file validation error: ${error.message}`);
} else {
  process.env = value;
}

export const kovan: NetworkUserConfig = {
  chainId: 42,
  accounts: {
    mnemonic: process.env.TESTNET_MNEMONIC,
  },
  url: process.env.KOVAN_URI,
  stacktical: {
    deployTokens: true,
    checkPastPeriods: false,
    ipfs: process.env.IPFS_URI,
    chainlink: {
      deployLocal: false,
      deleteOldJobs: true,
      cleanLocalFolder: false,
      nodeFunds: '0.1',
      ethWsUrl: process.env.KOVAN_WS_URI,
      ethHttpUrl: process.env.KOVAN_URI,
      nodesConfiguration: [
        // {
        //   name: 'berlin',
        //   restApiUrl: process.env.KOVAN_CHAINLINK_NODE_1_URL,
        //   restApiPort: process.env.KOVAN_CHAINLINK_NODE_1_PORT,
        //   email: process.env.KOVAN_CHAINLINK_NODE_1_USER,
        //   password: process.env.KOVAN_CHAINLINK_NODE_1_PASS,
        // },
        {
          name: 'newyork',
          restApiUrl: process.env.KOVAN_CHAINLINK_NODE_2_URL,
          restApiPort: process.env.KOVAN_CHAINLINK_NODE_2_PORT,
          email: process.env.KOVAN_CHAINLINK_NODE_2_USER,
          password: process.env.KOVAN_CHAINLINK_NODE_2_PASS,
        },
        // {
        //   name: 'paris',
        //   restApiUrl: process.env.KOVAN_CHAINLINK_NODE_3_URL,
        //   restApiPort: process.env.KOVAN_CHAINLINK_NODE_3_PORT,
        //   email: process.env.KOVAN_CHAINLINK_NODE_3_USER,
        //   password: process.env.KOVAN_CHAINLINK_NODE_3_PASS,
        // },
      ],
    },
    addresses: {},
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
        name: TOKEN_NAMES.WETH,
      },
    ],
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
        {
          contract: CONTRACT_NAMES.CPIMessenger,
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
        dslaLpName: SERVICE_CREDITS.STAKING_REWARDS.DSLA_LP.name,
        dslaLpSymbol: SERVICE_CREDITS.STAKING_REWARDS.DSLA_LP.symbol,
        dslaSpName: SERVICE_CREDITS.STAKING_REWARDS.DSLA_SP.name,
        dslaSpSymbol: SERVICE_CREDITS.STAKING_REWARDS.DSLA_SP.symbol,
      },
      {
        contract: CONTRACT_NAMES.SEAMessenger,
        useCaseName: USE_CASES.STAKING_EFFICIENCY_ALT,
        externalAdapterUrl: 'http://host.docker.internal:6060',
        dslaLpName: SERVICE_CREDITS.STAKING_REWARDS.DSLA_LP.name,
        dslaLpSymbol: SERVICE_CREDITS.STAKING_REWARDS.DSLA_LP.symbol,
        dslaSpName: SERVICE_CREDITS.STAKING_REWARDS.DSLA_SP.name,
        dslaSpSymbol: SERVICE_CREDITS.STAKING_REWARDS.DSLA_SP.symbol,
      },
      {
        contract: CONTRACT_NAMES.CPIMessenger,
        useCaseName: USE_CASES.INFLATION,
        externalAdapterUrl: process.env.INFLATION_INDEXER_URI,
        dslaLpName: SERVICE_CREDITS.INFLATION_RATE.DSLA_LP.name,
        dslaLpSymbol: SERVICE_CREDITS.INFLATION_RATE.DSLA_LP.symbol,
        dslaSpName: SERVICE_CREDITS.INFLATION_RATE.DSLA_SP.name,
        dslaSpSymbol: SERVICE_CREDITS.INFLATION_RATE.DSLA_SP.symbol,
      },
    ],
    scripts: scripts,
  },
};
