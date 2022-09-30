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
  ARBITRUMV2_URI: Joi.string().required(),
  ARBITRUMV2_WS_URI: Joi.string().required(),
  STAKING_REWARDS_ADAPTER: Joi.string().required(),
}).unknown();

const { error, value } = schema.validate(process.env);

if (error) {
  throw new Error(`.env file validation error: ${error.message}`);
} else {
  process.env = value;
}

export const arbitrumv2: NetworkUserConfig = {
  chainId: 42161,
  accounts: {
    mnemonic: process.env.MAINNET_MNEMONIC,
  },
  url: process.env.ARBITRUMV2_URI,
  stacktical: {
    checkPastPeriods: true,
    deployTokens: false,
    tokens: [
      /** https://nova-explorer.arbitrum.io/token/0x19255F9332aed0142AcB96C271bDe0e1152BE3e1/token-transfers */
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.DSLA,
        address: '0x19255F9332aed0142AcB96C271bDe0e1152BE3e1',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.DAI,
        address: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.USDC,
        address: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.USDT,
        address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.WETH,    // REPLACE WITH ARBITRUM NATIVE TOKEN WHENEVER RELEASED
        address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
      },
    ],
    ipfs: process.env.IPFS_URI,
    chainlink: {
      deployLocal: false,
      deleteOldJobs: false,
      cleanLocalFolder: false,
      nodeFunds: '1',
      ethHttpUrl: process.env.ARBITRUMV2_URI,
      ethWsUrl: process.env.ARBITRUMV2_WS_URI,
      nodesConfiguration: [
        {
          name: 'newyork',
          restApiUrl: process.env.ARBITRUMV2_CHAINLINK_NODE_1_URL,
          restApiPort: process.env.ARBITRUMV2_CHAINLINK_NODE_1_PORT,
          email: process.env.ARBITRUMV2_CHAINLINK_NODE_1_USER,
          password: process.env.ARBITRUMV2_CHAINLINK_NODE_1_PASS,
        },
      ],
    },
    addresses: {
      [CONTRACT_NAMES.LinkToken]: '0xf97f4df75117a78c1A5a0DBb814Af92458539FB4',
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
          contract: CONTRACT_NAMES.StakingRewardsOracle,
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
      ],
      registry: {
        periods: [
          {
            periodType: PERIOD_TYPE.DAILY,
            amountOfPeriods: 365, // Number of periods from now
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
