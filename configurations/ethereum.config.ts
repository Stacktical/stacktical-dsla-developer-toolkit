import {
  appRoot,
  CONTRACT_NAMES,
  PERIOD_TYPE,
  TOKEN_NAMES,
  USE_CASES,
} from '../constants';
import { EthereumERC20__factory } from '../typechain';
import { NetworkUserConfig } from 'hardhat/types';
import { scripts } from './scripts.config';
import Joi from 'joi';

const schema = Joi.object({
  MAINNET_MNEMONIC: Joi.string().required(),
  ETHEREUM_URI: Joi.string().required(),
  ETHEREUM_WS_URI: Joi.string().required(),
}).unknown();

const { error, value } = schema.validate(process.env);

if (error) {
  throw new Error(`.env file validation error: ${error.message}`);
} else {
  process.env = value;
}

export const ethereum: NetworkUserConfig = {
  chainId: 1,
  accounts: {
    mnemonic: process.env.MAINNET_MNEMONIC,
  },
  url: process.env.ETHEREUM_URI,
  stacktical: {
    checkPastPeriods: true,
    tokens: [
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
    ],
    chainlink: {
      isProduction: true,
      deleteOldJobs: false,
      nodeFunds: '1',
      gasLimit: undefined,
      ethWsUrl: process.env.ETHEREUM_WS_URI,
      nodesConfiguration: [
        {
          name: 'berlin',
          restApiUrl: process.env.ETHEREUM_CHAINLINK_NODE_1_URL,
          restApiPort: process.env.ETHEREUM_CHAINLINK_NODE_1_PORT,
          email: process.env.ETHEREUM_CHAINLINK_NODE_1_USER,
          password: process.env.ETHEREUM_CHAINLINK_NODE_1_PASS,
        },
        {
          name: 'newyork',
          restApiUrl: process.env.ETHEREUM_CHAINLINK_NODE_2_URL,
          restApiPort: process.env.ETHEREUM_CHAINLINK_NODE_2_PORT,
          email: process.env.ETHEREUM_CHAINLINK_NODE_2_USER,
          password: process.env.ETHEREUM_CHAINLINK_NODE_2_PASS,
        },
        {
          name: 'paris',
          restApiUrl: process.env.ETHEREUM_CHAINLINK_NODE_3_URL,
          restApiPort: process.env.ETHEREUM_CHAINLINK_NODE_3_PORT,
          email: process.env.ETHEREUM_CHAINLINK_NODE_3_USER,
          password: process.env.ETHEREUM_CHAINLINK_NODE_3_PASS,
        },
      ],
    },
    addresses: {
      [CONTRACT_NAMES.Oracle]: '0x99F4e62a317cc666589c9e370c73c15B158f3c61',
      [CONTRACT_NAMES.LinkToken]: '0x514910771af9ca656af840dff83e8264ecf986ca',
      [CONTRACT_NAMES.SLORegistry]:
        '0x1bE60A36Ba9De2eCeFe8be8d2720B67f932EC487',
      [CONTRACT_NAMES.SLARegistry]:
        '0xB63a13825e129fBa2f2205847158461bec5f265A',
      [CONTRACT_NAMES.MessengerRegistry]:
        '0x766C0b52fADC43Bc3EEAe8BC64536404981951bE',
      [CONTRACT_NAMES.PeriodRegistry]:
        '0x5Da279bE9D6CeB11e7D7117915075066909357bc',
      [CONTRACT_NAMES.StakeRegistry]:
        '0x4b48AdDd838A11061cE285106f4a30cc5636735C',
      [CONTRACT_NAMES.SEMessenger]:
        '0xFB29aFC3F4B78755f07faD5B86448595D2EEC86C',
      [CONTRACT_NAMES.Details]: '0x38b0cd8BB4C4608E32EE75b25A8846459cEAd513',
      [CONTRACT_NAMES.PreCoordinator]:
        '0x7db551Ce6677211309db39A67F73cA923e9d4944',
    },
    bootstrap: {
      allowance: [
        {
          contract: CONTRACT_NAMES.SEMessenger,
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
        ],
        stake: {
          stakingParameters: {},
        },
        messengers: [
          {
            contract: CONTRACT_NAMES.SEMessenger,
            specificationPath: `${appRoot.path}/contracts/messengers/${USE_CASES.STAKING_EFFICIENCY}/${CONTRACT_NAMES.SEMessenger}.json`,
            useCaseName: 'staking-efficiency',
            externalAdapterUrl:
              'https://europe-west1-stacktical-0.cloudfunctions.net/dsla-indexer',
          },
        ],
      },
    },
    scripts: scripts,
  },
};
