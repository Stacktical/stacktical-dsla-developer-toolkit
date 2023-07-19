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
  LINEA_URI: Joi.string().required(),
  STAKING_REWARDS_ADAPTER: Joi.string().required(),
}).unknown();

const { error, value } = schema.validate(process.env);

if (error) {
  throw new Error(`.env file validation error: ${error.message}`);
} else {
  process.env = value;
}

export const linea: NetworkUserConfig = {
  chainId: 5000,
  accounts: {
    mnemonic: process.env.MAINNET_MNEMONIC,
  },
  url: process.env.LINEA_URI,
  stacktical: {
    deployTokens: false,
    checkPastPeriods: true,
    tokens: [
      /** https://etherscan.io/tokens */
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.DSLA,
        address: '',

      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.USDC,
        address: '',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.USDT,
        address: '',
      },
    ],
    ipfs: process.env.IPFS_URI,
    chainlink: {
      deployLocal: false,
      deleteOldJobs: false,
      cleanLocalFolder: false,
      nodeFunds: '1',
      ethWsUrl: process.env.LINEA_URI,
      nodesConfiguration: [],
    },
    addresses: {},
    bootstrap: {
      allowance: [],
      registry: {
        periods: [
          {
            periodType: PERIOD_TYPE.HOURLY,
            amountOfPeriods: 24, // Number of periods from now
            expiredPeriods: 0,
          },
          {
            periodType: PERIOD_TYPE.DAILY,
            amountOfPeriods: 31, // Number of periods from now
            expiredPeriods: 0,
          },
          {
            periodType: PERIOD_TYPE.WEEKLY,
            amountOfPeriods: 52, // Number of periods from now
            expiredPeriods: 0,
          },
          {
            periodType: PERIOD_TYPE.MONTHLY,
            amountOfPeriods: 12, // Number of periods from now
            expiredPeriods: 0,
          },
        ],
        stake: {
          stakingParameters: {
            dslaBurnedByVerification: '100000',
            dslaPlatformReward: '750',
            dslaDepositByPeriod: '250000',
            dslaMessengerReward: '49250',
            dslaUserReward: '100000',
            burnDSLA: true,
            maxLeverage: '4',
          },
        },
      },
    },
    messengers: [],
    scripts: scripts,
  },
};
