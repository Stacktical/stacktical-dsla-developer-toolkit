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
  HARMONYTESTNET_URI: Joi.string().required(),
  HARMONYTESTNET_WS_URI: Joi.string().required(),
}).unknown();

const { error, value } = schema.validate(process.env);

if (error) {
  throw new Error(`.env file validation error: ${error.message}`);
} else {
  process.env = value;
}

export const harmonytestnet: NetworkUserConfig = {
  chainId: 1666700000,
  gas: 12000000,
  gasPrice: 1000000000,
  accounts: {
    mnemonic: process.env.TESTNET_MNEMONIC,
  },
  url: process.env.HARMONYTESTNET_URI,
  saveDeployments: true,
  stacktical: {
    deployTokens: false,
    checkPastPeriods: false,
    tokens: [
      /** https://explorer.testnet.harmony.one/hrc20 */
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.DSLA,
        address: '0xab85235ec77b2c54d22fb051910e7355959e2464',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.DAI,
        address: '0xa6610f1ba3523352d5da5fb2e25c0d8859da4007',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.USDC,
        address: '0x2e89d104f10e1d480d47e924f3f43672c09d12a2',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.USDT,
        address: '0x922337914e641e830ce174f52288bd7660ef83c6',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.WONE,
        address: '0x7466d7d0C21Fa05F32F5a0Fa27e12bdC06348Ce2',
      },
    ],
    ipfs: process.env.IPFS_URI,
    chainlink: {
      deployLocal: false,
      deleteOldJobs: true,
      cleanLocalFolder: false,
      nodeFunds: '0.01',
      ethWsUrl: process.env.HARMONYTESTNET_WS_URI,
      nodesConfiguration: [
        {
          name: 'newyork',
          restApiUrl: process.env.HARMONYTESTNET_CHAINLINK_NODE_1_URL,
          restApiPort: process.env.HARMONYTESTNET_CHAINLINK_NODE_1_PORT,
          email: process.env.HARMONYTESTNET_CHAINLINK_NODE_1_USER,
          password: process.env.HARMONYTESTNET_CHAINLINK_NODE_1_PASS,
        },
      ],
    },
    addresses: {},
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
            dslaPlatformReward: '500',
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
        dslaLpName: SERVICE_CREDITS.STAKING_REWARDS.DSLA_LP.name,
        dslaLpSymbol: SERVICE_CREDITS.STAKING_REWARDS.DSLA_LP.symbol,
        dslaSpName: SERVICE_CREDITS.STAKING_REWARDS.DSLA_SP.name,
        dslaSpSymbol: SERVICE_CREDITS.STAKING_REWARDS.DSLA_SP.symbol,
      },
      {
        contract: CONTRACT_NAMES.SEAMessenger,
        useCaseName: USE_CASES.STAKING_EFFICIENCY_ALT,
        externalAdapterUrl: process.env.STAKING_EFFICIENCY_INDEXER_ALT_URI,
        dslaLpName: SERVICE_CREDITS.STAKING_REWARDS.DSLA_LP.name,
        dslaLpSymbol: SERVICE_CREDITS.STAKING_REWARDS.DSLA_LP.symbol,
        dslaSpName: SERVICE_CREDITS.STAKING_REWARDS.DSLA_SP.name,
        dslaSpSymbol: SERVICE_CREDITS.STAKING_REWARDS.DSLA_SP.symbol,
      },
    ],
    scripts: scripts,
  },
};
