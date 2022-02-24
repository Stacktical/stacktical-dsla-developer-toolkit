import { StackticalConfiguration } from '../../types';
import { DeployOptionsBase } from 'hardhat-deploy/dist/types';
import { DeploymentsExtension } from 'hardhat-deploy/dist/types';
import { TASK_NAMES } from '../../tasks';
const hre = require('hardhat');
const compose = require('docker-compose');
const appRoot = require('app-root-path');
const path = require('path');
const consola = require('consola');
const pm2 = require('pm2');
const { deployments, network, getNamedAccounts } = hre;
const { stacktical } = network.config;

export async function fixture() {
  // START LOCAL GANACHE
  await compose.upAll({
    cwd: path.join(`${appRoot.path}/services/ganache/`),
    log: true,
  });
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
      function (err, apps) {
        if (err) {
          consola.error(err);
          return pm2.disconnect();
        }

        pm2.list((err, list) => {
          consola.log(err, list);

          pm2.restart('api', (err, proc) => {
            // Disconnects from PM2
            pm2.disconnect();
          });
        });
      }
    );
  });
  consola.success('Started External Adapter');
  console.log(network);

  // INITIALIZE DEFAULT ADDRESSES
  for (let contractName of Object.keys(stacktical.addresses)) {
    const { getArtifact }: DeploymentsExtension = deployments;

    const artifact = await getArtifact(contractName);
    await deployments.save(contractName, {
      address: stacktical.addresses[contractName],
      abi: artifact.abi,
    });
  }
  for (let token of stacktical.tokens) {
    if (token.address) {
      await deployments.save(token.name, {
        address: token.address,
        abi: token.factory.abi,
      });
    }
  }
  consola.success('Initialized default addresses');

  // DEPLOY DUMMY TOKENS
  const { deployer } = await getNamedAccounts();
  const { deploy } = deployments;

  for (let token of stacktical.tokens) {
    const options: DeployOptionsBase = {
      from: deployer,
      log: true,
      skipIfAlreadyDeployed: true,
      contract: token.factory.name.split('__')[0],
      args: [token.name, token.name],
    };
    await deploy(token.name, options);
  }

  // DEPLOY CHAINLINK CONTRACTS

  // BOOTSTRAP

  // DEPLOY SLAs
}

export async function fixtureTask() {
  await hre.run(TASK_NAMES.RESTART_SERVICES, { network: 'develop' });
  await hre.run('deploy', { network: 'develop', reset: true });
  await hre.run(TASK_NAMES.BOOTSTRAP_DSLA_PROTOCOL, {
    network: 'develop',
  });
  await hre.run(TASK_NAMES.DEPLOY_SLA, { network: 'develop', index: 0 });
  await hre.run(TASK_NAMES.DEPLOY_SLA, { network: 'develop', index: 1 });
  await hre.run(TASK_NAMES.DEPLOY_SLA, { network: 'develop', index: 2 });
  await hre.run(TASK_NAMES.DEPLOY_SLA, { network: 'develop', index: 3 });
  await hre.run(TASK_NAMES.DEPLOY_SLA, { network: 'develop', index: 4 });
}
