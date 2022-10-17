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
  STAKING_REWARDS_ADAPTER: Joi.string().required(),
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
