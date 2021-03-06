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
  MUMBAI_URI: Joi.string().required(),
  MUMBAI_WS_URI: Joi.string().required(),
}).unknown();

const { error, value } = schema.validate(process.env);

if (error) {
  throw new Error(`.env file validation error: ${error.message}`);
} else {
  process.env = value;
}

export const mumbai: NetworkUserConfig = {
  chainId: 80001,
  gas: 19000000,
  gasPrice: 1 * 10 ** 9,
  accounts: {
    mnemonic: process.env.TESTNET_MNEMONIC,
  },
  url: process.env.MUMBAI_URI,
  stacktical: {
    deployTokens: true,
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
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.WMATIC,
      },
    ],
    ipfs: process.env.IPFS_URI,
    chainlink: {
      deployLocal: false,
      deleteOldJobs: true,
      cleanLocalFolder: false,
      nodeFunds: '0.001',
      ethWsUrl: process.env.MUMBAI_WS_URI,
      nodesConfiguration: [
        {
          name: 'node-1',
          restApiUrl: 'http://localhost',
          restApiPort: '6688',
          email: 'test@stacktical.com',
          password: 'PaSSword123456',
        },
      ],
    },
    addresses: {
      [CONTRACT_NAMES.LinkToken]: '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
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
            expiredPeriods: 20,
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
