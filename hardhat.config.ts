/* eslint-disable import/no-extraneous-dependencies */

require('dotenv').config({ path: './.env' });
import * as StackticalConfigs from './stacktical.config';

import './tasks';
import { NETWORKS } from './constants';
import { extendEnvironment } from 'hardhat/config';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import '@nomiclabs/hardhat-ethers';
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
      forking: {
        url: process.env.POLYGON_URI,
      },
      stacktical: StackticalConfigs[NETWORKS.DEVELOP],
    },
    [NETWORKS.DEVELOP]: {
      chainId: 1337,
      accounts: {
        mnemonic: process.env.DEVELOP_MNEMONIC,
      },
      url: 'http://localhost:8545',
      stacktical: StackticalConfigs[NETWORKS.DEVELOP],
    },
    [NETWORKS.ETHEREUM]: {
      chainId: 1,
      accounts: {
        mnemonic: process.env.MAINNET_MNEMONIC,
      },
      url: process.env.ETHEREUM_URI,
      stacktical: StackticalConfigs[NETWORKS.ETHEREUM],
    },
    [NETWORKS.POLYGON]: {
      chainId: 137,
      gas: 20000000,
      gasPrice: 1000000000,
      accounts: {
        mnemonic: process.env.MAINNET_MNEMONIC,
      },
      url: process.env.POLYGON_URI,
      stacktical: StackticalConfigs[NETWORKS.POLYGON],
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
      stacktical: StackticalConfigs[NETWORKS.HARMONYTESTNET],
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
