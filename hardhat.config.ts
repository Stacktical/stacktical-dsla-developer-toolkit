/* eslint-disable import/no-extraneous-dependencies */

require('dotenv').config({ path: './.env' });

import './tasks';
import './dtk-env-validation';
import { NETWORKS } from './constants';
import 'hardhat-deploy';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-web3';
import '@nomiclabs/hardhat-etherscan';
import 'babel-polyfill';
import 'babel-register';
import 'hardhat-abi-exporter';
import '@typechain/hardhat';
import './stacktical.validation';
import './type-extensions';
import { HardhatUserConfig } from 'hardhat/types';

const networks = [
  { name: NETWORKS.DEVELOP, enabled: true },
  { name: NETWORKS.KOVAN, enabled: false },
  { name: NETWORKS.MUMBAI, enabled: true },
  { name: NETWORKS.HARMONYTESTNET, enabled: true },
  { name: NETWORKS.ETHEREUM, enabled: true },
  { name: NETWORKS.HARMONY, enabled: true },
  { name: NETWORKS.POLYGON, enabled: true },
];

const getEnabledNetworks = () =>
  networks
    .filter((network) => network.enabled)
    .reduce(
      (r, network) => ({
        ...r,
        [network.name]: require(`./networks/${network.name}.config`)[
          network.name
        ],
      }),
      {}
    );

const config: HardhatUserConfig = {
  networks: getEnabledNetworks(),
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
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  typechain: {
    alwaysGenerateOverloads: false,
  },
  abiExporter: {
    path: './exported-data/abi',
    clear: true,
    spacing: 2,
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
