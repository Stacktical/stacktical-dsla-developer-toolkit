import { DEPLOYMENT_TAGS } from '../constants';
import { SUB_TASK_NAMES } from '../subtasks';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

console.log("-- 🚀 Deploying messengers");
module.exports = async ({ network, run }: HardhatRuntimeEnvironment) => {
  const { stacktical } = network.config;

  for (let messenger in stacktical.messengers) {
    await run(SUB_TASK_NAMES.DEPLOY_MESSENGER, {
      index: messenger,
    });
  }
};
console.log("-- 🚀 All Messengers deployed");
module.exports.tags = [DEPLOYMENT_TAGS.Messengers];
