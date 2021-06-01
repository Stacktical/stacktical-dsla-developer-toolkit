import { task, types } from 'hardhat/config';
import { SUB_TASK_NAMES } from './subtasks';
import { printSeparator } from './utils';
import externalAdapter from './services/external-adapter';

enum TASK_NAMES {
  EXPORT_DATA = 'stacktical:export-data',
  DEPLOY_SLA = 'stacktical:deploy-sla',
  BOOTSTRAP_DSLA_PROTOCOL = 'stacktical:bootstrap',
  REQUEST_SLI = 'stacktical:request-sli',
  REQUEST_ANALYTICS = 'stacktical:request-analytics',
  RESTART_SERVICES = 'stacktical:restart-services',
  GET_PRECOORDINATOR = 'stacktical:get-precoordinator',
  SET_PRECOORDINATOR = 'stacktical:set-precoordinator',
  CHAINLINK_DOCKER_COMPOSE = 'stacktical:chainlink-docker-compose',
  PREPARE_CHAINLINK_NODES = 'stacktical:prepare-chainlink-nodes',
  EXTERNAL_ADAPTER = 'stacktical:external-adapter',
  FULFILL_ANALYTICS = 'stacktical:fulfill-analytics',
  FULFILL_SLI = 'stacktical:fulfill-sli',
  INITIALIZE_DEFAULT_ADDRESSES = 'stacktical:initialize-addresses',
  RESTART_CHAINLINK_NODES = 'stacktical:restart-chainlink-nodes',
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
  TASK_NAMES.PREPARE_CHAINLINK_NODES,
  'Prepare the Chainlink nodes with job config, funds and permissions'
).setAction(async (taskArgs, { run }) => {
  await run(SUB_TASK_NAMES.PREPARE_CHAINLINK_NODES);
});

task(
  TASK_NAMES.RESTART_SERVICES,
  'Deploy or reset the local services (IPFS, Ganache, Graph protocol node)'
).setAction(async (_, { run }) => {
  console.log(SUB_TASK_NAMES.STOP_LOCAL_GANACHE);
  await run(SUB_TASK_NAMES.STOP_LOCAL_GANACHE);
  console.log(SUB_TASK_NAMES.STOP_LOCAL_IPFS);
  await run(SUB_TASK_NAMES.STOP_LOCAL_IPFS);
  console.log(SUB_TASK_NAMES.STOP_LOCAL_GRAPH_NODE);
  await run(SUB_TASK_NAMES.STOP_LOCAL_GRAPH_NODE);

  console.log(SUB_TASK_NAMES.START_LOCAL_GANACHE);
  await run(SUB_TASK_NAMES.START_LOCAL_GANACHE);
  console.log(SUB_TASK_NAMES.START_LOCAL_IPFS);
  await run(SUB_TASK_NAMES.START_LOCAL_IPFS);
  console.log(SUB_TASK_NAMES.START_LOCAL_GRAPH_NODE);
  await run(SUB_TASK_NAMES.START_LOCAL_GRAPH_NODE);
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
  printSeparator();
  await run(SUB_TASK_NAMES.PREPARE_CHAINLINK_NODES);
  printSeparator();
  await run(SUB_TASK_NAMES.SET_PRECOORDINATOR);
  printSeparator();
  await run(SUB_TASK_NAMES.UPDATE_PRECOORDINATOR);
  printSeparator();
  await run(SUB_TASK_NAMES.GET_PRECOORDINATOR);
  printSeparator();
});

task(
  TASK_NAMES.CHAINLINK_DOCKER_COMPOSE,
  'Deploys Oracle and LinkToken contracts and creates the proper docker-compose files'
).setAction(async (_, { run }) => {
  await run(SUB_TASK_NAMES.INITIALIZE_DEFAULT_ADDRESSES);
  await run(SUB_TASK_NAMES.DEPLOY_CHAINLINK_CONTRACTS);
  await run(SUB_TASK_NAMES.SETUP_DOCKER_COMPOSE);
});

task(
  TASK_NAMES.EXTERNAL_ADAPTER,
  'Runs an external adapter from path chainlink-nodes/external-adapter'
).setAction(async (_, hre: any) => {
  process.env.WEB3_URI = hre.network.config.url;
  externalAdapter.listen(6060, () => {
    console.log(`External adapter initialized at http://localhost:${6060}`);
  });
  return new Promise((resolve, reject) => {});
});

task(TASK_NAMES.FULFILL_ANALYTICS, 'Fulfill pendant network analytics')
  .addParam(
    'periodId',
    'Period id of the period to fulfill',
    undefined,
    types.int
  )
  .addParam(
    'periodType',
    'Period type of the period to fulfill',
    undefined,
    types.int
  )
  .addParam('networkTicker', 'Network ticker of the period to fulfill')
  .addParam(
    'nodeName',
    'Name of the Chainlink node to use to fulfill',
    undefined,
    types.string
  )
  .setAction(async (taskArgs, hre: any) => {
    await hre.run(SUB_TASK_NAMES.INITIALIZE_DEFAULT_ADDRESSES);
    await hre.run(SUB_TASK_NAMES.FULFILL_ANALYTICS, taskArgs);
  });

task(TASK_NAMES.FULFILL_SLI, 'Fulfill pendant contract sli')
  .addParam(
    'address',
    'Address of the SLA contract to fulfill sli',
    undefined,
    types.string
  )
  .addParam('periodId', 'Period to use to fulfill sli', undefined, types.string)
  .addParam(
    'nodeName',
    'Name of the Chainlink node to use to fulfill sli',
    undefined,
    types.string
  )
  .setAction(async (taskArgs, hre: any) => {
    await hre.run(SUB_TASK_NAMES.INITIALIZE_DEFAULT_ADDRESSES);
    await hre.run(SUB_TASK_NAMES.FULFILL_SLI, taskArgs);
  });

task(
  TASK_NAMES.INITIALIZE_DEFAULT_ADDRESSES,
  'Initialize default addresses'
).setAction(async (_, hre: any) => {
  await hre.run(SUB_TASK_NAMES.INITIALIZE_DEFAULT_ADDRESSES);
});

task(
  TASK_NAMES.RESTART_CHAINLINK_NODES,
  'Deploy or reset the local chainlink nodes'
).setAction(async (_, hre: any) => {
  console.log(SUB_TASK_NAMES.STOP_LOCAL_CHAINLINK_NODES);
  await hre.run(SUB_TASK_NAMES.STOP_LOCAL_CHAINLINK_NODES);
  console.log(SUB_TASK_NAMES.SETUP_DOCKER_COMPOSE);
  await hre.run(SUB_TASK_NAMES.SETUP_DOCKER_COMPOSE);
  console.log(SUB_TASK_NAMES.START_LOCAL_CHAINLINK_NODES);
  await hre.run(SUB_TASK_NAMES.START_LOCAL_CHAINLINK_NODES);
});

module.exports = {};
