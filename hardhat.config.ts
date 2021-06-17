/* eslint-disable import/no-extraneous-dependencies */

require('dotenv').config({ path: './.env' });
import * as DTKConfigs from './dtk.config';

import './tasks';
import './dtk-env-validation';
import { NETWORKS } from './constants';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-web3';
import 'babel-polyfill';
import 'babel-register';
import '@typechain/hardhat';
import './stacktical-plugin';
import './type-extensions';
import { HardhatUserConfig } from 'hardhat/types';

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
      stacktical: DTKConfigs[NETWORKS.DEVELOP],
    },
    [NETWORKS.DEVELOP]: {
      chainId: 1337,
      accounts: {
        mnemonic: process.env.DEVELOP_MNEMONIC,
      },
      url: 'http://localhost:8545',
      stacktical: DTKConfigs[NETWORKS.DEVELOP],
    },
    [NETWORKS.ETHEREUM]: {
      chainId: 1,
      accounts: {
        mnemonic: process.env.MAINNET_MNEMONIC,
      },
      url: process.env.ETHEREUM_URI,
      stacktical: DTKConfigs[NETWORKS.ETHEREUM],
    },
    [NETWORKS.KOVAN]: {
      chainId: 42,
      accounts: {
        mnemonic: process.env.TESTNET_MNEMONIC,
      },
      url: process.env.KOVAN_URI,
      stacktical: DTKConfigs[NETWORKS.KOVAN],
    },
    [NETWORKS.POLYGON]: {
      chainId: 137,
      gas: 19000000,
      gasPrice: 1000000000,
      accounts: {
        mnemonic: process.env.MAINNET_MNEMONIC,
      },
      url: process.env.POLYGON_URI,
      stacktical: DTKConfigs[NETWORKS.POLYGON],
    },
    [NETWORKS.MUMBAI]: {
      chainId: 80001,
      gas: 19000000,
      gasPrice: 1000000000,
      accounts: {
        mnemonic: process.env.TESTNET_MNEMONIC,
      },
      url: process.env.MUMBAI_URI,
      stacktical: DTKConfigs[NETWORKS.MUMBAI],
    },
    [NETWORKS.HARMONY]: {
      chainId: 1666600000,
      gas: 12000000,
      gasPrice: 1000000000,
      accounts: {
        mnemonic: process.env.MAINNET_MNEMONIC,
      },
      url: process.env.HARMONY_URI,
      saveDeployments: true,
      stacktical: DTKConfigs[NETWORKS.HARMONY],
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
      stacktical: DTKConfigs[NETWORKS.HARMONYTESTNET],
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
        version: '0.5.0',
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
  namedAccounts: {
    deployer: {
      default: 0,
    },
    notDeployer: {
      default: 1,
    },
  },
};

// extendEnvironment((env) => {
//   networkFromConfig(env, env.network);
// });
//
// function networkFromConfig(env: HardhatRuntimeEnvironment, network: Network) {
//   network.stacktical = env.network.stacktical;
// }

module.exports = config;
