/* eslint-disable import/no-extraneous-dependencies */
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('dotenv').config();
require('hardhat-deploy');
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');
require('babel-polyfill');
require('babel-register');

const { networkNames } = require('./environments');

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
      accounts: {
        mnemonic: process.env.DEVELOP_MNEMONIC,
      },
      saveDeployments: true,
      tags: ['LinkToken', 'Oracle'],
    },
    [networkNames.DEVELOP]: {
      chainId: 1337,
      accounts: {
        mnemonic: process.env.DEVELOP_MNEMONIC,
      },
      tags: ['LinkToken', 'Oracle'],
      url: 'http://localhost:8545',
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
    sources: './dev-env/chainlink/contracts',
    deploy: './dev-env/chainlink/contracts-deploy',
    deployments: './dev-env/chainlink/deployments',
    imports: './build/contracts',
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
};
