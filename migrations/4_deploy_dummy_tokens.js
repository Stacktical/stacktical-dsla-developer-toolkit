require('babel-register');
require('babel-polyfill');

const { getEnvFromNetwork } = require('../environments');

const DAI = artifacts.require('DAI');
const USDC = artifacts.require('USDC');

module.exports = (deployer, network) => {
  deployer.then(async () => {
    const envParameters = getEnvFromNetwork(network);
    if (!envParameters.daiTokenAddress) await deployer.deploy(DAI);
    if (!envParameters.usdcTokenAddress) await deployer.deploy(USDC);
  });
};
