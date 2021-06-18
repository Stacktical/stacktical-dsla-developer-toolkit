import { SUB_TASK_NAMES } from '../subtasks';
import { DEPLOYMENT_TAGS } from '../constants';
import { StackticalConfiguration } from '../types';

module.exports = async ({ run, network }) => {
  const { stacktical }: { stacktical: StackticalConfiguration } =
    network.config;

  if (stacktical.chainlink.deployLocal) {
    console.log(SUB_TASK_NAMES.DEPLOY_LOCAL_CHAINLINK_NODES);
    await run(SUB_TASK_NAMES.DEPLOY_LOCAL_CHAINLINK_NODES);
  } else {
    console.log(SUB_TASK_NAMES.PREPARE_CHAINLINK_NODES);
    await run(SUB_TASK_NAMES.PREPARE_CHAINLINK_NODES);
  }
};
module.exports.tags = [DEPLOYMENT_TAGS.Services];
