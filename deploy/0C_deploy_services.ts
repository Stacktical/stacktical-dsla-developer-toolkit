import { SUB_TASK_NAMES } from '../subtasks';
import { CONTRACT_NAMES, DEPLOYMENT_TAGS } from '../constants';

const localServicesSubtasks = [
  SUB_TASK_NAMES.SET_CHAINLINK_ENV,
  SUB_TASK_NAMES.STOP_CHAINLINK_NODE,
  SUB_TASK_NAMES.SETUP_DOCKER_COMPOSE,
  SUB_TASK_NAMES.START_CHAINLINK_NODE,
  SUB_TASK_NAMES.PREPARE_CHAINLINK_NODE,
];

module.exports = async ({ run, deployments, getNamedAccounts }) => {
  const { deploy, get } = deployments;
  const { deployer } = await getNamedAccounts();
  await deploy(CONTRACT_NAMES.LinkToken, {
    from: deployer,
    log: true,
  });
  const linkToken = await get(CONTRACT_NAMES.LinkToken);
  await deploy(CONTRACT_NAMES.Oracle, {
    from: deployer,
    args: [linkToken.address],
    log: true,
  });

  for (let subtask of localServicesSubtasks) {
    console.log(subtask);
    await run(subtask);
  }
};
module.exports.tags = [DEPLOYMENT_TAGS.Services];
