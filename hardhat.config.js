/* eslint-disable import/no-extraneous-dependencies */
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('dotenv').config();
// require('hardhat-docgen');
// require('hardhat-deploy');
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-etherscan');

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
      accounts: {
        mnemonic: process.env.DEVELOP_MNEMONIC,
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
    ],
  },
  // docgen: {
  //   path: './docs',
  //   clear: true,
  //   runOnCompile: true,
  // },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
