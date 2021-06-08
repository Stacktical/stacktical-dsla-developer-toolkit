import { StackticalConfiguration } from '../types';
import { DeployOptionsBase } from 'hardhat-deploy/dist/types';
import { PreCoordinator__factory } from '../typechain';
import { CONTRACT_NAMES, DEPLOYMENT_TAGS } from '../constants';
import { SUB_TASK_NAMES } from '../subtasks';

module.exports = async ({
  getNamedAccounts,
  deployments,
  network,
  ethers,
  run,
}) => {
  const { stacktical }: { stacktical: StackticalConfiguration } =
    network.config;
  const { deployer } = await getNamedAccounts();
  const { deploy, get } = deployments;
  const stringUtils = await get(CONTRACT_NAMES.StringUtils);

  const periodRegistry = await get(CONTRACT_NAMES.PeriodRegistry);

  const baseOptions: DeployOptionsBase = {
    from: deployer,
    log: true,
  };
  const linkToken = await get(CONTRACT_NAMES.LinkToken);
  await deploy(CONTRACT_NAMES.PreCoordinator, {
    ...baseOptions,
    args: [linkToken.address],
  });
  await run(SUB_TASK_NAMES.SET_PRECOORDINATOR);
  const preCoordinator = await PreCoordinator__factory.connect(
    (
      await get(CONTRACT_NAMES.PreCoordinator)
    ).address,
    await ethers.getSigner(deployer)
  );
  const eventFilter = preCoordinator.filters.NewServiceAgreement();
  const precoordinatorArtifact = await get(CONTRACT_NAMES.PreCoordinator);
  const events = await preCoordinator.queryFilter(
    eventFilter,
    precoordinatorArtifact?.receipt?.blockNumber || undefined
  );
  const { saId } = events[0].args;
  const feeMultiplier = stacktical.chainlink.nodesConfiguration.length;
  await deploy(CONTRACT_NAMES.SEMessenger, {
    ...baseOptions,
    args: [
      preCoordinator.address,
      linkToken.address,
      saId,
      feeMultiplier,
      periodRegistry.address,
    ],
    libraries: {
      StringUtils: stringUtils.address,
    },
  });
};

module.exports.tags = [DEPLOYMENT_TAGS.DSLA];
