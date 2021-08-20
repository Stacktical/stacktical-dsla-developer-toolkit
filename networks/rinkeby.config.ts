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
    deployTokens: true,
    checkPastPeriods: false,
    chainlink: {
      deployLocal: true,
      deleteOldJobs: true,
      cleanLocalFolder: false,
      nodeFunds: '0.1',
      ethWsUrl: process.env.RINKEBY_WS_URI,
      ethHttpUrl: process.env.RINKEBY_URI,
      nodesConfiguration: [
        {
          name: 'node-1',
          restApiUrl: 'http://localhost',
          restApiPort: '6799',
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
    ],
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
        externalAdapterUrl: 'http://host.docker.internal:6060',
      },
    ],
    scripts: scripts,
  },
};