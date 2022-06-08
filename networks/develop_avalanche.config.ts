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
  DEVELOP_MNEMONIC: Joi.string().required(),
  DEVELOP_AVALANCHE_URI: Joi.string().required(),
  DEVELOP_AVALANCHE_WS_URI: Joi.string().required(),
  DEVELOP_IPFS_URI: Joi.string().required(),
  STAKING_EFFICIENCY_INDEXER_URI: Joi.string().required(),
}).unknown();

const { error, value } = schema.validate(process.env);

if (error) {
  throw new Error(`.env file validation error: ${error.message}`);
} else {
  process.env = value;
}

export const develop_avalanche: NetworkUserConfig = {
  chainId: 43112,
  gasPrice: 225000000000,
  accounts: [
    "0x56289e99c94b6912bfc12adc093c9b51124f0dc54ac7a766b2bc5ccf558d8027",
    "0x7b4198529994b0dc604278c99d153cfd069d594753d471171a1d102a10438e07",
    "0x15614556be13730e9e8d6eacc1603143e7b96987429df8726384c2ec4502ef6e",
    "0x31b571bf6894a248831ff937bb49f7754509fe93bbd2517c9c73c4144c0e97dc",
    "0x6934bef917e01692b789da754a0eae31a8536eb465e7bff752ea291dad88c675",
    "0xe700bdbdbc279b808b1ec45f8c2370e4616d3a02c336e68d85d4668e08f53cff",
    "0xbbc2865b76ba28016bc2255c7504d000e046ae01934b04c694592a6276988630",
    "0xcdbfd34f687ced8c6968854f8a99ae47712c4f4183b78dcc4a903d1bfe8cbf60",
    "0x86f78c5416151fe3546dece84fda4b4b1e36089f2dbc48496faf3a950f16157c",
    "0x750839e9dbbd2a0910efe40f50b2f3b2f2f59f5580bb4b83bd8c1201cf9a010a"
  ],
  url: 'http://localhost:9650/ext/bc/C/rpc',
  stacktical: {
    checkPastPeriods: false,
    deployTokens: true,
    ipfs: process.env.DEVELOP_IPFS_URI,
    chainlink: {
      deployLocal: true,
      deleteOldJobs: true,
      cleanLocalFolder: true,
      nodeFunds: '10',
      ethWsUrl: 'ws://host.docker.internal:9650/ext/bc/C/ws',
      ethHttpUrl: 'http://host.docker.internal:9650/ext/bc/C/rpc',
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
        name: TOKEN_NAMES.WAVAX,
      },
    ],
    bootstrap: {
      allowance: [
        {
          contract: CONTRACT_NAMES.BaseOracle,
          token: CONTRACT_NAMES.LinkToken,
          allowance: '10',
        },
        {
          contract: CONTRACT_NAMES.InflationOracle,
          token: CONTRACT_NAMES.LinkToken,
          allowance: '10',
        },
      ],
      registry: {
        periods: [
          {
            periodType: PERIOD_TYPE.WEEKLY,
            amountOfPeriods: 52, // A yr
            expiredPeriods: 12,
          },
          {
            periodType: PERIOD_TYPE.MONTHLY,
            amountOfPeriods: 12,
            expiredPeriods: 6,
          },
          /*
          {
            periodType: PERIOD_TYPE.YEARLY,
            amountOfPeriods: 3,
            expiredPeriods: 1,
          },
          /*
          {
            periodType: PERIOD_TYPE.HOURLY,
            amountOfPeriods: 168,
            expiredPeriods: 20,
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
        contract: CONTRACT_NAMES.BaseOracle,
        useCaseName: USE_CASES.BASE_MESSENGER,
        externalAdapterUrl: 'http://host.docker.internal:6070',
        dslaLpName: SERVICE_CREDITS.STAKING_REWARDS.DSLA_LP.name,
        dslaLpSymbol: SERVICE_CREDITS.STAKING_REWARDS.DSLA_LP.symbol,
        dslaSpName: SERVICE_CREDITS.STAKING_REWARDS.DSLA_SP.name,
        dslaSpSymbol: SERVICE_CREDITS.STAKING_REWARDS.DSLA_SP.symbol,
      },
      {
        contract: CONTRACT_NAMES.InflationOracle, //  Name of the Messenger
        useCaseName: USE_CASES.INFLATION, // Name of the Use-Case
        externalAdapterUrl: process.env.DEVELOP_INDEXER_URI, // Your local serverless endpoint
        dslaLpName: SERVICE_CREDITS.INFLATION_RATE.DSLA_LP.name,
        dslaLpSymbol: SERVICE_CREDITS.INFLATION_RATE.DSLA_LP.symbol,
        dslaSpName: SERVICE_CREDITS.INFLATION_RATE.DSLA_SP.name,
        dslaSpSymbol: SERVICE_CREDITS.INFLATION_RATE.DSLA_SP.symbol,
      },
    ],
    scripts: scripts,
  },
};
