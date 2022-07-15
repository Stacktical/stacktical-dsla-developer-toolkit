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
  MAINNET_MNEMONIC: Joi.string().required(),
  HARMONY_URI: Joi.string().required(),
  HARMONY_WS_URI: Joi.string().required(),
  STAKING_EFFICIENCY_INDEXER_URI: Joi.string().required(),
}).unknown();

const { error, value } = schema.validate(process.env);

if (error) {
  throw new Error(`.env file validation error: ${error.message}`);
} else {
  process.env = value;
}

export const harmony: NetworkUserConfig = {
  chainId: 1666600000,
  gas: 12000000,
  gasPrice: 1000000000,
  accounts: {
    mnemonic: process.env.MAINNET_MNEMONIC,
  },
  url: process.env.HARMONY_URI,
  saveDeployments: true,
  stacktical: {
    deployTokens: false,
    checkPastPeriods: true,
    tokens: [
      /** https://explorer.harmony.one/hrc20 */
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.DSLA,
        address: '0x34704c70e9eC9fB9A921da6DAAD7D3e19f43c734',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.DAI,
        address: '0xEf977d2f931C1978Db5F6747666fa1eACB0d0339',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.USDC,
        address: '0x985458E523dB3d53125813eD68c274899e9DfAb4',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.USDT,
        address: '0x3C2B8Be99c50593081EAA2A724F0B8285F5aba8f',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.WONE,
        address: '0xcF664087a5bB0237a0BAd6742852ec6c8d69A27a',
      },
    ],
    ipfs: process.env.IPFS_URI,
    chainlink: {
      deployLocal: false,
      deleteOldJobs: false,
      cleanLocalFolder: false,
      nodeFunds: '1',
      ethWsUrl: process.env.HARMONY_WS_URI,
      ethHttpUrl: process.env.HARMONY_URI,
      nodesConfiguration: [
        {
          name: 'newyork.chainlink.node.dsla.network',
          restApiUrl: process.env.HARMONY_CHAINLINK_NODE_1_URL,
          restApiPort: process.env.HARMONY_CHAINLINK_NODE_1_PORT,
          email: process.env.HARMONY_CHAINLINK_NODE_1_USER,
          password: process.env.HARMONY_CHAINLINK_NODE_1_PASS,
        },
        {
          name: 'losangeles.chainlink.node.dsla.network',
          restApiUrl: process.env.HARMONY_CHAINLINK_NODE_2_URL,
          restApiPort: process.env.HARMONY_CHAINLINK_NODE_2_PORT,
          email: process.env.HARMONY_CHAINLINK_NODE_2_USER,
          password: process.env.HARMONY_CHAINLINK_NODE_2_PASS,
        },
      ],
    },
    addresses: {
      [CONTRACT_NAMES.LinkToken]: '0x218532a12a389a4a92fC0C5Fb22901D1c19198aA',
    },
    bootstrap: {
      allowance: [
        {
          contract: CONTRACT_NAMES.StakingAPR,
          token: CONTRACT_NAMES.LinkToken,
          allowance: '100',
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
            amountOfPeriods: 9,
            expiredPeriods: 0,
          },
          // Commented out for adding periods
          /*
          {
            periodType: PERIOD_TYPE.MONTHLY,
            amountOfPeriods: 9,
            expiredPeriods: 0,
          },
          */
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
        contract: CONTRACT_NAMES.InflationOracle,
        useCaseName: USE_CASES.INFLATION,
        externalAdapterUrl: process.env.INFLATION_INDEXER_URI,
        dslaLpName: SERVICE_CREDITS.INFLATION_RATE.DSLA_LP.name,
        dslaLpSymbol: SERVICE_CREDITS.INFLATION_RATE.DSLA_LP.symbol,
        dslaSpName: SERVICE_CREDITS.INFLATION_RATE.DSLA_SP.name,
        dslaSpSymbol: SERVICE_CREDITS.INFLATION_RATE.DSLA_SP.symbol,
      },
    ],
    scripts: scripts,
  },
};
