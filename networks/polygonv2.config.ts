import {
  appRoot,
  CONTRACT_NAMES,
  PERIOD_TYPE,
  SERVICE_CREDITS,
  TOKEN_NAMES,
  USE_CASES,
} from '../constants';
import { PolygonERC20__factory } from '../typechain';
import { NetworkUserConfig } from 'hardhat/types';
import { scripts } from '../scripts.config';

import Joi from 'joi';

const schema = Joi.object({
  MAINNET_MNEMONIC: Joi.string().required(),
  POLYGONV2_URI: Joi.string().required(),
  POLYGONV2_WS_URI: Joi.string().required(),
  STAKING_REWARDS_ADAPTER: Joi.string().required(),
}).unknown();

const { error, value } = schema.validate(process.env);

if (error) {
  throw new Error(`.env file validation error: ${error.message}`);
} else {
  process.env = value;
}

export const polygonv2: NetworkUserConfig = {
  chainId: 137,
  //gasPrice: 200 * 10 ** 9,
  //gas: 10000000,
  //accounts: [process.env.PRIV_KEY],
  accounts: {
    mnemonic: process.env.MAINNET_MNEMONIC,
  },
  url: process.env.POLYGONV2_URI,
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
      {
        factory: PolygonERC20__factory,
        name: TOKEN_NAMES.USDT,
        address: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',
      },
      {
        factory: PolygonERC20__factory,
        name: TOKEN_NAMES.WMATIC,
        address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
      },
    ],
    ipfs: process.env.IPFS_URI,
    chainlink: {
      deployLocal: false,
      deleteOldJobs: true,
      cleanLocalFolder: false,
      nodeFunds: '1',
      ethWsUrl: process.env.POLYGONV2_WS_URI,
      nodesConfiguration: [
        {
          name: 'NewYork',
          restApiUrl: process.env.POLYGONV2_CHAINLINK_NODE_2_URL,
          restApiPort: process.env.POLYGONV2_CHAINLINK_NODE_2_PORT,
          email: process.env.POLYGONV2_CHAINLINK_NODE_2_USER,
          password: process.env.POLYGONV2_CHAINLINK_NODE_2_PASS,
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
          contract: CONTRACT_NAMES.StakingParametricOracle,
          token: CONTRACT_NAMES.LinkToken,
          allowance: '10',
        },
      ],
      registry: {
        periods: [
          {
            periodType: PERIOD_TYPE.HOURLY,
            amountOfPeriods: 48, // Number of periods from now
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
            dslaBurnedByVerification: '0',
            dslaPlatformReward: '100750',
            dslaDepositByPeriod: '250000',
            dslaMessengerReward: '49250',
            dslaUserReward: '100000',
            burnDSLA: false,
            maxLeverage: '4',
          },
        },
      },
    },
    messengers: [
      {
        contract: CONTRACT_NAMES.StakingParametricOracle,
        useCaseName: USE_CASES.STAKING_PARAMETRIC,
        externalAdapterUrl: process.env.STAKING_PARAMETRIC_ADAPTER,
        dslaLpName: SERVICE_CREDITS.STAKING_PARAMETRIC.DSLA_LP.name,
        dslaLpSymbol: SERVICE_CREDITS.STAKING_PARAMETRIC.DSLA_LP.symbol,
        dslaSpName: SERVICE_CREDITS.STAKING_PARAMETRIC.DSLA_SP.name,
        dslaSpSymbol: SERVICE_CREDITS.STAKING_PARAMETRIC.DSLA_SP.symbol,
      },
    ],
    scripts: scripts,
  },
};
