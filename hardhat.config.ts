/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
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

const { task } = require('hardhat/config');
const { SUB_TASK_NAMES } = require('./subtasks');

enum TASK_NAMES {
  SCRIPT_EXPORT_DATA = 'script:export-data',
  SCRIPT_DEPLOY_SLA = 'script:deploy-sla',
  SCRIPT_CREATE_DOCKER_COMPOSE = 'script:docker-compose',
  SCRIPT_BOOTSTRAP_DSLA_PROTOCOL = 'bootstrap',
  SCRIPT_REQUEST_SLI = 'script:request-sli',
  SCRIPT_REQUEST_ANALYTICS = 'script:request-analytics',
}

task(
  TASK_NAMES.SCRIPT_DEPLOY_SLA,
  'Deploy customized SLA from stacktical config'
).setAction(async (_, { run }) => {
  await run(SUB_TASK_NAMES.DEPLOY_SLA);
});

task(
  TASK_NAMES.SCRIPT_EXPORT_DATA,
  'Export data to exported-data folder'
).setAction(async (_, { run }) => {
  await run(SUB_TASK_NAMES.SAVE_CONTRACTS_ADDRESSES);
  await run(SUB_TASK_NAMES.EXPORT_ABIS);
});

task(
  TASK_NAMES.SCRIPT_CREATE_DOCKER_COMPOSE,
  'Create docker compose'
).setAction(async (_, { run }) => {
  await run(SUB_TASK_NAMES.SET_CHAINLINK_ENV);
  await run(SUB_TASK_NAMES.SETUP_DOCKER_COMPOSE);
});

task(
  TASK_NAMES.SCRIPT_BOOTSTRAP_DSLA_PROTOCOL,
  'Bootstrap DSLA protocol'
).setAction(async (_, { run }) => {
  await run(SUB_TASK_NAMES.SET_CHAINLINK_ENV);
  await run(SUB_TASK_NAMES.BOOTSTRAP_DSLA_PROTOCOL);
});

task(
  TASK_NAMES.SCRIPT_REQUEST_SLI,
  'Request a SLI verification for next verifiable period'
)
  .addOptionalParam(
    'address',
    '(optional) The SLA address. Defaults to last deployed SLA by deployer address'
  )
  .setAction(async (taskArgs, { run }) => {
    await run(SUB_TASK_NAMES.REQUEST_SLI, taskArgs);
  });

task(TASK_NAMES.SCRIPT_REQUEST_ANALYTICS, 'Request network analytics')
  .addParam('periodId', 'Period id to request network analytics')
  .setAction(async (taskArgs, { run }) => {
    await run(SUB_TASK_NAMES.REQUEST_ANALYTICS, taskArgs);
  });

const config: HardhatUserConfig = {
  defaultNetwork: 'develop',
  networks: {
    hardhat: {
      chainId: 1337,
      accounts: {
        mnemonic: process.env.DEVELOP_MNEMONIC,
      },
      saveDeployments: true,
      mining: {
        auto: true,
        // interval: 5000,
      },
      stacktical: {
        web3WebsocketProviderUrl: 'ws://localhost:8545',
        productionChainlinkNode: null,
        developChainlinkNode: {
          funds: '10',
          gasLimit: undefined,
          externalAdapterUrL: null,
          ethUrl: 'ws://host.docker.internal:8545',
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
              periodType: PERIOD_TYPE.WEEKLY,
              amountOfPeriods: 52,
              expiredPeriods: 6,
            },
          ],
          messengersLinkTokenAllowance: '10',
        },
      },
    },
    [NETWORKS.DEVELOP]: {
      chainId: 1337,
      accounts: {
        mnemonic: process.env.DEVELOP_MNEMONIC,
      },
      url: 'http://localhost:8545',
      saveDeployments: true,
      stacktical: {
        web3WebsocketProviderUrl: 'ws://localhost:8545',
        productionChainlinkNode: null,
        developChainlinkNode: {
          funds: '10',
          gasLimit: undefined,
          externalAdapterUrL: null,
          ethUrl: 'ws://host.docker.internal:8545',
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
      },
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
        web3WebsocketProviderUrl: process.env.HARMONYTESTNET_WS_URI,
        productionChainlinkNode: null,
        developChainlinkNode: {
          funds: '0.001',
          gasLimit: undefined,
          externalAdapterUrL: null,
          ethUrl: process.env.HARMONYTESTNET_WS_URI,
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
