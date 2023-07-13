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
  LINEATESTNET_URI: Joi.string().required(),
  STAKING_REWARDS_ADAPTER: Joi.string().required(),
}).unknown();

const { error, value } = schema.validate(process.env);

if (error) {
  throw new Error(`.env file validation error: ${error.message}`);
} else {
  process.env = value;
}

export const linea: NetworkUserConfig = {
  chainId: 59140,
  accounts: {
    mnemonic: process.env.MAINNET_MNEMONIC,
  },
  url: process.env.LINEATESTNET_URI,
  stacktical: {
    checkPastPeriods: true,
    deployTokens: true,
    tokens: [
      /** https://etherscan.io/tokens */
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.DSLA
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.crUSDC,
        address: '0x964FF70695da981027c81020B1c58d833D49A640',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.WETH,
        address: '0x2C1b868d6596a18e32E61B901E4060C872647b6C',
      },
    ],
    ipfs: process.env.IPFS_URI,
    chainlink: {
      deployLocal: false,
      deleteOldJobs: false,
      cleanLocalFolder: false,
      nodeFunds: '1',
      ethWsUrl: process.env.LINEATESTNET_URI,
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
