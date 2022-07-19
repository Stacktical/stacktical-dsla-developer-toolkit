import { scripts } from '../../scripts.config';
import { TASK_NAMES } from '../../tasks';
import { SUB_TASK_NAMES } from '../../subtasks';

const hre = require('hardhat');
const consola = require('consola');
const pm2 = require('pm2');
const developmentNetworkName = 'hardhat'

export async function fixture() {
  const networkName = hre.network.name
  const chainId = hre.network.config.chainId

  consola.info("Network name: ", networkName);
  consola.info("Network chain id: ", chainId);

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

  await hre.run('deploy', { network: developmentNetworkName, reset: true });
  consola.success('deployed');

  await hre.run('stacktical:bootstrap', { network: developmentNetworkName });
  consola.success('protocol bootstrapped ');

  await hre.run(SUB_TASK_NAMES.DEPLOY_DETAILS, {
    network: developmentNetworkName,
  });

  for (let index = 0; index < scripts.deploy_sla.length; index++) {
    await hre.run(TASK_NAMES.DEPLOY_SLA, {
      network: developmentNetworkName,
      index: index.toString(),
    });
    consola.success(`deployed sla N: ${index}`);
  }
}
