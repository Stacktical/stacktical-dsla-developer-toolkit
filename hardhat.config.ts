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

const networks = [
  { name: NETWORKS.DEVELOP, enabled: true },
  { name: NETWORKS.KOVAN, enabled: false },
  { name: NETWORKS.MUMBAI, enabled: false },
  { name: NETWORKS.HARMONYTESTNET, enabled: false },
  { name: NETWORKS.ETHEREUM, enabled: false },
  { name: NETWORKS.HARMONY, enabled: false },
  { name: NETWORKS.POLYGON, enabled: false },
];

const config: HardhatUserConfig = {
  networks: networks.reduce(
    (r, network) => ({
      ...r,
      ...(network.enabled && {
        [network.name]: require(`./configurations/${network.name}.config`)[
          network.name
        ],
      }),
    }),
    {}
  ),
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
