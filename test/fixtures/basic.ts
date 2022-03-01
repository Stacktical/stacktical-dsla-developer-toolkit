import { scripts } from '../../scripts.config';
import { TASK_NAMES } from '../../tasks';
import { SUB_TASK_NAMES } from '../../subtasks';

const hre = require('hardhat');
const consola = require('consola');
const pm2 = require('pm2');

export async function fixture() {
  // Start local ganache docker image
  consola.success(
    'Started local ganache',
    await hre.run(SUB_TASK_NAMES.START_LOCAL_GANACHE, { network: 'develop' })
  );

  // EXTERNAL ADAPTER
  consola.success(
    'Started External Adapter',
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
    })
  );

  await new Promise((resolve) => setTimeout(resolve, 3000));

  consola.success(
    'deployed',
    await hre.run('deploy', { network: 'develop', reset: true })
  );

  consola.success(
    'protocol bootstrapped ',
    await hre.run('stacktical:bootstrap', { network: 'develop' })
  );

  for (let index = 0; index < scripts.deploy_sla.length; index++) {
    consola.success(
      `deployed sla N: ${index}`,
      await hre.run(TASK_NAMES.DEPLOY_SLA, {
        network: 'develop',
        index: index.toString(),
      })
    );
  }
}
