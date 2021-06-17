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

export const harmonytestnet: NetworkUserConfig = {
  chainId: 1666700000,
  gas: 12000000,
  gasPrice: 1000000000,
  accounts: {
    mnemonic: process.env.TESTNET_MNEMONIC,
  },
  url: process.env.HARMONYTESTNET_URI,
  saveDeployments: true,
  stacktical: {
    checkPastPeriods: false,
    tokens: [
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.DSLA,
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.DAI,
      },
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.USDC,
      },
    ],
    chainlink: {
      isProduction: false,
      deleteOldJobs: true,
      nodeFunds: '1',
      gasLimit: undefined,
      ethWsUrl: process.env.HARMONYTESTNET_WS_URI,
      nodesConfiguration: [
        {
          name: 'node-1',
          restApiUrl: 'http://localhost',
          restApiPort: '6688',
          email: 'test@stacktical.com',
          password: 'PaSSword123456',
        },
      ],
    },
    addresses: {},
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
            expiredPeriods: 20,
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
            useCaseName: USE_CASES.STAKING_EFFICIENCY,
            externalAdapterUrl: 'http://host.docker.internal:6060',
          },
        ],
      },
    },
    scripts: scripts,
  },
};
