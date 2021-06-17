/* eslint-disable import/no-extraneous-dependencies */

require('dotenv').config({ path: './.env' });

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

import { develop } from './configurations/develop.config';
import { ethereum } from './configurations/ethereum.config';
import { kovan } from './configurations/kovan.config';
import { polygon } from './configurations/polygon.config';
import { mumbai } from './configurations/mumbai.config';
import { harmony } from './configurations/harmony.config';
import { harmonytestnet } from './configurations/harmonytestnet.config';

const networks = [
  { name: NETWORKS.DEVELOP, config: develop, enabled: true },
  { name: NETWORKS.KOVAN, config: kovan, enabled: false },
  { name: NETWORKS.MUMBAI, config: mumbai, enabled: false },
  { name: NETWORKS.HARMONYTESTNET, config: harmonytestnet, enabled: false },
  { name: NETWORKS.ETHEREUM, config: ethereum, enabled: false },
  { name: NETWORKS.HARMONY, config: harmony, enabled: false },
  { name: NETWORKS.POLYGON, config: polygon, enabled: false },
];

const config: HardhatUserConfig = {
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
      stacktical: develop.stacktical,
    },
    ...networks.reduce(
      (r, network) => ({
        ...r,
        ...(network.enabled && { [network.name]: network.config }),
      }),
      {}
    ),
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
