import Joi from 'joi';
import {
  appRoot,
  CONTRACT_NAMES,
  PERIOD_TYPE,
  SENetworkNames,
  SENetworkNamesBytes32,
  SENetworks,
  SLO_TYPE,
  TOKEN_NAMES,
  USE_CASES,
} from '../constants';
import { EthereumERC20__factory } from '../typechain';
import { NetworkUserConfig } from 'hardhat/types';
//
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

export const develop: NetworkUserConfig = {
  chainId: 1337,
  accounts: {
    mnemonic: process.env.DEVELOP_MNEMONIC,
  },
  url: 'http://localhost:8545',
  stacktical: {
    chainlink: {
      isProduction: false,
      deleteOldJobs: true,
      nodeFunds: '10',
      gasLimit: undefined,
      ethWsUrl: 'ws://host.docker.internal:8545',
      ethHttpUrl: 'http://host.docker.internal:8545',
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
      {
        factory: EthereumERC20__factory,
        name: TOKEN_NAMES.USDT,
        address: '0x34704c70e9eC9fB9A921da6DAAD7D3e19f43c734',
      },
    ],
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
            expiredPeriods: 14,
          },
        ],
        stake: {
          stakingParameters: {},
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
    scripts: {
      deploy_sla: [
        {
          sloValue: 50 * 10 ** 3,
          sloType: SLO_TYPE.GreaterThan,
          whitelisted: false,
          periodType: PERIOD_TYPE.WEEKLY,
          initialPeriodId: 0,
          finalPeriodId: 10,
          extraData: [SENetworkNamesBytes32[SENetworks.ONE]],
          initialTokenSupply: '10000000',
          initialTokenSupplyDivisor: 100,
          deployerStakeTimes: 100,
          notDeployerStakeTimes: 2,
          leverage: 50,
          serviceMetadata: {
            serviceName: 'P-OPS',
            serviceDescription: 'Official bDSLA Beta Partner.',
            serviceImage:
              'https://storage.googleapis.com/bdsla-incentivized-beta/validators/chainode.svg',
            serviceURL: 'https://bdslaToken.network',
            serviceAddress: 'one1kf42rl6yg2avkjsu34ch2jn8yjs64ycn4n9wdj',
            serviceTicker: SENetworkNames[SENetworks.ONE],
          },
        },
        {
          sloValue: 15 * 10 ** 3,
          sloType: SLO_TYPE.GreaterThan,
          whitelisted: false,
          periodType: PERIOD_TYPE.WEEKLY,
          initialPeriodId: 10,
          finalPeriodId: 30,
          extraData: [SENetworkNamesBytes32[SENetworks.ONE]],
          initialTokenSupply: '10000000',
          initialTokenSupplyDivisor: 100,
          deployerStakeTimes: 100,
          notDeployerStakeTimes: 2,
          leverage: 50,
          serviceMetadata: {
            serviceName: 'P-OPS',
            serviceDescription: 'Official bDSLA Beta Partner.',
            serviceImage:
              'https://storage.googleapis.com/bdsla-incentivized-beta/validators/chainode.svg',
            serviceURL: 'https://bdslaToken.network',
            serviceAddress: 'one1kf42rl6yg2avkjsu34ch2jn8yjs64ycn4n9wdj',
            serviceTicker: SENetworkNames[SENetworks.ONE],
          },
        },
        {
          sloValue: 20 * 10 ** 3,
          sloType: SLO_TYPE.GreaterThan,
          whitelisted: false,
          periodType: PERIOD_TYPE.WEEKLY,
          initialPeriodId: 10,
          finalPeriodId: 30,
          extraData: [SENetworkNamesBytes32[SENetworks.ONE]],
          initialTokenSupply: '10000000',
          initialTokenSupplyDivisor: 100,
          deployerStakeTimes: 100,
          notDeployerStakeTimes: 2,
          leverage: 50,
          serviceMetadata: {
            serviceName: 'P-OPS',
            serviceDescription: 'Official bDSLA Beta Partner.',
            serviceImage:
              'https://storage.googleapis.com/bdsla-incentivized-beta/validators/chainode.svg',
            serviceURL: 'https://bdslaToken.network',
            serviceAddress: 'one1kf42rl6yg2avkjsu34ch2jn8yjs64ycn4n9wdj',
            serviceTicker: SENetworkNames[SENetworks.ONE],
          },
        },
        {
          sloValue: 25 * 10 ** 3,
          sloType: SLO_TYPE.GreaterThan,
          whitelisted: false,
          periodType: PERIOD_TYPE.WEEKLY,
          initialPeriodId: 10,
          finalPeriodId: 30,
          extraData: [SENetworkNamesBytes32[SENetworks.ONE]],
          initialTokenSupply: '10000000',
          initialTokenSupplyDivisor: 100,
          deployerStakeTimes: 100,
          notDeployerStakeTimes: 2,
          leverage: 50,
          serviceMetadata: {
            serviceName: 'P-OPS',
            serviceDescription: 'Official bDSLA Beta Partner.',
            serviceImage:
              'https://storage.googleapis.com/bdsla-incentivized-beta/validators/chainode.svg',
            serviceURL: 'https://bdslaToken.network',
            serviceAddress: 'one1kf42rl6yg2avkjsu34ch2jn8yjs64ycn4n9wdj',
            serviceTicker: SENetworkNames[SENetworks.ONE],
          },
        },
        {
          sloValue: 40 * 10 ** 3,
          sloType: SLO_TYPE.GreaterThan,
          whitelisted: false,
          periodType: PERIOD_TYPE.WEEKLY,
          initialPeriodId: 10,
          finalPeriodId: 30,
          extraData: [SENetworkNamesBytes32[SENetworks.ONE]],
          initialTokenSupply: '10000000',
          initialTokenSupplyDivisor: 100,
          deployerStakeTimes: 100,
          notDeployerStakeTimes: 2,
          leverage: 50,
          serviceMetadata: {
            serviceName: 'P-OPS',
            serviceDescription: 'Official bDSLA Beta Partner.',
            serviceImage:
              'https://storage.googleapis.com/bdsla-incentivized-beta/validators/chainode.svg',
            serviceURL: 'https://bdslaToken.network',
            serviceAddress: 'one1kf42rl6yg2avkjsu34ch2jn8yjs64ycn4n9wdj',
            serviceTicker: SENetworkNames[SENetworks.ONE],
          },
        },
      ],
    },
  },
};
