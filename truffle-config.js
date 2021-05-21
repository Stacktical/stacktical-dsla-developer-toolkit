require('babel-polyfill');
require('babel-register');

require('dotenv').config();
const HDWalletProvider = require('truffle-hdwallet-provider');
const { TruffleProvider } = require('@harmony-js/core');
const { networkNames } = require('./environments');

const {
  INFURA_PROJECT_ID,
  MAINNET_MNEMONIC,
  TESTNET_MNEMONIC,
  DEVELOP_MNEMONIC,
  TESTNET_PRIVATE_KEY_1,
  ETHERSCAN_API_KEY,
} = process.env;

module.exports = {
  networks: {
    [networkNames.DEVELOP]: {
      provider() {
        return new HDWalletProvider(DEVELOP_MNEMONIC, 'http://localhost:8545', 0, 10);
      },
      network_id: '1337',
      gas: 12000000,
    },
    [networkNames.MAINNET]: {
      provider() {
        return new HDWalletProvider(MAINNET_MNEMONIC, `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`);
      },
      network_id: '1',
      networkCheckTimeout: '99999',
      gas: 12000000,
      gasPrice: 120000000000,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    [networkNames.KOVAN]: {
      provider() {
        return new HDWalletProvider(
          TESTNET_MNEMONIC,
          `https://kovan.infura.io/v3/${INFURA_PROJECT_ID}`,
          0,
          10,
        );
      },
      network_id: '42',
      networkCheckTimeout: '99999',
      gas: 12000000,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    [networkNames.MUMBAI]: {
      provider() {
        return new HDWalletProvider(
          TESTNET_MNEMONIC,
          'http://paris.mumbai.sentry.polygon.node.dsla.network:26657',
          0,
          10,
        );
      },
      network_id: 80001,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    [networkNames.HARMONYTESTNET]: {
      network_id: '2', // Any network (default: none)
      provider: () => {
        const truffleProvider = new TruffleProvider(
          'https://api.s0.b.hmny.io',
          TESTNET_MNEMONIC,
        );
        const newAcc = truffleProvider.addByPrivateKey(TESTNET_PRIVATE_KEY_1);
        truffleProvider.setSigner(newAcc);
        return truffleProvider;
      },
      skipDryRun: true,
      gas: 12000000,
      gasPrice: 1000000000,
    },
  },

  mocha: {
    timeout: 1000000,
  },

  compilers: {
    solc: {
      version: '0.6.6',
      settings: {
        optimizer: {
          enabled: true,
          runs: 100,
        },
      },
    },
  },
  plugins: [
    'truffle-plugin-verify',
  ],
  api_keys: {
    etherscan: ETHERSCAN_API_KEY,
  },
};
