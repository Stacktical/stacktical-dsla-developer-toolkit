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
  BSC_URI: Joi.string().required(),
  BSC_WS_URI: Joi.string().required(),
  STAKING_EFFICIENCY_INDEXER_URI: Joi.string().required(),
}).unknown();

const { error, value } = schema.validate(process.env);

if (error) {
  throw new Error(`.env file validation error: ${error.message}`);
} else {
  process.env = value;
}

export const bsc: NetworkUserConfig = {
  chainId: 56,
  accounts: {
    mnemonic: process.env.MAINNET_MNEMONIC,
  },
  url: process.env.BSC_URI,
  stacktical: {
    checkPastPeriods: true,
    deployTokens: false,
    tokens: [
      /** https://bscscan.com/tokens */
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.DSLA,
        address: '0x1861c9058577c3b48e73d91d6f25c18b17fbffe0',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.DAI,
        address: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.USDC,
        address: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.USDT,
        // https://bscscan.com/token/0x55d398326f99059ff775485246999027b3197955
        address: '0x55d398326f99059ff775485246999027b3197955',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.WBNB,
        address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
      },

    ],
    chainlink: {
      deployLocal: false,
      deleteOldJobs: false,
      cleanLocalFolder: false,
      nodeFunds: '1',
      ethWsUrl: process.env.BSC_WS_URI,
      nodesConfiguration: [
        {
          name: 'newyork',
          restApiUrl: process.env.BSC_CHAINLINK_NODE_2_URL,
          restApiPort: process.env.BSC_CHAINLINK_NODE_2_PORT,
          email: process.env.BSC_CHAINLINK_NODE_2_USER,
          password: process.env.BSC_CHAINLINK_NODE_2_PASS,
        },
      ],
    },
    addresses: {
      [CONTRACT_NAMES.LinkToken]: '0x404460c6a5ede2d891e8297795264fde62adbb75',
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
    ],
    scripts: scripts,
  },
};
