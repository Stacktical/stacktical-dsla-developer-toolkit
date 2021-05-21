import { PreCoordinatorConfiguration, StackticalConfiguration } from '../types';
import { DeployOptionsBase } from 'hardhat-deploy/dist/types';
import {
  getChainlinkJob,
  getChainlinkLinkToken,
  setChainlinkEnv,
} from '../chainlinkUtils';
import { toWei } from 'web3-utils';
import { PreCoordinator__factory } from '../typechain';
import { CONTRACT_NAMES, DEPLOYMENT_TAGS } from '../constants';
import { SUB_TASK_NAMES } from '../subtasks';

module.exports = async ({
  getNamedAccounts,
  deployments,
  network,
  ethers,
  web3,
  run,
}) => {
  const { stacktical }: { stacktical: StackticalConfiguration } =
    network.config;
  await run(SUB_TASK_NAMES.SET_CHAINLINK_ENV);
  const { deployer } = await getNamedAccounts();
  const { deploy, get } = deployments;
  const stringUtils = await get(CONTRACT_NAMES.StringUtils);

  const periodRegistry = await get(CONTRACT_NAMES.PeriodRegistry);
  const stakeRegistry = await get(CONTRACT_NAMES.StakeRegistry);

  const baseOptions: DeployOptionsBase = {
    from: deployer,
    log: true,
  };
  const linkToken = await getChainlinkLinkToken();
  await deploy(CONTRACT_NAMES.PreCoordinator, {
    ...baseOptions,
    args: [linkToken],
  });

  const minResponses = 1;
  const job = await getChainlinkJob();
  const preCoordinatorConfiguration: PreCoordinatorConfiguration =
    stacktical.productionChainlinkNode === null
      ? {
          oracles: [job.attributes.initiators[0].params.address],
          jobIds: [web3.utils.padRight('0x' + job.id, 64)],
          payments: [toWei('0.1')],
        }
      : stacktical.productionChainlinkNode.preCoordinatorConfiguration;
  const pc = await get(CONTRACT_NAMES.PreCoordinator);
  const preCoordinator = await PreCoordinator__factory.connect(
    pc.address,
    await ethers.getSigner(deployer)
  );

  const tx = await preCoordinator.createServiceAgreement(
    minResponses,
    preCoordinatorConfiguration.oracles,
    preCoordinatorConfiguration.jobIds,
    preCoordinatorConfiguration.payments
  );
  const receipt = await tx.wait();
  const { saId } = receipt.events[0].args;
  const feeMultiplier = preCoordinatorConfiguration.payments.length;
  await deploy(CONTRACT_NAMES.NetworkAnalytics, {
    ...baseOptions,
    args: [
      preCoordinator.address,
      linkToken,
      saId,
      periodRegistry.address,
      stakeRegistry.address,
      feeMultiplier,
    ],
    libraries: {
      StringUtils: stringUtils.address,
    },
  });
  const networkAnalytics = await get(CONTRACT_NAMES.NetworkAnalytics);
  await deploy(CONTRACT_NAMES.SEMessenger, {
    ...baseOptions,
    args: [
      preCoordinator.address,
      linkToken,
      saId,
      networkAnalytics.address,
      feeMultiplier,
    ],
    libraries: {
      StringUtils: stringUtils.address,
    },
  });
};

module.exports.tags = [DEPLOYMENT_TAGS.DSLA];
