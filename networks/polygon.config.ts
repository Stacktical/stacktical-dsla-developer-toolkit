import {
  appRoot,
  CONTRACT_NAMES,
  PERIOD_TYPE,
  TOKEN_NAMES,
  USE_CASES,
} from '../constants';
import { PolygonERC20__factory } from '../typechain';
import { NetworkUserConfig } from 'hardhat/types';
import { scripts } from '../scripts.config';

import Joi from 'joi';

const schema = Joi.object({
  MAINNET_MNEMONIC: Joi.string().required(),
  POLYGON_URI: Joi.string().required(),
  POLYGON_WS_URI: Joi.string().required(),
  STAKING_EFFICIENCY_INDEXER_URI: Joi.string().required(),
}).unknown();

const { error, value } = schema.validate(process.env);

if (error) {
  throw new Error(`.env file validation error: ${error.message}`);
} else {
  process.env = value;
}

export const polygon: NetworkUserConfig = {
  chainId: 137,
  //gasPrice: 200 * 10 ** 9,
  //gas: 10000000,
  //accounts: [process.env.PRIV_KEY],
  accounts: {
     mnemonic: process.env.MAINNET_MNEMONIC,
   },
  url: process.env.POLYGON_URI,
  stacktical: {
    deployTokens: false,
    checkPastPeriods: true,
    tokens: [
      {
        factory: PolygonERC20__factory,
        name: TOKEN_NAMES.DSLA,
        address: '0xa0E390e9ceA0D0e8cd40048ced9fA9EA10D71639',
      },
      {
        factory: PolygonERC20__factory,
        name: TOKEN_NAMES.DAI,
        address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      },
      {
        factory: PolygonERC20__factory,
        name: TOKEN_NAMES.USDC,
        address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      },
    ],
    chainlink: {
      deployLocal: false,
      deleteOldJobs: true,
      cleanLocalFolder: false,
      nodeFunds: '1',
      ethWsUrl: process.env.POLYGON_WS_URI,
      nodesConfiguration: [
        {
          name: 'Berlin',
          restApiUrl: process.env.POLYGON_CHAINLINK_NODE_1_URL,
          restApiPort: process.env.POLYGON_CHAINLINK_NODE_1_PORT,
          email: process.env.POLYGON_CHAINLINK_NODE_1_USER,
          password: process.env.POLYGON_CHAINLINK_NODE_1_PASS,
        },
        {
          name: 'NewYork',
          restApiUrl: process.env.POLYGON_CHAINLINK_NODE_2_URL,
          restApiPort: process.env.POLYGON_CHAINLINK_NODE_2_PORT,
          email: process.env.POLYGON_CHAINLINK_NODE_2_USER,
          password: process.env.POLYGON_CHAINLINK_NODE_2_PASS,
        },
        {
          name: 'Paris',
          restApiUrl: process.env.POLYGON_CHAINLINK_NODE_3_URL,
          restApiPort: process.env.POLYGON_CHAINLINK_NODE_3_PORT,
          email: process.env.POLYGON_CHAINLINK_NODE_3_USER,
          password: process.env.POLYGON_CHAINLINK_NODE_3_PASS,
        },
      ],
    },
    addresses: {
      /** https://pegswap.chain.link/ */
      [CONTRACT_NAMES.LinkToken]: '0xb0897686c545045afc77cf20ec7a532e3120e0f1',
    },
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
