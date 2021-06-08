import { StackticalConfiguration } from '../types';
import { CONTRACT_NAMES, DEPLOYMENT_TAGS } from '../constants';
import { SUB_TASK_NAMES } from '../subtasks';

module.exports = async ({ getNamedAccounts, deployments, network, run }) => {
  const { stacktical }: { stacktical: StackticalConfiguration } =
    network.config;
  const { deployer } = await getNamedAccounts();
  const { deploy, get } = deployments;
  const stringUtils = await get(CONTRACT_NAMES.StringUtils);
  const periodRegistry = await get(CONTRACT_NAMES.PeriodRegistry);
  const linkToken = await get(CONTRACT_NAMES.LinkToken);

  for (let messenger of stacktical.bootstrap.registry.messengers) {
    const saId = await run(SUB_TASK_NAMES.SET_PRECOORDINATOR, {
      useCaseName: messenger.useCaseName,
    });
    const preCoordinator = await get(CONTRACT_NAMES.PreCoordinator);
    const feeMultiplier = stacktical.chainlink.nodesConfiguration.length;
    await deploy(messenger.contract, {
      from: deployer,
      log: true,
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
  }
};

module.exports.tags = [DEPLOYMENT_TAGS.Messengers];
