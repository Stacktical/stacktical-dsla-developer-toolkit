import { task } from 'hardhat/config';
import { SUB_TASK_NAMES } from './subtasks';
import { printSeparator } from './utils';

enum TASK_NAMES {
  EXPORT_DATA = 'stacktical:export-data',
  DEPLOY_SLA = 'stacktical:deploy-sla',
  CREATE_DOCKER_COMPOSE = 'stacktical:docker-compose',
  BOOTSTRAP_DSLA_PROTOCOL = 'stacktical:bootstrap',
  REQUEST_SLI = 'stacktical:request-sli',
  REQUEST_ANALYTICS = 'stacktical:request-analytics',
  RESTART_SERVICES = 'stacktical:restart-services',
  GET_PRECOORDINATOR = 'stacktical:get-precoordinator',
  SET_PRECOORDINATOR = 'stacktical:set-precoordinator',
  PREPARE_PRODUCTION_CHAINLINK_NODES = 'stacktical:production-chainlink',
}

task(
  TASK_NAMES.DEPLOY_SLA,
  'Deploy customized SLA from stacktical config'
).setAction(async (_, { run }) => {
  await run(SUB_TASK_NAMES.DEPLOY_SLA);
});

task(TASK_NAMES.EXPORT_DATA, 'Export data to exported-data folder').setAction(
  async (_, { run }) => {
    await run(SUB_TASK_NAMES.SAVE_CONTRACTS_ADDRESSES);
    await run(SUB_TASK_NAMES.EXPORT_ABIS);
  }
);

task(TASK_NAMES.CREATE_DOCKER_COMPOSE, 'Create docker compose').setAction(
  async (_, { run }) => {
    await run(SUB_TASK_NAMES.SETUP_DOCKER_COMPOSE);
  }
);

task(TASK_NAMES.BOOTSTRAP_DSLA_PROTOCOL, 'Bootstrap DSLA protocol').setAction(
  async (_, { run }) => {
    const bootstrapSubtasks = [
      SUB_TASK_NAMES.BOOTSTRAP_MESSENGER_REGISTRY,
      SUB_TASK_NAMES.BOOTSTRAP_STAKE_REGISTRY,
      SUB_TASK_NAMES.BOOTSTRAP_PERIOD_REGISTRY,
      SUB_TASK_NAMES.BOOTSTRAP_NETWORK_ANALYTICS,
      SUB_TASK_NAMES.SET_CONTRACTS_ALLOWANCE,
    ];
    for (let subtask of bootstrapSubtasks) {
      printSeparator();
      console.log(subtask);
      await run(subtask);
      printSeparator();
    }
  }
);

task(
  TASK_NAMES.REQUEST_SLI,
  'Request a SLI verification for next verifiable period'
)
  .addOptionalParam(
    'address',
    '(optional) The SLA address. Defaults to last deployed SLA by deployer address'
  )
  .setAction(async (taskArgs, { run }) => {
    await run(SUB_TASK_NAMES.REQUEST_SLI, taskArgs);
  });

task(TASK_NAMES.REQUEST_ANALYTICS, 'Request network analytics')
  .addParam('periodId', 'Period id to request network analytics')
  .setAction(async (taskArgs, { run }) => {
    await run(SUB_TASK_NAMES.REQUEST_ANALYTICS, taskArgs);
  });

task(
  TASK_NAMES.RESTART_SERVICES,
  'Deploy or reset the local services (Chainlink NODE, IPFS, Graph protocol node)'
).setAction(async (_, { run }) => {
  console.log(SUB_TASK_NAMES.STOP_LOCAL_SERVICES);
  await run(SUB_TASK_NAMES.STOP_LOCAL_SERVICES);
  console.log(SUB_TASK_NAMES.SETUP_DOCKER_COMPOSE);
  await run(SUB_TASK_NAMES.SETUP_DOCKER_COMPOSE);
  console.log(SUB_TASK_NAMES.START_LOCAL_SERVICES);
  await run(SUB_TASK_NAMES.START_LOCAL_SERVICES);
});

task(
  TASK_NAMES.GET_PRECOORDINATOR,
  'Get the PreCoordinator configuration'
).setAction(async (_, { run }) => {
  await run(SUB_TASK_NAMES.GET_PRECOORDINATOR);
});

task(
  TASK_NAMES.SET_PRECOORDINATOR,
  'Set the PreCoordinator service configuration from stacktical configuration'
).setAction(async (_, { run }) => {
  await run(SUB_TASK_NAMES.PREPARE_CHAINLINK_NODES);
  await run(SUB_TASK_NAMES.SET_PRECOORDINATOR);
  await run(SUB_TASK_NAMES.UPDATE_PRECOORDINATOR);
  await run(SUB_TASK_NAMES.GET_PRECOORDINATOR);
});

task(
  TASK_NAMES.PREPARE_PRODUCTION_CHAINLINK_NODES,
  'Deploys Oracle and LinkToken contracts and creates the proper docker-compose files'
).setAction(async (_, { run }) => {
  await run(SUB_TASK_NAMES.INITIALIZE_DEFAULT_ADDRESSES);
  await run(SUB_TASK_NAMES.DEPLOY_CHAINLINK_CONTRACTS);
  await run(SUB_TASK_NAMES.SETUP_DOCKER_COMPOSE);
});

module.exports = {};
