require('babel-polyfill');
require('babel-register');

const { toWei } = require('web3-utils');
const { getChainlinkJobId } = require('../utils');
const { getEnvFromNetwork } = require('../environments');

const PeriodRegistry = artifacts.require('PeriodRegistry');
const PreCoordinator = artifacts.require('PreCoordinator');
const StakeRegistry = artifacts.require('StakeRegistry');
const NetworkAnalytics = artifacts.require('NetworkAnalytics');
const SEMessenger = artifacts.require('SEMessenger');
const StringUtils = artifacts.require('StringUtils');

module.exports = (deployer, network) => {
  deployer.then(async () => {
    deployer.link(StringUtils, [NetworkAnalytics, SEMessenger]);

    const envParameters = getEnvFromNetwork(network);
    const periodRegistry = await PeriodRegistry.deployed();
    const stakeRegistry = await StakeRegistry.deployed();

    const preCoordinator = await deployer.deploy(
      PreCoordinator,
      envParameters.linkTokenAddress,
    );

    const minResponses = 1;
    const preCoordinatorConfiguration = envParameters.productionChainlinkNode === null
      ? {
        oracles: [envParameters.oracleAddress],
        jobIds: [await getChainlinkJobId()],
        payments: [toWei('0.1')],
      }
      : envParameters.productionChainlinkNode;
    const receipt = await preCoordinator.createServiceAgreement(
      minResponses,
      preCoordinatorConfiguration.oracles,
      preCoordinatorConfiguration.jobIds,
      preCoordinatorConfiguration.payments,
    );
    const { saId } = receipt.logs[0].args;
    const feeMultiplier = preCoordinatorConfiguration.payments.length;
    const networkAnalytics = await deployer.deploy(
      NetworkAnalytics,
      preCoordinator.address,
      envParameters.linkTokenAddress,
      saId,
      periodRegistry.address,
      stakeRegistry.address,
      feeMultiplier,
    );

    await deployer.deploy(
      SEMessenger,
      preCoordinator.address,
      envParameters.linkTokenAddress,
      saId,
      networkAnalytics.address,
      feeMultiplier,
    );
  });
};
