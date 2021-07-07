import { DEPLOYMENT_TAGS } from '../constants';
import { SUB_TASK_NAMES } from '../subtasks';

module.exports = async ({ run }) => {
  await run(SUB_TASK_NAMES.INITIALIZE_DEFAULT_ADDRESSES);
};

module.exports.tags = Object.keys(DEPLOYMENT_TAGS);
