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
  ETHEREUM_URI: Joi.string().required(),
  ETHEREUM_WS_URI: Joi.string().required(),
  STAKING_REWARDS_ADAPTER: Joi.string().required(),
}).unknown();

const { error, value } = schema.validate(process.env);

if (error) {
  throw new Error(`.env file validation error: ${error.message}`);
} else {
  process.env = value;
}

export const ethereumv2: NetworkUserConfig = {
  chainId: 1,
  accounts: {
    mnemonic: process.env.MAINNET_MNEMONIC,
  },
  url: process.env.ETHEREUMV2_URI,
  stacktical: {
    checkPastPeriods: true,
    deployTokens: false,
    tokens: [
      /** https://etherscan.io/tokens */
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.DSLA,
        address: '0x3aFfCCa64c2A6f4e3B6Bd9c64CD2C969EFd1ECBe',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.DAI,
        address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.USDC,
        address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.USDT,
        address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.WETH,
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      },
      {
        /** https://docs.lido.fi/contracts/wsteth/ */
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.WSTETH,
        address: '0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0',
      },
    ],
    ipfs: process.env.IPFS_URI,
    chainlink: {
      deployLocal: false,
      deleteOldJobs: false,
      cleanLocalFolder: false,
      nodeFunds: '1',
      ethWsUrl: process.env.ETHEREUM_WS_URI,
      nodesConfiguration: [
        // {
        //   name: 'berlin',
        //   restApiUrl: process.env.ETHEREUM_CHAINLINK_NODE_1_URL,
        //   restApiPort: process.env.ETHEREUM_CHAINLINK_NODE_1_PORT,
        //   email: process.env.ETHEREUM_CHAINLINK_NODE_1_USER,
        //   password: process.env.ETHEREUM_CHAINLINK_NODE_1_PASS,
        // },
        {
          name: 'newyork',
          restApiUrl: process.env.ETHEREUMV2_CHAINLINK_NODE_2_URL,
          restApiPort: process.env.ETHEREUMV2_CHAINLINK_NODE_2_PORT,
          email: process.env.ETHEREUMV2_CHAINLINK_NODE_2_USER,
          password: process.env.ETHEREUMV2_CHAINLINK_NODE_2_PASS,
        },
        //{
        //  name: 'paris',
        //  restApiUrl: process.env.ETHEREUM_CHAINLINK_NODE_3_URL,
        //  restApiPort: process.env.ETHEREUM_CHAINLINK_NODE_3_PORT,
        //  email: process.env.ETHEREUM_CHAINLINK_NODE_3_USER,
        //  password: process.env.ETHEREUM_CHAINLINK_NODE_3_PASS,
        //},
      ],
    },
    addresses: {
      [CONTRACT_NAMES.LinkToken]: '0x514910771af9ca656af840dff83e8264ecf986ca',
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
