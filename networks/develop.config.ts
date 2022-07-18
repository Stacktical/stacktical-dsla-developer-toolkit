import {
  appRoot,
  CONTRACT_NAMES,
  PERIOD_TYPE,
  SERVICE_CREDITS,
  TOKEN_NAMES,
  USE_CASES,
} from '../constants';
import { EthereumERC20__factory } from '../typechain'; //EthereumERC20__factory ERC20__factory
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
      deployLocal: true, // Deploys local dockers everytime
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
          password: 'passwordUPPERCASE!!!777',
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
          contract: CONTRACT_NAMES.BaseOracle,
          token: CONTRACT_NAMES.LinkToken,
          allowance: '10',
        },
        {
          contract: CONTRACT_NAMES.StakingAPR,
          token: CONTRACT_NAMES.LinkToken,
          allowance: '10',
        },
        {
          contract: CONTRACT_NAMES.StakingUptime,
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
            amountOfPeriods: 52, // Number of periods from now
            expiredPeriods: 12,
          },
          {
            periodType: PERIOD_TYPE.MONTHLY,
            amountOfPeriods: 12,
            expiredPeriods: 6,
          },
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
        contract: CONTRACT_NAMES.StakingAPR,
        useCaseName: USE_CASES.STAKING_EFFICIENCY,
        externalAdapterUrl: process.env.STAKING_EFFICIENCY_INDEXER_URI,
        dslaLpName: SERVICE_CREDITS.STAKING_REWARDS.DSLA_LP.name,
        dslaLpSymbol: SERVICE_CREDITS.STAKING_REWARDS.DSLA_LP.symbol,
        dslaSpName: SERVICE_CREDITS.STAKING_REWARDS.DSLA_SP.name,
        dslaSpSymbol: SERVICE_CREDITS.STAKING_REWARDS.DSLA_SP.symbol,
      },
      {
        contract: CONTRACT_NAMES.StakingUptime,
        useCaseName: USE_CASES.STAKING_EFFICIENCY_ALT,
        externalAdapterUrl: process.env.STAKING_EFFICIENCY_INDEXER_ALT_URI,
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
      /*
      {
        contract: CONTRACT_NAMES.PPMessenger,
        useCaseName: USE_CASES.PAR_PEG,
        externalAdapterUrl: 'http://host.docker.internal:6080',
      },*/
    ],
    scripts: scripts,
  },
};
