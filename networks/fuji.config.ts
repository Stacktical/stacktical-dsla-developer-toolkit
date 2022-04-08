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
  MAINNET_MNEMONIC: Joi.string().required(),
  FUJI_URI: Joi.string().required(),
  FUJI_WS_URI: Joi.string().required(),
  STAKING_EFFICIENCY_INDEXER_URI: Joi.string().required(),
}).unknown();

const { error, value } = schema.validate(process.env);

if (error) {
  throw new Error(`.env file validation error: ${error.message}`);
} else {
  process.env = value;
}

export const fuji: NetworkUserConfig = {
  chainId: 43113,
  accounts: {
    mnemonic: process.env.MAINNET_MNEMONIC,
  },
  url: process.env.FUJI_URI,
  stacktical: {
    checkPastPeriods: false,
    deployTokens: true,
    ipfs: process.env.IPFS_URI,
    chainlink: {
      deployLocal: false,
      deleteOldJobs: false,
      cleanLocalFolder: false,
      nodeFunds: '1',
      ethWsUrl: process.env.FUJI_WS_URI,
      nodesConfiguration: [
        {
          name: 'newyork',
          restApiUrl: process.env.FUJI_CHAINLINK_NODE_2_URL,
          restApiPort: process.env.FUJI_CHAINLINK_NODE_2_PORT,
          email: process.env.FUJI_CHAINLINK_NODE_2_USER,
          password: process.env.FUJI_CHAINLINK_NODE_2_PASS,
        },
      ],
    },
    addresses: {
      [CONTRACT_NAMES.LinkToken]: '0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846',
    },
    tokens: [
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.DSLA,
        address: '0x99F4e62a317cc666589c9e370c73c15B158f3c61',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.DAI,
        /**
         * Generic deployed at: 
         * https://cchain.explorer.avax-test.network/address/0x5f5e076Ea19c21F4265ddA0231AA9AFddE0714f5/transactions
         * */
        address: '0x5f5e076Ea19c21F4265ddA0231AA9AFddE0714f5',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.USDC,
        /** Generic Token */
        address: '0xf7DeA391219a9028DF68e54263Ad43b24e4D5288',
      },
      {
        /** Generic Token */
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.USDT,
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.WAVAX,
        address: '0xd00ae08403b9bbb9124bb305c09058e32c39a48c'
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
            amountOfPeriods: 9,
            expiredPeriods: 0,
          },
          {
            periodType: PERIOD_TYPE.MONTHLY,
            amountOfPeriods: 12,
            expiredPeriods: 6,
          },
        ],
        stake: {
          stakingParameters: {
            dslaBurnedByVerification: '0',
            dslaPlatformReward: '10075',
            dslaDepositByPeriod: '25000',
            dslaMessengerReward: '4925',
            dslaUserReward: '10000',
            burnDSLA: false,
          },
        },
      },
    },
    messengers: [
      {
        contract: CONTRACT_NAMES.SEMessenger,
        useCaseName: USE_CASES.STAKING_EFFICIENCY,
        externalAdapterUrl: process.env.STAKING_EFFICIENCY_INDEXER_URI,
        dslaLpName: SERVICE_CREDITS.STAKING_REWARDS.DSLA_LP,
        dslaSpName: SERVICE_CREDITS.STAKING_REWARDS.DSLA_SP,
      },
      {
        contract: CONTRACT_NAMES.SEAMessenger,
        useCaseName: USE_CASES.STAKING_EFFICIENCY_ALT,
        externalAdapterUrl: process.env.STAKING_EFFICIENCY_INDEXER_ALT_URI,
        dslaLpName: SERVICE_CREDITS.STAKING_REWARDS.DSLA_LP,
        dslaSpName: SERVICE_CREDITS.STAKING_REWARDS.DSLA_SP,
      },
      {
        contract: CONTRACT_NAMES.CPIMessenger,
        useCaseName: USE_CASES.INFLATION,
        externalAdapterUrl: process.env.INFLATION_INDEXER_URI,
        dslaLpName: SERVICE_CREDITS.INFLATION_RATE.DSLA_LP,
        dslaSpName: SERVICE_CREDITS.INFLATION_RATE.DSLA_SP,
      },
    ],
    scripts: scripts,
  },
};
