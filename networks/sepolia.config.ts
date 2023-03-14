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
  TESTNET_MNEMONIC: Joi.string().required(),
  SEPOLIA_URI: Joi.string().required(),
  SEPOLIA_WS_URI: Joi.string().required(),
  STAKING_REWARDS_ADAPTER: Joi.string().required(),
}).unknown();

const { error, value } = schema.validate(process.env);

if (error) {
  throw new Error(`.env file validation error: ${error.message}`);
} else {
  process.env = value;
}

export const sepolia: NetworkUserConfig = {
  chainId: 11155111,
  accounts: {
    mnemonic: process.env.TESTNET_MNEMONIC,
  },
  url: process.env.SEPOLIA_URI,
  stacktical: {
    checkPastPeriods: true,
    deployTokens: false,
    ipfs: process.env.IPFS_URI,
    chainlink: {
      deployLocal: false,
      deleteOldJobs: false,
      cleanLocalFolder: false,
      nodeFunds: '1',
      ethHttpUrl: process.env.SEPOLIA_URI,
      ethWsUrl: process.env.SEPOLIA_WS_URI,
      nodesConfiguration: [
        {
          name: 'newyork',
          restApiUrl: process.env.SEPOLIA_CHAINLINK_NODE_1_URL,
          restApiPort: process.env.SEPOLIA_CHAINLINK_NODE_1_PORT,
          email: process.env.SEPOLIA_CHAINLINK_NODE_1_USER,
          password: process.env.SEPOLIA_CHAINLINK_NODE_1_PASS,
        },
      ],
    },
    addresses: {
      [CONTRACT_NAMES.LinkToken]: '0x514910771af9ca656af840dff83e8264ecf986ca',
    },
    tokens: [
      /** https://etherscan.io/tokens */
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.DSLA,
        address: '',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.DAI,
        address: '',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.USDC,
        address: '',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.USDT,
        address: '',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.WETH,
        address: '',
      },
    ],
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
          contract: CONTRACT_NAMES.AssetPegOracle,
          token: CONTRACT_NAMES.LinkToken,
          allowance: '10',
        },
      ],
      registry: {
        periods: [
          {
            periodType: PERIOD_TYPE.HOURLY,
            amountOfPeriods: 24, // Number of periods from now
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
            dslaBurnedByVerification: '100000',
            dslaPlatformReward: '750',
            dslaDepositByPeriod: '250000',
            dslaMessengerReward: '49250',
            dslaUserReward: '100000',
            burnDSLA: true,
            maxLeverage: '4',
          },
        },
      },
    },
    messengers: [
      {
        contract: CONTRACT_NAMES.BaseOracle,
        useCaseName: USE_CASES.BASE_MESSENGER,
        externalAdapterUrl: 'http://host.docker.internal:6070',
        dslaLpName: SERVICE_CREDITS.BASE.DSLA_LP.name,
        dslaLpSymbol: SERVICE_CREDITS.BASE.DSLA_LP.symbol,
        dslaSpName: SERVICE_CREDITS.BASE.DSLA_SP.name,
        dslaSpSymbol: SERVICE_CREDITS.BASE.DSLA_SP.symbol,
      },
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
