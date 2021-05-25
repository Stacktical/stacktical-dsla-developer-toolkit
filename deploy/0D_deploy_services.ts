import { SUB_TASK_NAMES } from '../subtasks';
import { DEPLOYMENT_TAGS } from '../constants';
import { StackticalConfiguration } from '../types';

module.exports = async ({ run, network }) => {
  const { stacktical }: { stacktical: StackticalConfiguration } =
    network.config;

  if (stacktical.chainlink.isProduction) {
    console.log(SUB_TASK_NAMES.PREPARE_CHAINLINK_NODES);
    await run(SUB_TASK_NAMES.PREPARE_CHAINLINK_NODES);
  } else {
    await run(SUB_TASK_NAMES.DEPLOY_LOCAL_SERVICES);
  }
};
module.exports.tags = [DEPLOYMENT_TAGS.Services];