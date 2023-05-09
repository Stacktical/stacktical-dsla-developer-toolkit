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
  AVALANCHE_URI: Joi.string().required(),
  AVALANCHE_WS_URI: Joi.string().required(),
  STAKING_REWARDS_ADAPTER: Joi.string().required(),
}).unknown();

const { error, value } = schema.validate(process.env);

if (error) {
  throw new Error(`.env file validation error: ${error.message}`);
} else {
  process.env = value;
}

export const avalanchev2: NetworkUserConfig = {
  chainId: 43114,
  accounts: {
    mnemonic: process.env.MAINNET_MNEMONIC,
  },
  url: process.env.AVALANCHE_URI,
  stacktical: {
    checkPastPeriods: true,
    deployTokens: false,
    /** Ref: https://github.com/pangolindex/tokenlists/blob/main/ab.tokenlist.json  */
    tokens: [
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.DSLA,
        address: '0xD7c295E399CA928A3a14b01D760E794f1AdF8990',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.DAI,
        address: '0xd586E7F844cEa2F87f50152665BCbc2C279D8d70',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.USDC,
        address: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.USDT,
        address: '0xc7198437980c041c805A1EDcbA50c1Ce5db95118',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.WAVAX,
        address: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.WETH,
        address: '0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB',
      },
    ],
    ipfs: process.env.IPFS_URI,
    chainlink: {
      deployLocal: false,
      deleteOldJobs: false,
      cleanLocalFolder: false,
      nodeFunds: '0.2',
      ethWsUrl: process.env.AVALANCHE_WS_URI,
      nodesConfiguration: [
        {
          name: 'newyork',
          restApiUrl: process.env.AVALANCHEV2_CHAINLINK_NODE_1_URL,
          restApiPort: process.env.AVALANCHEV2_CHAINLINK_NODE_1_PORT,
          email: process.env.AVALANCHEV2_CHAINLINK_NODE_1_USER,
          password: process.env.AVALANCHEV2_CHAINLINK_NODE_1_PASS,
        },
      ],
    },
    addresses: {
      [CONTRACT_NAMES.LinkToken]: '0x5947BB275c521040051D82396192181b413227A3',
    },
    bootstrap: {
      allowance: [
        {
          contract: CONTRACT_NAMES.StakingParametricOracle,
          token: CONTRACT_NAMES.LinkToken,
          allowance: '10',
        },
        {
          contract: CONTRACT_NAMES.AssetFloorOracle,
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
      {
        contract: CONTRACT_NAMES.AssetFloorOracle,
        useCaseName: USE_CASES.ASSET_FLOOR,
        externalAdapterUrl: process.env.ASSET_FLOOR_ADAPTER,
        dslaLpName: SERVICE_CREDITS.ASSET_FLOOR.DSLA_LP.name,
        dslaLpSymbol: SERVICE_CREDITS.ASSET_FLOOR.DSLA_LP.symbol,
        dslaSpName: SERVICE_CREDITS.ASSET_FLOOR.DSLA_SP.name,
        dslaSpSymbol: SERVICE_CREDITS.ASSET_FLOOR.DSLA_SP.symbol,
      },
    ],
    scripts: scripts,
  },
};
