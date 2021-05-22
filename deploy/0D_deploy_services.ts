import { SUB_TASK_NAMES } from '../subtasks';
import { DEPLOYMENT_TAGS } from '../constants';
import { StackticalConfiguration } from '../types';

const localServicesSubtasks = [
  SUB_TASK_NAMES.STOP_LOCAL_SERVICES,
  SUB_TASK_NAMES.SETUP_DOCKER_COMPOSE,
  SUB_TASK_NAMES.START_LOCAL_SERVICES,
  SUB_TASK_NAMES.PREPARE_CHAINLINK_NODES,
];

module.exports = async ({ run, network }) => {
  const { stacktical }: { stacktical: StackticalConfiguration } =
    network.config;

  if (stacktical.chainlink.isProduction) {
    console.log(SUB_TASK_NAMES.PREPARE_CHAINLINK_NODES);
    await run(SUB_TASK_NAMES.PREPARE_CHAINLINK_NODES);
  } else {
    for (let subtask of localServicesSubtasks) {
      console.log(subtask);
      await run(subtask);
    }
  }
};
module.exports.tags = [DEPLOYMENT_TAGS.Services];
