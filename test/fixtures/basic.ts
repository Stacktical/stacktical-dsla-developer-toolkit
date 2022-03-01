import { scripts } from '../../scripts.config';
import { TASK_NAMES } from '../../tasks';
import { SUB_TASK_NAMES } from '../../subtasks';

const hre = require('hardhat');
const consola = require('consola');
const pm2 = require('pm2');

export async function fixture() {
  // Start local ganache docker image
  await hre.run(SUB_TASK_NAMES.START_LOCAL_GANACHE, { network: 'develop' });
  consola.success('Started local ganache');

  // EXTERNAL ADAPTER
  pm2.connect(true, function (err) {
    if (err) {
      consola.error(err);
      process.exit(2);
    }

    pm2.start(
      {
        script: 'services/external-adapter/index.ts',
        name: 'external-adapter',
      },
      function (err) {
        if (err) {
          consola.error(err);
          return pm2.disconnect();
        }
      }
    );
  });
  consola.success('Started External Adapter');

  // WAITING FOR DOCKER
  await new Promise((resolve) => setTimeout(resolve, 3000));

  await hre.run('deploy', { network: 'develop', reset: true });
  consola.success('deployed');

  await hre.run('stacktical:bootstrap', { network: 'develop' });
  consola.success('protocol bootstrapped ');

  for (let index = 0; index < scripts.deploy_sla.length; index++) {
    await hre.run(TASK_NAMES.DEPLOY_SLA, {
      network: 'develop',
      index: index.toString(),
    });
    consola.success(`deployed sla N: ${index}`);
  }
}
