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
  METIS_URI: Joi.string().required(),
  STAKING_REWARDS_ADAPTER: Joi.string().required(),
}).unknown();

const { error, value } = schema.validate(process.env);

if (error) {
  throw new Error(`.env file validation error: ${error.message}`);
} else {
  process.env = value;
}

export const metis: NetworkUserConfig = {
  chainId: 1088,
  accounts: {
    mnemonic: process.env.MAINNET_MNEMONIC,
  },
  url: process.env.METIS_URI,
  stacktical: {
    checkPastPeriods: true,
    deployTokens: false,
    tokens: [
      /** https://etherscan.io/tokens */
      {
        // TODO: Update bridged DSLA address
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.DSLA,
        address: '0x3aFfCCa64c2A6f4e3B6Bd9c64CD2C969EFd1ECBe',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.USDC,
        address: '0xEA32A96608495e54156Ae48931A7c20f0dcc1a21',
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.USDT,
        address: '0xbB06DCA3AE6887fAbF931640f67cab3e3a16F4dC',
      },
    ],
    ipfs: process.env.IPFS_URI,
    chainlink: {
      deployLocal: false,
      deleteOldJobs: false,
      cleanLocalFolder: false,
      nodeFunds: '1',
      ethWsUrl: process.env.METIS_URI,
      nodesConfiguration: [],
    },
    addresses: {
      [CONTRACT_NAMES.LinkToken]: '0x79892E8A3Aea66C8F6893fa49eC6208ef07EC046',
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
        // {
        //   contract: CONTRACT_NAMES.StakingParametricOracle,
        //   token: CONTRACT_NAMES.LinkToken,
        //   allowance: '10',
        // },
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
    messengers: [],
    scripts: scripts,
  },
};
