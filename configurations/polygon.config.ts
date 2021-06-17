import {
  appRoot,
  CONTRACT_NAMES,
  PERIOD_TYPE,
  TOKEN_NAMES,
  USE_CASES,
} from '../constants';
import { PolygonERC20__factory } from '../typechain';
import { NetworkUserConfig } from 'hardhat/types';
import { scripts } from './scripts.config';

import Joi from 'joi';

const schema = Joi.object({
  MAINNET_MNEMONIC: Joi.string().required(),
  POLYGON_URI: Joi.string().required(),
  POLYGON_WS_URI: Joi.string().required(),
}).unknown();

const { error, value } = schema.validate(process.env);

if (error) {
  throw new Error(`.env file validation error: ${error.message}`);
} else {
  process.env = value;
}

export const polygon: NetworkUserConfig = {
  chainId: 137,
  gas: 19000000,
  gasPrice: 1000000000,
  accounts: {
    mnemonic: process.env.MAINNET_MNEMONIC,
  },
  url: process.env.POLYGON_URI,
  stacktical: {
    checkPastPeriods: true,
    tokens: [
      {
        factory: PolygonERC20__factory,
        name: TOKEN_NAMES.DSLA,
        address: '0xa0E390e9ceA0D0e8cd40048ced9fA9EA10D71639',
      },
      {
        factory: PolygonERC20__factory,
        name: TOKEN_NAMES.DAI,
        address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      },
      {
        factory: PolygonERC20__factory,
        name: TOKEN_NAMES.USDC,
        address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
      },
    ],
    chainlink: {
      isProduction: true,
      deleteOldJobs: true,
      nodeFunds: '1',
      gasLimit: undefined,
      ethWsUrl: process.env.ETHEREUM_WS_URI,
      nodesConfiguration: [
        {
          name: 'node-1',
          restApiUrl: process.env.ETHEREUM_CHAINLINK_NODE_1_URL,
          restApiPort: process.env.ETHEREUM_CHAINLINK_NODE_1_PORT,
          email: process.env.ETHEREUM_CHAINLINK_NODE_1_USER,
          password: process.env.ETHEREUM_CHAINLINK_NODE_1_PASS,
        },
        {
          name: 'node-2',
          restApiUrl: process.env.ETHEREUM_CHAINLINK_NODE_2_URL,
          restApiPort: process.env.ETHEREUM_CHAINLINK_NODE_2_PORT,
          email: process.env.ETHEREUM_CHAINLINK_NODE_2_USER,
          password: process.env.ETHEREUM_CHAINLINK_NODE_2_PASS,
        },
        {
          name: 'node-3',
          restApiUrl: process.env.ETHEREUM_CHAINLINK_NODE_3_URL,
          restApiPort: process.env.ETHEREUM_CHAINLINK_NODE_3_PORT,
          email: process.env.ETHEREUM_CHAINLINK_NODE_3_USER,
          password: process.env.ETHEREUM_CHAINLINK_NODE_3_PASS,
        },
      ],
    },
    addresses: {
      [CONTRACT_NAMES.SLORegistry]:
        '0x0b1cfF33ad49690dB0Eb0bc17429613969C7dDcF',
      [CONTRACT_NAMES.SLARegistry]:
        '0xf41EaA49BBae8650f051100d4385d5d7F9af4a54',
      [CONTRACT_NAMES.MessengerRegistry]:
        '0x8993F44B7Ee14446B12B6D879c325E3Cd624653B',
      [CONTRACT_NAMES.PeriodRegistry]:
        '0xEF12BDcF5E5D5ae4c950a9FaEb2A274d1646b48D',
      [CONTRACT_NAMES.StakeRegistry]:
        '0xc5C890444975f2211F84d3b543355f8DC74a6069',
      [CONTRACT_NAMES.SEMessenger]:
        '0x3eBe46d0d873B635D1e003BEe76de67cE2F3a584',
      [CONTRACT_NAMES.Details]: '0x857533E7d9DE216E8BdBd1620018099B88cDD792',
      [CONTRACT_NAMES.PreCoordinator]:
        '0x6e782e2c3f42003eE56d30BdD269555738A39e4A',
      [CONTRACT_NAMES.StringUtils]:
        '0x143c0e6cB35AC53C7f06d4914199E4cAc3977AC7',
      [CONTRACT_NAMES.Oracle]: '0x99F4e62a317cc666589c9e370c73c15B158f3c61',
      [CONTRACT_NAMES.LinkToken]: '0xb0897686c545045afc77cf20ec7a532e3120e0f1 ',
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
          stakingParameters: {
            dslaBurnedByVerification: '0',
            dslaPlatformReward: '500',
            dslaDepositByPeriod: '1000',
            dslaMessengerReward: '250',
            dslaUserReward: '250',
            burnDSLA: false,
          },
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
