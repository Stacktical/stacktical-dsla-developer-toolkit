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
  AVALANCHE_URI: Joi.string().required(),
  AVALANCHE_WS_URI: Joi.string().required(),
  STAKING_EFFICIENCY_INDEXER_URI: Joi.string().required(),
}).unknown();

const { error, value } = schema.validate(process.env);

if (error) {
  throw new Error(`.env file validation error: ${error.message}`);
} else {
  process.env = value;
}

export const avalanche: NetworkUserConfig = {
  chainId: 43114,
  accounts: {
    mnemonic: process.env.MAINNET_MNEMONIC,
  },
  url: process.env.AVALANCHE_URI,
  stacktical: {
    checkPastPeriods: true,
    deployTokens: false,
    /** Ref: https://github.com/pangolindex/tokenlists/blob/main/ab.tokenlist.json  */
    tokens: [
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.DSLA,
        address: '0xD7c295E399CA928A3a14b01D760E794f1AdF8990',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.DAI,
        address: '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.USDC,
        address: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.USDT,
        address: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.WAVAX,
        address: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      },
    ],
    ipfs: process.env.IPFS_URI,
    chainlink: {
      deployLocal: false,
      deleteOldJobs: false,
      cleanLocalFolder: false,
      nodeFunds: '1',
      ethWsUrl: process.env.AVALANCHE_WS_URI,
      nodesConfiguration: [
        {
          name: 'berlin',
          restApiUrl: process.env.AVALANCHE_CHAINLINK_NODE_1_URL,
          restApiPort: process.env.AVALANCHE_CHAINLINK_NODE_1_PORT,
          email: process.env.AVALANCHE_CHAINLINK_NODE_1_USER,
          password: process.env.AVALANCHE_CHAINLINK_NODE_1_PASS,
        },
        {
          name: 'newyork',
          restApiUrl: process.env.AVALANCHE_CHAINLINK_NODE_2_URL,
          restApiPort: process.env.AVALANCHE_CHAINLINK_NODE_2_PORT,
          email: process.env.AVALANCHE_CHAINLINK_NODE_2_USER,
          password: process.env.AVALANCHE_CHAINLINK_NODE_2_PASS,
        },
        {
          name: 'paris',
          restApiUrl: process.env.AVALANCHE_CHAINLINK_NODE_3_URL,
          restApiPort: process.env.AVALANCHE_CHAINLINK_NODE_3_PORT,
          email: process.env.AVALANCHE_CHAINLINK_NODE_3_USER,
          password: process.env.AVALANCHE_CHAINLINK_NODE_3_PASS,
        },
      ],
    },
    addresses: {
      [CONTRACT_NAMES.LinkToken]: '0xB3fe5374F67D7a22886A0eE082b2E2f9d2651651',
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
          // Commented out for adding periods
          {
            periodType: PERIOD_TYPE.MONTHLY,
            amountOfPeriods: 9,
            expiredPeriods: 0,
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
      },
      {
        contract: CONTRACT_NAMES.SEAMessenger,
        useCaseName: USE_CASES.STAKING_EFFICIENCY_ALT,
        externalAdapterUrl: process.env.STAKING_EFFICIENCY_INDEXER_ALT_URI,
      },
      {
        contract: CONTRACT_NAMES.CPIMessenger,
        useCaseName: USE_CASES.INFLATION,
        externalAdapterUrl: process.env.INFLATION_INDEXER_URI,
      },
    ],
    scripts: scripts,
  },
};
