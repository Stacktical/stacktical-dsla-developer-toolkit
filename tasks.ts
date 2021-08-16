import { task, types } from 'hardhat/config';
import { SUB_TASK_NAMES } from './subtasks';
import { printSeparator } from './utils';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { PARAMS_NAMES } from './constants';

enum TASK_NAMES {
  EXPORT_DATA = 'stacktical:export-data',
  DEPLOY_SLA = 'stacktical:deploy-sla',
  BOOTSTRAP_DSLA_PROTOCOL = 'stacktical:bootstrap',
  REQUEST_SLI = 'stacktical:request-sli',
  RESTART_SERVICES = 'stacktical:restart-services',
  GET_PRECOORDINATOR = 'stacktical:get-precoordinator',
  SET_PRECOORDINATOR = 'stacktical:set-precoordinator',
  CHAINLINK_DOCKER_COMPOSE = 'stacktical:chainlink-docker-compose',
  PREPARE_CHAINLINK_NODES = 'stacktical:prepare-chainlink-nodes',
  FULFILL_SLI = 'stacktical:fulfill-sli',
  INITIALIZE_DEFAULT_ADDRESSES = 'stacktical:initialize-addresses',
  RESTART_CHAINLINK_NODES = 'stacktical:restart-chainlink-nodes',
  CHECK_CONTRACTS_ALLOWANCE = 'stacktical:check-contracts-allowance',
  REGISTRIES_CONFIGURATION = 'stacktical:registries-config',
  GET_VALID_SLAS = 'stacktical:get-valid-slas',
  GET_REVERT_MESSAGE = 'stacktical:get-revert-message',
  DEPLOY_MESSENGER = 'stacktical:deploy-messenger',
  GET_MESSENGER = 'stacktical:get-messenger',
  TRANSFER_OWNERSHIP = 'stacktical:transfer-ownership',
  PROVIDER_WITHDRAW = 'stacktical:provider-withdraw',
  UNLOCK_TOKENS = 'stacktical:unlock-tokens',
  GRAPH_MANIFESTOS = 'stacktical:graph-manifestos',
  GET_SLA_FROM_TX = 'stacktical:get-sla-from-tx',
}

task(
  TASK_NAMES.GRAPH_MANIFESTOS,
  'Unlock value from a finished SLA contract'
).setAction(async (taskArgs, { run }) => {
  await run(SUB_TASK_NAMES.EXPORT_SUBGRAPH_DATA, taskArgs);
  await run(SUB_TASK_NAMES.SETUP_GRAPH_MANIFESTOS, taskArgs);
});

task(TASK_NAMES.UNLOCK_TOKENS, 'Unlock value from a finished SLA contract')
  .addOptionalParam(
    PARAMS_NAMES.SLA_ADDRESS,
    '(optional) The SLA address. Defaults to last deployed SLA by deployer address'
  )
  .setAction(async (taskArgs, { run }) => {
    await run(SUB_TASK_NAMES.UNLOCK_TOKENS, taskArgs);
  });

task(
  TASK_NAMES.GET_SLA_FROM_TX,
  'Get a transaction along with the events of it'
)
  .addParam(PARAMS_NAMES.TRANSACTION_HASH, 'Transaction hash')
  .setAction(async (taskArgs, { run }) => {
    await run(SUB_TASK_NAMES.GET_SLA_FROM_TX, taskArgs);
  });

task(TASK_NAMES.DEPLOY_SLA, 'Deploy customized SLA from stacktical config')
  .addOptionalParam(
    PARAMS_NAMES.INDEX,
    'id of the arrays of SLAs of the deploy_sla stacktical config'
  )
  .setAction(async (taskArgs, { run }) => {
    await run(SUB_TASK_NAMES.DEPLOY_SLA, taskArgs);
  });

task(
  TASK_NAMES.PROVIDER_WITHDRAW,
  'Deploy customized SLA from stacktical config'
)
  .addOptionalParam(
    PARAMS_NAMES.SLA_ADDRESS,
    '(optional) The SLA address. Defaults to last deployed SLA by deployer address'
  )
  .addParam(
    'tokenAddress',
    'Address of the token to withdraw from e.g. DSLA = 0x3aFfCCa64c2A6f4e3B6Bd9c64CD2C969EFd1ECBe in Mainnet'
  )
  .setAction(async (taskArgs, { run }) => {
    await run(SUB_TASK_NAMES.PROVIDER_WITHDRAW, taskArgs);
  });

task(TASK_NAMES.EXPORT_DATA, 'Export data to exported-data folder').setAction(
  async (_, { run }) => {
    await run(SUB_TASK_NAMES.EXPORT_NETWORKS);
    await run(SUB_TASK_NAMES.EXPORT_TO_FRONT_END);
  }
);

task(TASK_NAMES.BOOTSTRAP_DSLA_PROTOCOL, 'Bootstrap DSLA protocol').setAction(
  async (_, { run }) => {
    const bootstrapSubtasks = [
      SUB_TASK_NAMES.BOOTSTRAP_MESSENGER_REGISTRY,
      SUB_TASK_NAMES.BOOTSTRAP_STAKE_REGISTRY,
      SUB_TASK_NAMES.BOOTSTRAP_PERIOD_REGISTRY,
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
    PARAMS_NAMES.SLA_ADDRESS,
    '(optional) The SLA address. Defaults to last deployed SLA by deployer address'
  )
  .addFlag('retry', ' pass the flag retry to trigger the retry mechanism')
  .setAction(async (taskArgs, { run }) => {
    await run(SUB_TASK_NAMES.REQUEST_SLI, taskArgs);
  });

task(
  TASK_NAMES.CHECK_CONTRACTS_ALLOWANCE,
  'Request network analytics'
).setAction(async (_, { run }) => {
  await run(SUB_TASK_NAMES.CHECK_CONTRACTS_ALLOWANCE);
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
  console.log(SUB_TASK_NAMES.STOP_LOCAL_GRAPH_NODE);
  await run(SUB_TASK_NAMES.STOP_LOCAL_GRAPH_NODE);

  console.log(SUB_TASK_NAMES.START_LOCAL_GANACHE);
  await run(SUB_TASK_NAMES.START_LOCAL_GANACHE);
  console.log(SUB_TASK_NAMES.START_LOCAL_IPFS);
  await run(SUB_TASK_NAMES.START_LOCAL_IPFS);
  console.log(SUB_TASK_NAMES.START_LOCAL_GRAPH_NODE);
  await run(SUB_TASK_NAMES.START_LOCAL_GRAPH_NODE);
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
)
  .addParam('id', 'Messenger id of stacktical.messengers')
  .setAction(async (taskArgs, { run }) => {
    printSeparator();
    await run(SUB_TASK_NAMES.SETUP_DOCKER_COMPOSE);
    printSeparator();
    await run(SUB_TASK_NAMES.PREPARE_CHAINLINK_NODES);
    printSeparator();
    await run(SUB_TASK_NAMES.SET_PRECOORDINATOR, taskArgs);
    printSeparator();
    await run(SUB_TASK_NAMES.UPDATE_PRECOORDINATOR, taskArgs);
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
  TASK_NAMES.REGISTRIES_CONFIGURATION,
  'Get registries contracts configuration'
).setAction(async (_, hre: any) => {
  await hre.run(SUB_TASK_NAMES.REGISTRIES_CONFIGURATION);
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

task(TASK_NAMES.GET_VALID_SLAS, 'Get all valid SLAs by network').setAction(
  async (_, hre: any) => {
    await hre.run(SUB_TASK_NAMES.GET_VALID_SLAS);
  }
);

task(TASK_NAMES.GET_REVERT_MESSAGE, 'Get revert message for transaction hash')
  .addParam('transactionHash', 'Transaction hash to get message')
  .setAction(async (taskArgs, hre: any) => {
    await hre.run(SUB_TASK_NAMES.GET_REVERT_MESSAGE, taskArgs);
  });

task(TASK_NAMES.DEPLOY_MESSENGER, 'deploy a messenger in the MessengerRegistry')
  .addParam(
    PARAMS_NAMES.INDEX,
    'Id of the messenger on the messengers list of the network config'
  )
  .setAction(async (taskArgs, hre: any) => {
    await hre.run(SUB_TASK_NAMES.DEPLOY_MESSENGER, taskArgs);
  });

task(TASK_NAMES.GET_MESSENGER, 'get messenger data')
  .addOptionalParam(
    PARAMS_NAMES.INDEX,
    'Id of the messenger on the messengers list of the network config'
  )
  .setAction(async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    await hre.run(SUB_TASK_NAMES.GET_MESSENGER, taskArgs);
  });

task(
  TASK_NAMES.TRANSFER_OWNERSHIP,
  'transfer ownership of core contracts to a owner address'
)
  .addOptionalParam('newOwner', 'address of the new owner')
  .setAction(async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    await hre.run(SUB_TASK_NAMES.TRANSFER_OWNERSHIP, taskArgs);
  });

// task(TASK_NAMES.FULFILL_ANALYTICS, 'Fulfill pendant network analytics')
//   .addParam(
//     'periodId',
//     'Period id of the period to fulfill',
//     undefined,
//     types.int
//   )
//   .addParam(
//     'periodType',
//     'Period type of the period to fulfill',
//     undefined,
//     types.int
//   )
//   .addParam('networkTicker', 'Network ticker of the period to fulfill')
//   .addParam(
//     'nodeName',
//     'Name of the Chainlink node to use to fulfill',
//     undefined,
//     types.string
//   )
//   .addFlag('signTransaction', 'signs the transaction to fulfill the analytics')
//   .setAction(async (taskArgs, hre: any) => {
//     await hre.run(SUB_TASK_NAMES.INITIALIZE_DEFAULT_ADDRESSES);
//     await hre.run(SUB_TASK_NAMES.FULFILL_ANALYTICS, taskArgs);
//   });

// task(TASK_NAMES.PREC_FULFILL_ANALYTICS, 'Prec fulfill analytics')
//   .addParam(
//     'periodId',
//     'Period id of the period to fulfill',
//     undefined,
//     types.int
//   )
//   .addParam(
//     'periodType',
//     'Period type of the period to fulfill',
//     undefined,
//     types.int
//   )
//   .addParam('networkTicker', 'Network ticker of the period to fulfill')
//   .addParam(
//     'nodeName',
//     'Name of the Chainlink node to use to fulfill',
//     undefined,
//     types.string
//   )
//   .addFlag('signTransaction', 'signs the transaction to fulfill the analytics')
//
//   .setAction(async (taskArgs, hre: any) => {
//     await hre.run(SUB_TASK_NAMES.PREC_FULFILL_ANALYTICS, taskArgs);
//   });

module.exports = {};
