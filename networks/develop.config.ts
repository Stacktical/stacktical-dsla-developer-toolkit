import {
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
  DEVELOP_MNEMONIC: Joi.string().required(),
  DEVELOP_URI: Joi.string().required(),
  DEVELOP_WS_URI: Joi.string().required(),
}).unknown();

const { error, value } = schema.validate(process.env);

if (error) {
  throw new Error(`.env file validation error: ${error.message}`);
} else {
  process.env = value;
}

export const develop: NetworkUserConfig = {
  chainId: 1337,
  accounts: {
    mnemonic: process.env.DEVELOP_MNEMONIC,
  },
  url: 'http://localhost:8545',
  stacktical: {
    checkPastPeriods: false,
    deployTokens: true,
    ipfs: process.env.DEVELOP_IPFS_URI,
    chainlink: {
      deployLocal: true,
      deleteOldJobs: true,
      cleanLocalFolder: true,
      nodeFunds: '10',
      ethWsUrl: 'ws://host.docker.internal:8545',
      ethHttpUrl: 'http://host.docker.internal:8545',
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
        name: TOKEN_NAMES.USDT,
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
        /*
        {
          contract: CONTRACT_NAMES.BaseMessenger,
          token: CONTRACT_NAMES.LinkToken,
          allowance: '10',
        },
        {
          contract: CONTRACT_NAMES.PPMessenger,
          token: CONTRACT_NAMES.LinkToken,
          allowance: '10',
        },
        */
      ],
      registry: {
        periods: [
          {
            periodType: PERIOD_TYPE.WEEKLY,
            amountOfPeriods: 52, // Number of periods from now
            expiredPeriods: 14,
          },
          /*
          {
            periodType: PERIOD_TYPE.DAILY,
            amountOfPeriods: 365,
            expiredPeriods: 336,
          },
          */
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
        contract: CONTRACT_NAMES.SEMessenger,  //  Name of the Messenger
        useCaseName: USE_CASES.STAKING_EFFICIENCY,  // Name of the Use-Case
        externalAdapterUrl: 'http://host.docker.internal:6060',   // Your local serverless endpoint
      },
      /*
      {
        contract: CONTRACT_NAMES.BaseMessenger,
        useCaseName: USE_CASES.BASE_MESSENGER,
        externalAdapterUrl: 'http://host.docker.internal:6060',
      },
      {
        contract: CONTRACT_NAMES.PPMessenger,
        useCaseName: USE_CASES.PAR_PEG,
        externalAdapterUrl: 'http://host.docker.internal:6080',
      },
      */  
    ],
    scripts: scripts,
  },
};
