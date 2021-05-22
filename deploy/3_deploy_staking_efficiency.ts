import {
  ChainlinkNodeConfiguration,
  PreCoordinatorConfiguration,
  StackticalConfiguration,
} from '../types';
import { DeployOptionsBase } from 'hardhat-deploy/dist/types';
import { getChainlinkJob, setChainlinkNode } from '../chainlinkUtils';
import { toWei } from 'web3-utils';
import { PreCoordinator__factory } from '../typechain';
import { CONTRACT_NAMES, DEPLOYMENT_TAGS } from '../constants';

const getPreCoordinatorConfiguration = async (
  nodes: Array<ChainlinkNodeConfiguration>,
  web3
) => {
  const preCoordinatorConfiguration: PreCoordinatorConfiguration = {
    oracles: [],
    jobIds: [],
    payments: [],
  };
  for (let node of nodes) {
    setChainlinkNode(node);
    const job = await getChainlinkJob();
    preCoordinatorConfiguration.payments.push(toWei('0.1'));
    preCoordinatorConfiguration.jobIds.push(
      web3.utils.padRight('0x' + job.id, 64)
    );
    preCoordinatorConfiguration.oracles.push(
      job.attributes.initiators[0].params.address
    );
  }
  return preCoordinatorConfiguration;
};

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
  const { deployer } = await getNamedAccounts();
  const { deploy, get } = deployments;
  const stringUtils = await get(CONTRACT_NAMES.StringUtils);

  const periodRegistry = await get(CONTRACT_NAMES.PeriodRegistry);
  const stakeRegistry = await get(CONTRACT_NAMES.StakeRegistry);

  const baseOptions: DeployOptionsBase = {
    from: deployer,
    log: true,
  };
  const linkToken = await get(CONTRACT_NAMES.LinkToken);
  await deploy(CONTRACT_NAMES.PreCoordinator, {
    ...baseOptions,
    args: [linkToken.address],
  });

  const minResponses = 1;
  const preCoordinatorConfiguration = await getPreCoordinatorConfiguration(
    stacktical.chainlink.nodesConfiguration,
    web3
  );
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
      linkToken.address,
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
      linkToken.address,
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
