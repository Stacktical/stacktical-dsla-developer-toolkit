import { DEPLOYMENT_TAGS } from '../constants';
import { SUB_TASK_NAMES } from '../subtasks';

module.exports = async ({ run }) => {
  await run(SUB_TASK_NAMES.DEPLOY_CHAINLINK_CONTRACTS);
};
module.exports.tags = [DEPLOYMENT_TAGS.Chainlink];
