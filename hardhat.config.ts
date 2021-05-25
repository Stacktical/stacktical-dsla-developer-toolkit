/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config({ path: './.env' });
import { StackticalConfiguration } from './types';
import './tasks';
import {
  NETWORKS,
  PERIOD_TYPE,
  SENetworkNames,
  SENetworkNamesBytes32,
  SENetworks,
  SLO_TYPE,
} from './constants';
import { extendEnvironment } from 'hardhat/config';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-web3';
import 'babel-polyfill';
import 'babel-register';
import '@typechain/hardhat';
import './stacktical-plugin';
import './type-extensions';
import {
  HardhatRuntimeEnvironment,
  HardhatUserConfig,
  Network,
} from 'hardhat/types';

const developStacktical: StackticalConfiguration = {
  chainlink: {
    isProduction: false,
    nodeFunds: '10',
    gasLimit: undefined,
    externalAdapterUrL: null,
    ethWsUrl: 'ws://host.docker.internal:8545',
    ethHttpUrl: 'http://host.docker.internal:8545',
    nodesConfiguration: [
      {
        name: 'develop-1',
        restApiUrl: 'http://localhost',
        restApiPort: '6688',
        email: 'test@stacktical.com',
        password: 'PaSSword123456',
        externalAdapterUrl: 'http://host.docker.internal:6060',
      },
      {
        name: 'develop-2',
        restApiUrl: 'http://localhost',
        restApiPort: '6689',
        email: 'test@stacktical.com',
        password: 'PaSSword123456',
        externalAdapterUrl: 'http://host.docker.internal:6060',
      },
    ],
  },
  addresses: {
    tokens: {
      LINK: null,
      DSLA: null,
      DAI: null,
      USDC: null,
    },
    oracle: null,
  },
  checkPastPeriods: false,
  bootstrap: {
    periods: [
      {
        periodType: PERIOD_TYPE.HOURLY,
        amountOfPeriods: 5,
        expiredPeriods: 2,
      },
      {
        periodType: PERIOD_TYPE.DAILY,
        amountOfPeriods: 5,
        expiredPeriods: 2,
      },
      {
        periodType: PERIOD_TYPE.WEEKLY,
        amountOfPeriods: 52,
        expiredPeriods: 10,
      },
    ],
    messengersLinkTokenAllowance: '10',
  },
  scripts: {
    deploy_sla: {
      sloValue: 50 * 10 ** 3,
      sloType: SLO_TYPE.GreaterThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      initialPeriodId: 0,
      finalPeriodId: 10,
      extraData: [SENetworkNamesBytes32[SENetworks.DOT]],
      initialTokenSupply: '10000000',
      initialTokenSupplyDivisor: 100,
      leverage: 50,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 2,
      serviceMetadata: {
        serviceName: 'P-OPS',
        serviceDescription: 'Official bDSLA Beta Partner.',
        serviceImage:
          'https://storage.googleapis.com/bdsla-incentivized-beta/validators/chainode.svg',
        serviceURL: 'https://bdslaToken.network',
        serviceAddress: 'validator-address',
        serviceTicker: SENetworkNames[SENetworks.DOT],
      },
    },
  },
};

const config: HardhatUserConfig = {
  // defaultNetwork: NETWORKS.DEVELOP,
  networks: {
    hardhat: {
      chainId: 1337,
      accounts: {
        mnemonic: process.env.DEVELOP_MNEMONIC,
      },
      saveDeployments: true,
      mining: {
        auto: true,
      },
      stacktical: developStacktical,
    },
    [NETWORKS.DEVELOP]: {
      chainId: 1337,
      accounts: {
        mnemonic: process.env.DEVELOP_MNEMONIC,
      },
      url: 'http://localhost:8545',
      stacktical: developStacktical,
    },
    [NETWORKS.HARMONYTESTNET]: {
      chainId: 1666700000,
      gas: 12000000,
      gasPrice: 1000000000,
      accounts: {
        mnemonic: process.env.TESTNET_MNEMONIC,
      },
      url: process.env.HARMONYTESTNET_URI,
      saveDeployments: true,
      stacktical: {
        chainlink: {
          isProduction: false,
          nodeFunds: '0.001',
          gasLimit: undefined,
          externalAdapterUrL: null,
          ethWsUrl: process.env.HARMONYTESTNET_WS_URI,
          nodesConfiguration: developStacktical.chainlink.nodesConfiguration,
        },
        addresses: {
          tokens: {
            LINK: null,
            DSLA: null,
            DAI: null,
            USDC: null,
          },
          oracle: null,
        },
        checkPastPeriods: false,
        bootstrap: {
          periods: [
            {
              periodType: PERIOD_TYPE.HOURLY,
              amountOfPeriods: 5,
              expiredPeriods: 2,
            },
            {
              periodType: PERIOD_TYPE.DAILY,
              amountOfPeriods: 5,
              expiredPeriods: 2,
            },
            {
              periodType: PERIOD_TYPE.WEEKLY,
              amountOfPeriods: 52,
              expiredPeriods: 10,
            },
          ],
          messengersLinkTokenAllowance: '10',
        },
        scripts: {
          deploy_sla: developStacktical.scripts.deploy_sla,
        },
      },
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.6.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.4.24',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.4.11',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  paths: {
    sources: 'contracts',
    deploy: 'deploy',
    deployments: 'deployments',
    imports: './build/contracts',
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    notDeployer: {
      default: 1,
    },
  },
};

extendEnvironment((env) => {
  networkFromConfig(env, env.network);
});

function networkFromConfig(env: HardhatRuntimeEnvironment, network: Network) {
  network.stacktical = env.network.stacktical;
}

module.exports = config;
