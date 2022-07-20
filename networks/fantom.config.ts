import {
  appRoot,
  CONTRACT_NAMES,
  PERIOD_TYPE,
  SERVICE_CREDITS,
  TOKEN_NAMES,
  USE_CASES,
} from '../constants';
import { FantomERC20__factory } from '../typechain';
import { NetworkUserConfig } from 'hardhat/types';
import { scripts } from '../scripts.config';
import Joi from 'joi';

const schema = Joi.object({
  MAINNET_MNEMONIC: Joi.string().required(),
  FANTOM_URI: Joi.string().required(),
  FANTOM_WS_URI: Joi.string().required(),
  STAKING_REWARDS_ADAPTER: Joi.string().required(),
}).unknown();

const { error, value } = schema.validate(process.env);

if (error) {
  throw new Error(`.env file validation error: ${error.message}`);
} else {
  process.env = value;
}

export const fantom: NetworkUserConfig = {
  chainId: 250,
  accounts: {
    mnemonic: process.env.MAINNET_MNEMONIC,
  },
  url: process.env.FANTOM_URI,
  stacktical: {
    checkPastPeriods: true,
    deployTokens: false,
    tokens: [
      {
        factory: FantomERC20__factory,
        name: TOKEN_NAMES.DSLA,
        address: '0x25a528af62e56512a19ce8c3cab427807c28cc19',
      },
      {
        factory: FantomERC20__factory,
        name: TOKEN_NAMES.DAI,
        address: '0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e',
      },
      {
        factory: FantomERC20__factory,
        name: TOKEN_NAMES.USDC,
        address: '0x04068da6c83afcfa0e13ba15a6696662335d5b75',
      },
      {
        factory: FantomERC20__factory,
        name: TOKEN_NAMES.USDT,
        // https://ftmscan.com/address/0x049d68029688eAbF473097a2fC38ef61633A3C7A
        address: '0x049d68029688eAbF473097a2fC38ef61633A3C7A',
      },
      {
        factory: FantomERC20__factory,
        name: TOKEN_NAMES.WFTM,
        address: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
      },
    ],
    ipfs: process.env.IPFS_URI,
    chainlink: {
      deployLocal: false,
      deleteOldJobs: true,
      cleanLocalFolder: false,
      nodeFunds: '1',
      ethWsUrl: process.env.FANTOM_WS_URI,
      nodesConfiguration: [
        {
          name: 'newyork',
          restApiUrl: process.env.FANTOM_CHAINLINK_NODE_1_URL,
          restApiPort: process.env.FANTOM_CHAINLINK_NODE_1_PORT,
          email: process.env.FANTOM_CHAINLINK_NODE_1_USER,
          password: process.env.FANTOM_CHAINLINK_NODE_1_PASS,
        },
      ],
    },
    addresses: {
      [CONTRACT_NAMES.LinkToken]: '0x6F43FF82CCA38001B6699a8AC47A2d0E66939407',
    },
    bootstrap: {
      allowance: [
        {
          contract: CONTRACT_NAMES.StakingRewardsOracle,
          token: CONTRACT_NAMES.LinkToken,
          allowance: '10',
        },
        {
          contract: CONTRACT_NAMES.StakingUptimeOracle,
          token: CONTRACT_NAMES.LinkToken,
          allowance: '10',
        },
        {
          contract: CONTRACT_NAMES.InflationOracle,
          token: CONTRACT_NAMES.LinkToken,
          allowance: '10',
        },
        {
          contract: CONTRACT_NAMES.AssetFloorOracle,
          token: CONTRACT_NAMES.LinkToken,
          allowance: '10',
        },
        {
          contract: CONTRACT_NAMES.AssetPegOracle,
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
          {
            periodType: PERIOD_TYPE.MONTHLY,
            amountOfPeriods: 12,
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
        contract: CONTRACT_NAMES.StakingRewardsOracle,
        useCaseName: USE_CASES.STAKING_REWARDS,
        externalAdapterUrl: process.env.STAKING_REWARDS_ADAPTER,
        dslaLpName: SERVICE_CREDITS.STAKING_REWARDS.DSLA_LP.name,
        dslaLpSymbol: SERVICE_CREDITS.STAKING_REWARDS.DSLA_LP.symbol,
        dslaSpName: SERVICE_CREDITS.STAKING_REWARDS.DSLA_SP.name,
        dslaSpSymbol: SERVICE_CREDITS.STAKING_REWARDS.DSLA_SP.symbol,
      },
      {
        contract: CONTRACT_NAMES.StakingUptimeOracle,
        useCaseName: USE_CASES.STAKING_UPTIME,
        externalAdapterUrl: process.env.STAKING_UPTIME_ADAPTER,
        dslaLpName: SERVICE_CREDITS.STAKING_UPTIME.DSLA_LP.name,
        dslaLpSymbol: SERVICE_CREDITS.STAKING_UPTIME.DSLA_LP.symbol,
        dslaSpName: SERVICE_CREDITS.STAKING_UPTIME.DSLA_SP.name,
        dslaSpSymbol: SERVICE_CREDITS.STAKING_UPTIME.DSLA_SP.symbol,
      },
      {
        contract: CONTRACT_NAMES.InflationOracle,
        useCaseName: USE_CASES.INFLATION,
        externalAdapterUrl: process.env.INFLATION_ADAPTER,
        dslaLpName: SERVICE_CREDITS.INFLATION.DSLA_LP.name,
        dslaLpSymbol: SERVICE_CREDITS.INFLATION.DSLA_LP.symbol,
        dslaSpName: SERVICE_CREDITS.INFLATION.DSLA_SP.name,
        dslaSpSymbol: SERVICE_CREDITS.INFLATION.DSLA_SP.symbol,
      },
      {
        contract: CONTRACT_NAMES.AssetFloorOracle,
        useCaseName: USE_CASES.ASSET_FLOOR,
        externalAdapterUrl: process.env.ASSET_FLOOR_ADAPTER,
        dslaLpName: SERVICE_CREDITS.ASSET_FLOOR.DSLA_LP.name,
        dslaLpSymbol: SERVICE_CREDITS.ASSET_FLOOR.DSLA_LP.symbol,
        dslaSpName: SERVICE_CREDITS.ASSET_FLOOR.DSLA_SP.name,
        dslaSpSymbol: SERVICE_CREDITS.ASSET_FLOOR.DSLA_SP.symbol,
      },
      {
        contract: CONTRACT_NAMES.AssetPegOracle,
        useCaseName: USE_CASES.ASSET_PEG,
        externalAdapterUrl: process.env.ASSET_PEG_ADAPTER,
        dslaLpName: SERVICE_CREDITS.ASSET_PEG.DSLA_LP.name,
        dslaLpSymbol: SERVICE_CREDITS.ASSET_PEG.DSLA_LP.symbol,
        dslaSpName: SERVICE_CREDITS.ASSET_PEG.DSLA_SP.name,
        dslaSpSymbol: SERVICE_CREDITS.ASSET_PEG.DSLA_SP.symbol,
      },
    ],
    scripts: scripts,
  },
};
