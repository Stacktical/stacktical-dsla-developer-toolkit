import { StackticalConfiguration } from '../types';
import { DeployOptionsBase } from 'hardhat-deploy/dist/types';
import { CONTRACT_NAMES, DEPLOYMENT_TAGS } from '../constants';
import { BigNumber } from 'ethers';

module.exports = async ({ getNamedAccounts, deployments, network }) => {
  const { stacktical }: { stacktical: StackticalConfiguration } =
    network.config;
  const { deployer } = await getNamedAccounts();
  const { deploy, get } = deployments;
  const baseOptions: DeployOptionsBase = {
    from: deployer,
    log: true,
  };

  await deploy(CONTRACT_NAMES.StringUtils, baseOptions);
  await deploy(CONTRACT_NAMES.PeriodRegistry, baseOptions);
  await deploy(CONTRACT_NAMES.SLORegistry, baseOptions);
  await deploy(CONTRACT_NAMES.MessengerRegistry, baseOptions);

  const { address: dslaTokenAddress } = await get(CONTRACT_NAMES.DSLA);
  await deploy(CONTRACT_NAMES.StakeRegistry, {
    ...baseOptions,
    args: [dslaTokenAddress],
  });

  const periodRegistry = await get(CONTRACT_NAMES.PeriodRegistry);
  const sloRegistry = await get(CONTRACT_NAMES.SLORegistry);
  const messengerRegistry = await get(CONTRACT_NAMES.MessengerRegistry);
  const stakeRegistry = await get(CONTRACT_NAMES.StakeRegistry);
  const stringUtils = await get(CONTRACT_NAMES.StringUtils);
  await deploy(CONTRACT_NAMES.SLARegistry, {
    ...baseOptions,
    args: [
      sloRegistry.address,
      periodRegistry.address,
      messengerRegistry.address,
      stakeRegistry.address,
      stacktical.checkPastPeriods,
    ],
    libraries: {
      StringUtils: stringUtils.address,
    },
    gasPrice: BigNumber.from(network.config.gas),
    maxFeePerGas: BigNumber.from(network.config.gas).mul(3),
  });
};

module.exports.tags = [DEPLOYMENT_TAGS.DSLA];
