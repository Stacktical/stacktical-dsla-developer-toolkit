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
  ARBITRUMTESTNETV2_URI: Joi.string().required(),
  ARBITRUMTESTNETV2_WS_URI: Joi.string().required(),
  STAKING_REWARDS_ADAPTER: Joi.string().required(),
}).unknown();

const { error, value } = schema.validate(process.env);

if (error) {
  throw new Error(`.env file validation error: ${error.message}`);
} else {
  process.env = value;
}

export const arbitrumv2: NetworkUserConfig = {
  chainId: 421613,
  accounts: {
    mnemonic: process.env.MAINNET_MNEMONIC,
  },
  url: process.env.ARBITRUMV2_URI,
  stacktical: {
    checkPastPeriods: false,
    deployTokens: true,
    tokens: [
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.DSLA,
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.DAI,
        address: '0x8FA6547A65B1640eBa80880BF29f21B886636113',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.USDC,
        address: '0x179522635726710Dd7D2035a81d856de4Aa7836c',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.USDT,
        address: '0x37E607e9f601D718A50221f62b3f4816D0e6352e',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.AGOR,
        address: '0xCC59686e3a32Fb104C8ff84DD895676265eFb8a6',
      },
    ],
    ipfs: process.env.IPFS_URI,
    chainlink: {
      deployLocal: false,
      deleteOldJobs: false,
      cleanLocalFolder: false,
      nodeFunds: '0.01',
      ethHttpUrl: process.env.ARBITRUMV2_URI,
      ethWsUrl: process.env.ARBITRUMV2_WS_URI,
      nodesConfiguration: [
        {
          name: 'newyork',
          restApiUrl: process.env.ARBITRUMTESTNETV2_CHAINLINK_NODE_1_URL,
          restApiPort: process.env.ARBITRUMTESTNETV2_CHAINLINK_NODE_1_PORT,
          email: process.env.ARBITRUMTESTNETV2_CHAINLINK_NODE_1_USER,
          password: process.env.ARBITRUMTESTNETV2_CHAINLINK_NODE_1_PASS,
        },
      ],
    },
    addresses: {
      [CONTRACT_NAMES.LinkToken]: '0xd14838A68E8AFBAdE5efb411d5871ea0011AFd28',
    },
    bootstrap: {
      allowance: [
        // {
        //   contract: CONTRACT_NAMES.StakingRewardsOracle,
        //   token: CONTRACT_NAMES.LinkToken,
        //   allowance: '10',
        // },
        // {
        //   contract: CONTRACT_NAMES.StakingUptimeOracle,
        //   token: CONTRACT_NAMES.LinkToken,
        //   allowance: '10',
        // },
        // {
        //   contract: CONTRACT_NAMES.StakingRewardsOracle,
        //   token: CONTRACT_NAMES.LinkToken,
        //   allowance: '10',
        // },
        // {
        //   contract: CONTRACT_NAMES.AssetFloorOracle,
        //   token: CONTRACT_NAMES.LinkToken,
        //   allowance: '10',
        // },
        // {
        //   contract: CONTRACT_NAMES.AssetPegOracle,
        //   token: CONTRACT_NAMES.LinkToken,
        //   allowance: '10',
        // },
        // {
        //   contract: CONTRACT_NAMES.InflationOracle,
        //   token: CONTRACT_NAMES.LinkToken,
        //   allowance: '10',
        // },
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
      // {
      //   contract: CONTRACT_NAMES.StakingRewardsOracle,
      //   useCaseName: USE_CASES.STAKING_REWARDS,
      //   externalAdapterUrl: process.env.STAKING_REWARDS_ADAPTER,
      //   dslaLpName: SERVICE_CREDITS.STAKING_REWARDS.DSLA_LP.name,
      //   dslaLpSymbol: SERVICE_CREDITS.STAKING_REWARDS.DSLA_LP.symbol,
      //   dslaSpName: SERVICE_CREDITS.STAKING_REWARDS.DSLA_SP.name,
      //   dslaSpSymbol: SERVICE_CREDITS.STAKING_REWARDS.DSLA_SP.symbol,
      // },
      // {
      //   contract: CONTRACT_NAMES.StakingUptimeOracle,
      //   useCaseName: USE_CASES.STAKING_UPTIME,
      //   externalAdapterUrl: process.env.STAKING_UPTIME_ADAPTER,
      //   dslaLpName: SERVICE_CREDITS.STAKING_UPTIME.DSLA_LP.name,
      //   dslaLpSymbol: SERVICE_CREDITS.STAKING_UPTIME.DSLA_LP.symbol,
      //   dslaSpName: SERVICE_CREDITS.STAKING_UPTIME.DSLA_SP.name,
      //   dslaSpSymbol: SERVICE_CREDITS.STAKING_UPTIME.DSLA_SP.symbol,
      // },
      // {
      //   contract: CONTRACT_NAMES.InflationOracle,
      //   useCaseName: USE_CASES.INFLATION,
      //   externalAdapterUrl: process.env.INFLATION_ADAPTER,
      //   dslaLpName: SERVICE_CREDITS.INFLATION.DSLA_LP.name,
      //   dslaLpSymbol: SERVICE_CREDITS.INFLATION.DSLA_LP.symbol,
      //   dslaSpName: SERVICE_CREDITS.INFLATION.DSLA_SP.name,
      //   dslaSpSymbol: SERVICE_CREDITS.INFLATION.DSLA_SP.symbol,
      // },
      // {
      //   contract: CONTRACT_NAMES.AssetFloorOracle,
      //   useCaseName: USE_CASES.ASSET_FLOOR,
      //   externalAdapterUrl: process.env.ASSET_FLOOR_ADAPTER,
      //   dslaLpName: SERVICE_CREDITS.ASSET_FLOOR.DSLA_LP.name,
      //   dslaLpSymbol: SERVICE_CREDITS.ASSET_FLOOR.DSLA_LP.symbol,
      //   dslaSpName: SERVICE_CREDITS.ASSET_FLOOR.DSLA_SP.name,
      //   dslaSpSymbol: SERVICE_CREDITS.ASSET_FLOOR.DSLA_SP.symbol,
      // },
      // {
      //   contract: CONTRACT_NAMES.AssetPegOracle,
      //   useCaseName: USE_CASES.ASSET_PEG,
      //   externalAdapterUrl: process.env.ASSET_PEG_ADAPTER,
      //   dslaLpName: SERVICE_CREDITS.ASSET_PEG.DSLA_LP.name,
      //   dslaLpSymbol: SERVICE_CREDITS.ASSET_PEG.DSLA_LP.symbol,
      //   dslaSpName: SERVICE_CREDITS.ASSET_PEG.DSLA_SP.name,
      //   dslaSpSymbol: SERVICE_CREDITS.ASSET_PEG.DSLA_SP.symbol,
      // },
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
