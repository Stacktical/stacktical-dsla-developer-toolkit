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

// const schema = Joi.object({
//   DEVELOP_MNEMONIC: Joi.string().required(),
//   DEVELOP_URI: Joi.string().required(),
//   DEVELOP_WS_URI: Joi.string().required(),
// }).unknown();
//
// const { error, value } = schema.validate(process.env);
//
// if (error) {
//   throw new Error(
//     `.env file validation error for network develop: ${error.message}`
//   );
// } else {
//   process.env = value;
// }

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
    checkPastPeriods: true,
    tokens: [
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
    ],
    chainlink: {
      isProduction: true,
      deleteOldJobs: true,
      nodeFunds: '1',
      gasLimit: undefined,
      ethWsUrl: process.env.HARMONY_WS_URI,
      ethHttpUrl: process.env.HARMONY_URI,
      nodesConfiguration: [
        {
          name: 'chainlink-node-1',
          restApiUrl: process.env.HARMONY_CHAINLINK_NODE_1_URL,
          restApiPort: process.env.HARMONY_CHAINLINK_NODE_1_PORT,
          email: process.env.HARMONY_CHAINLINK_NODE_1_USER,
          password: process.env.HARMONY_CHAINLINK_NODE_1_PASS,
        },
      ],
    },
    addresses: {
      [CONTRACT_NAMES.LinkToken]: '0x218532a12a389a4a92fC0C5Fb22901D1c19198aA',
    },
    bootstrap: {
      allowance: [
        {
          contract: CONTRACT_NAMES.SEMessenger,
          token: CONTRACT_NAMES.LinkToken,
          allowance: '100',
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
