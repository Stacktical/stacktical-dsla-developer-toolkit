/* eslint-disable no-await-in-loop, import/no-extraneous-dependencies */
import { DeploymentsExtension } from 'hardhat-deploy/dist/types';
import { fromWei, numberToHex, toChecksumAddress, toWei } from 'web3-utils';
import {
  deleteJob,
  getChainlinkAccounts,
  getChainlinkBridges,
  getChainlinkJobs,
  postChainlinkBridge,
  postChainlinkJob,
} from './chainlink-utils';
import { subtask } from 'hardhat/config';
import { ChainlinkNodeConfiguration } from './types';
import {
  ERC20__factory,
  ERC20PresetMinterPauser,
  IMessenger,
  IMessenger__factory,
  MessengerRegistry,
  MessengerRegistry__factory,
  Oracle__factory,
  Ownable__factory,
  PeriodRegistry,
  PeriodRegistry__factory,
  PreCoordinator,
  PreCoordinator__factory,
  SLA,
  SLA__factory,
  SLARegistry,
  SLARegistry__factory,
  StakeRegistry,
  StakeRegistry__factory,
} from './typechain';

import {
  CONTRACT_NAMES,
  GRAPH_NETWORKS,
  NETWORKS,
  PERIOD_STATUS,
  PERIOD_TYPE,
  TOKEN_NAMES,
} from './constants';
import {
  bootstrapStrings,
  generateBootstrapPeriods,
  getIPFSHash,
  getPreCoordinatorConfiguration,
  printSeparator,
} from './utils';
import axios from 'axios';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { formatBytes32String } from 'ethers/lib/utils';

const prettier = require('prettier');
const appRoot = require('app-root-path');
const fs = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');
const compose = require('docker-compose');
const moment = require('moment');
const consola = require('consola');
const Mustache = require('mustache');

export enum SUB_TASK_NAMES {
  PREPARE_CHAINLINK_NODES = 'PREPARE_CHAINLINK_NODES',
  SETUP_DOCKER_COMPOSE = 'SETUP_DOCKER_COMPOSE',
  STOP_LOCAL_CHAINLINK_NODES = 'STOP_LOCAL_CHAINLINK_NODES',
  START_LOCAL_CHAINLINK_NODES = 'START_LOCAL_CHAINLINK_NODES',
  STOP_LOCAL_IPFS = 'STOP_LOCAL_IPFS',
  START_LOCAL_IPFS = 'START_LOCAL_IPFS',
  STOP_LOCAL_GANACHE = 'STOP_LOCAL_GANACHE',
  START_LOCAL_GANACHE = 'START_LOCAL_GANACHE',
  STOP_LOCAL_GRAPH_NODE = 'STOP_LOCAL_GRAPH_NODE',
  START_LOCAL_GRAPH_NODE = 'START_LOCAL_GRAPH_NODE',
  INITIALIZE_DEFAULT_ADDRESSES = 'INITIALIZE_DEFAULT_ADDRESSES',
  EXPORT_NETWORKS = 'EXPORT_NETWORKS',
  EXPORT_SUBGRAPH_DATA = 'EXPORT_SUBGRAPH_DATA',
  EXPORT_TO_FRONT_END = 'EXPORT_TO_FRONT_END',
  SETUP_GRAPH_MANIFESTOS = 'SETUP_GRAPH_MANIFESTOS',
  DEPLOY_SLA = 'DEPLOY_SLA',
  BOOTSTRAP_MESSENGER_REGISTRY = 'BOOTSTRAP_MESSENGER_REGISTRY',
  BOOTSTRAP_PERIOD_REGISTRY = 'BOOTSTRAP_PERIOD_REGISTRY',
  BOOTSTRAP_STAKE_REGISTRY = 'BOOTSTRAP_STAKE_REGISTRY',
  SET_CONTRACTS_ALLOWANCE = 'SET_CONTRACTS_ALLOWANCE',
  REQUEST_SLI = 'REQUEST_SLI',
  GET_PRECOORDINATOR = 'GET_PRECOORDINATOR',
  SET_PRECOORDINATOR = 'SET_PRECOORDINATOR',
  DEPLOY_LOCAL_CHAINLINK_NODES = 'DEPLOY_LOCAL_CHAINLINK_NODES',
  DEPLOY_CHAINLINK_CONTRACTS = 'DEPLOY_CHAINLINK_CONTRACTS',
  UPDATE_PRECOORDINATOR = 'UPDATE_PRECOORDINATOR',
  FULFILL_SLI = 'FULFILL_SLI',
  CHECK_CONTRACTS_ALLOWANCE = 'CHECK_CONTRACTS_ALLOWANCE',
  REGISTRIES_CONFIGURATION = 'REGISTRIES_CONFIGURATION',
  GET_VALID_SLAS = 'GET_VALID_SLAS',
  GET_REVERT_MESSAGE = 'GET_REVERT_MESSAGE',
  DEPLOY_MESSENGER = 'DEPLOY_MESSENGER',
  GET_MESSENGER = 'GET_MESSENGER',
  TRANSFER_OWNERSHIP = 'TRANSFER_OWNERSHIP',
  PROVIDER_WITHDRAW = 'PROVIDER_WITHDRAW',
  UNLOCK_TOKENS = 'UNLOCK_TOKENS',
  GET_SLA_FROM_TX = 'GET_SLA_FROM_TX',
  UPDATE_MESSENGER_SPEC = 'UPDATE_MESSENGER_SPEC',
}

subtask(SUB_TASK_NAMES.GET_SLA_FROM_TX, undefined).setAction(
  async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    const { ethers } = hre;
    const { provider, getContract } = ethers;
    const { getTransactionReceipt } = provider;
    const { transactionHash } = taskArgs;
    const transaction = await getTransactionReceipt(transactionHash);
    const slaRegistry: SLARegistry = await getContract(
      CONTRACT_NAMES.SLARegistry
    );
    const filter = slaRegistry.filters.SLACreated(null, transaction.from);
    const events = await slaRegistry.queryFilter(filter, transaction.blockHash);
    console.log(events);
  }
);

subtask(SUB_TASK_NAMES.UPDATE_MESSENGER_SPEC, undefined).setAction(
  async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    const { network, ethers, getNamedAccounts } = hre;
    const { deployer } = await getNamedAccounts();
    const { stacktical } = network.config;
    const { index } = taskArgs;
    const messenger = stacktical.messengers[index];
    consola.info('Selected Messenger');
    consola.info(messenger);
    const messengerContract = <IMessenger>(
      await ethers.getContract(messenger.contract)
    );
    const messengerRegistry = <MessengerRegistry>(
      await ethers.getContract(CONTRACT_NAMES.MessengerRegistry)
    );
    const filter = messengerRegistry.filters.MessengerRegistered(
      deployer,
      messengerContract.address
    );
    const events = await messengerRegistry.queryFilter(filter);
    const messengerId = events[0].args.id;

    const specificationPath = `${appRoot.path}/contracts/messengers/${messenger.useCaseName}/use-case-spec.json`;
    const messengerSpec = JSON.parse(fs.readFileSync(specificationPath));
    const updatedSpec = {
      ...messengerSpec,
      timestamp: new Date().toISOString(),
    };
    consola.info('New spec');
    consola.info(updatedSpec);
    const seMessengerSpecIPFS = await getIPFSHash(updatedSpec);
    const specUrl = `${process.env.IPFS_URI}/ipfs/${seMessengerSpecIPFS}`;
    consola.info('New specification url');
    consola.info(specUrl);
    const tx = await messengerRegistry.modifyMessenger(specUrl, messengerId);
    await tx.wait();
  }
);

subtask(SUB_TASK_NAMES.UNLOCK_TOKENS, undefined).setAction(
  async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    const { ethers, getNamedAccounts } = hre;
    const { deployer } = await getNamedAccounts();
    const slaRegistry = <SLARegistry>(
      await ethers.getContract(CONTRACT_NAMES.SLARegistry)
    );

    const slaAddress = taskArgs.slaAddress
      ? ethers.utils.getAddress(taskArgs.slaAddress)
      : (await slaRegistry.allSLAs()).slice(-1)[0];
    const slaContract = <SLA>(
      await ethers.getContractAt(CONTRACT_NAMES.SLA, slaAddress)
    );

    printSeparator();
    consola.info('SLA address:', slaContract.address);
    consola.info('Requester address:', deployer);
    const tx = await slaRegistry.returnLockedValue(slaAddress);
    await tx.wait();
    const stakeRegistry = <StakeRegistry>(
      await ethers.getContract(CONTRACT_NAMES.StakeRegistry)
    );
    const filter = stakeRegistry.filters.LockedValueReturned(
      slaAddress,
      deployer
    );
    const query = await stakeRegistry.queryFilter(filter);
    consola.info('DSLA returned:', fromWei(query[0].args.amount.toString()));

    printSeparator();
  }
);

subtask(SUB_TASK_NAMES.PROVIDER_WITHDRAW, undefined).setAction(
  async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    const { ethers, getNamedAccounts } = hre;
    const { deployer } = await getNamedAccounts();
    const slaRegistry = <SLARegistry>(
      await ethers.getContract(CONTRACT_NAMES.SLARegistry)
    );

    const slaAddress = taskArgs.slaAddress
      ? ethers.utils.getAddress(taskArgs.slaAddress)
      : (await slaRegistry.allSLAs()).slice(-1)[0];
    const slaContract = <SLA>(
      await ethers.getContractAt(CONTRACT_NAMES.SLA, slaAddress)
    );

    printSeparator();
    consola.info('SLA address:', slaContract.address);
    consola.info('Requester address:', deployer);
    const LPtokenAddress = await slaContract.dpTokenRegistry(
      taskArgs.tokenAddress
    );
    consola.info('LP token address:', LPtokenAddress);
    const lpToken = <ERC20PresetMinterPauser>(
      await ethers.getContractAt('ERC20PresetMinterPauser', LPtokenAddress)
    );
    const lpTokenUserBalance = await lpToken.balanceOf(deployer);
    consola.info(
      'LP token user balance:',
      fromWei(lpTokenUserBalance.toString())
    );
    // const token = <ERC20PresetMinterPauser>(
    //   await ethers.getContractAt(
    //     'ERC20PresetMinterPauser',
    //     taskArgs.tokenAddress
    //   )
    // );
    const supply = await lpToken.totalSupply();
    consola.info('LP token total supply:', fromWei(supply.toString()));
    const slaProviderPool = await slaContract.providerPool(
      taskArgs.tokenAddress
    );
    const slaUserPool = await slaContract.usersPool(taskArgs.tokenAddress);
    consola.info(
      'SLA provider pool balance:',
      fromWei(slaProviderPool.toString())
    );
    const poolPercentage = lpTokenUserBalance.div(supply).mul(100);
    consola.info('Accrued pool percentage:', poolPercentage.toString() + '%');
    const leverage = await slaContract.leverage();
    consola.info('SLA leverage:', leverage.toString() + 'x');
    const poolSpread = slaProviderPool.sub(slaUserPool.mul(leverage));
    consola.info(
      'Provider pool allowed withdraw amount:',
      fromWei(poolSpread.toString())
    );
    await lpToken.approve(slaAddress, lpTokenUserBalance);
    const accruedBalance = lpTokenUserBalance.mul(slaProviderPool).div(supply);
    const allowedWithdraw = accruedBalance.gt(poolSpread)
      ? poolSpread
      : accruedBalance;
    if (allowedWithdraw.gt(0)) {
      consola.info(
        'User allowed withdraw amount:',
        fromWei(allowedWithdraw.toString())
      );
      await slaContract.withdrawProviderTokens(
        allowedWithdraw,
        taskArgs.tokenAddress
      );
    } else {
      consola.warn('Allowed withdraw amount is 0');
    }
    printSeparator();
  }
);

subtask(SUB_TASK_NAMES.STOP_LOCAL_CHAINLINK_NODES, undefined).setAction(
  async (_, hre: HardhatRuntimeEnvironment) => {
    const { stacktical } = hre.network.config;
    for (let node of stacktical.chainlink.nodesConfiguration) {
      await compose.down({
        cwd: path.join(
          `${appRoot.path}/services/chainlink-nodes/${hre.network.name}-${node.name}/`
        ),
        log: true,
      });
    }
  }
);

subtask(SUB_TASK_NAMES.START_LOCAL_CHAINLINK_NODES, undefined).setAction(
  async (_, hre: HardhatRuntimeEnvironment) => {
    const { stacktical } = hre.network.config;
    for (let node of stacktical.chainlink.nodesConfiguration) {
      await compose.upAll({
        cwd: path.join(
          `${appRoot.path}/services/chainlink-nodes/${hre.network.name}-${node.name}/`
        ),
        log: true,
      });
    }
  }
);

subtask(SUB_TASK_NAMES.START_LOCAL_GANACHE, undefined).setAction(async () => {
  await compose.upAll({
    cwd: path.join(`${appRoot.path}/services/ganache/`),
    log: true,
  });
});

subtask(SUB_TASK_NAMES.STOP_LOCAL_GANACHE, undefined).setAction(async () => {
  await compose.down({
    cwd: path.join(`${appRoot.path}/services/ganache/`),
    log: true,
  });
});

subtask(SUB_TASK_NAMES.START_LOCAL_IPFS, undefined).setAction(async () => {
  await compose.upAll({
    cwd: path.join(`${appRoot.path}/services/ipfs/`),
    log: true,
  });
});

subtask(SUB_TASK_NAMES.STOP_LOCAL_IPFS, undefined).setAction(async () => {
  await compose.down({
    cwd: path.join(`${appRoot.path}/services/ipfs/`),
    log: true,
  });
});

subtask(SUB_TASK_NAMES.START_LOCAL_GRAPH_NODE, undefined).setAction(
  async () => {
    await compose.upAll({
      cwd: path.join(`${appRoot.path}/services/graph-protocol/`),
      log: true,
    });
  }
);

subtask(SUB_TASK_NAMES.STOP_LOCAL_GRAPH_NODE, undefined).setAction(async () => {
  await compose.down({
    cwd: path.join(`${appRoot.path}/services/graph-protocol/`),
    log: true,
  });
  fs.rmSync(`${appRoot.path}/services/graph-protocol/postgres`, {
    recursive: true,
    force: true,
  });
});

subtask(SUB_TASK_NAMES.SETUP_GRAPH_MANIFESTOS, undefined).setAction(
  async () => {
    const networks = fs
      .readdirSync(`${appRoot}/subgraph/networks`)
      .filter((dir) => /.subgraph.json/.test(dir))
      .map((dir) => dir.split('.')[0]);
    for (let network of networks) {
      consola.info('Preparing Graph Protocol manifesto for network ' + network);
      const yamlPath = `${appRoot}/subgraph/networks/${network}.subgraph.yaml`;
      const jsonPath = `${appRoot}/subgraph/networks/${network}.subgraph.json`;
      const specs = JSON.parse(fs.readFileSync(jsonPath));
      fs.copyFileSync(`${appRoot}/subgraph/subgraph.template.yaml`, yamlPath);
      const template = fs.readFileSync(yamlPath, 'utf8');
      const manifesto = Mustache.render(template, specs);
      fs.writeFileSync(yamlPath, manifesto);
    }
    consola.success('Graph Protocol manifestos correctly created');
  }
);

subtask(SUB_TASK_NAMES.SETUP_DOCKER_COMPOSE, undefined).setAction(
  async (_, hre: HardhatRuntimeEnvironment) => {
    const { deployments, network } = hre;
    const { get } = deployments;
    const { stacktical } = network.config;
    const linkToken = await get(CONTRACT_NAMES.LinkToken);

    if (stacktical.chainlink.cleanLocalFolder) {
      const folders = fs
        .readdirSync(`${appRoot.path}/services/chainlink-nodes/`)
        .filter((folder) => new RegExp(`${network.name}`).test(folder));
      for (let folder of folders) {
        fs.rmSync(`${appRoot.path}/services/chainlink-nodes/${folder}`, {
          recursive: true,
        });
      }
    }
    for (let node of stacktical.chainlink.nodesConfiguration) {
      const nodeName = network.name + '-' + node.name;

      const fileContents = fs.readFileSync(
        `${appRoot.path}/services/docker-compose.yaml`,
        'utf8'
      );
      const data = yaml.load(fileContents);
      data.services.chainlink.environment =
        data.services.chainlink.environment.map((envVariable) => {
          switch (true) {
            case /LINK_CONTRACT_ADDRESS/.test(envVariable):
              return `LINK_CONTRACT_ADDRESS=${linkToken.address}`;
            case /ETH_CHAIN_ID/.test(envVariable):
              return `ETH_CHAIN_ID=${network.config.chainId}`;
            case /ETH_URL/.test(envVariable):
              return `ETH_URL=${stacktical.chainlink.ethWsUrl}`;
            case /ETH_HTTP_URL/.test(envVariable):
              return `ETH_HTTP_URL=${
                stacktical.chainlink.ethHttpUrl || (network.config as any).url
              }`;
            case /CHAINLINK_PORT/.test(envVariable):
              return `CHAINLINK_PORT=${node.restApiPort}`;
            default:
              return envVariable;
          }
        });
      data.services.postgres.container_name = `postgres-${nodeName}`;
      data.services.postgres.networks = [`${nodeName}-network`];

      data.services.chainlink.container_name = `chainlink-${nodeName}`;
      data.services.chainlink.networks = [`${nodeName}-network`];

      data.services.chainlink.ports = [
        `${node.restApiPort}:${node.restApiPort}`,
      ];

      data.networks = {
        [`${nodeName}-network`]: {
          name: `${nodeName}-developer-toolkit-network`,
        },
      };

      const yamlStr = yaml.dump(data);
      fs.mkdirSync(`${appRoot.path}/services/chainlink-nodes/${nodeName}/`, {
        recursive: true,
      });
      fs.mkdirSync(
        `${appRoot.path}/services/chainlink-nodes/${nodeName}/chainlink`,
        {
          recursive: true,
        }
      );
      fs.mkdirSync(
        `${appRoot.path}/services/chainlink-nodes/${nodeName}/postgres`,
        {
          recursive: true,
        }
      );

      fs.copyFileSync(
        `${appRoot.path}/services/.api`,
        `${appRoot.path}/services/chainlink-nodes/${nodeName}/chainlink/.api`
      );

      fs.copyFileSync(
        `${appRoot.path}/services/.password`,
        `${appRoot.path}/services/chainlink-nodes/${nodeName}/chainlink/.password`
      );

      fs.writeFileSync(
        `${appRoot.path}/services/chainlink-nodes/${nodeName}/docker-compose.yaml`,
        yamlStr,
        'utf8'
      );
    }
  }
);

subtask(SUB_TASK_NAMES.PREPARE_CHAINLINK_NODES, undefined).setAction(
  async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    const { deployments, network, ethers, getNamedAccounts, web3 } = hre;
    const { deployer } = await getNamedAccounts();
    const { get } = deployments;
    const { stacktical } = network.config;
    const oracle = await get(CONTRACT_NAMES.Oracle);
    function wait(timeout) {
      return new Promise((resolve) => {
        setTimeout(resolve, timeout);
      });
    }

    const updatedBridge = async (
      node: ChainlinkNodeConfiguration,
      useCaseName,
      externalAdapterUrl
    ) => {
      try {
        const bridges = await getChainlinkBridges(node);
        const storedBridge = bridges.find(
          (bridge) => bridge.attributes.name === useCaseName
        );
        if (storedBridge) return storedBridge;
        const httpRequestJobRes = await postChainlinkBridge(
          node,
          useCaseName,
          externalAdapterUrl
        );
        return httpRequestJobRes.data;
      } catch (error) {
        return false;
      }
    };

    const updatedJob = async (node: ChainlinkNodeConfiguration, jobName) => {
      try {
        const postedJobs = await getChainlinkJobs(node);
        const postedJob = postedJobs.find(
          (job) =>
            job.attributes.tasks.some((task) => task.type === jobName) &&
            job.attributes.initiators.some(
              (initiator) =>
                toChecksumAddress(initiator.params.address) === oracle.address
            )
        );
        if (postedJob) {
          if (!stacktical.chainlink.deleteOldJobs) {
            console.log('Keeping existing jobId: ' + postedJob.id);
            return postedJob;
          }
          console.log('Deleting existing jobId: ' + postedJob.id);
          await deleteJob(node, postedJob.id);
        }
        const httpRequestJobRes = await postChainlinkJob(
          node,
          jobName,
          oracle.address
        );
        return httpRequestJobRes.data;
      } catch (error) {
        return false;
      }
    };

    const updatedAddress = async (node: ChainlinkNodeConfiguration) => {
      try {
        const addresses = await getChainlinkAccounts(node);
        if (addresses.length === 0) return false;
        const {
          attributes: { address },
        } = addresses.find((address) => !address.attributes.isFunding);
        return toChecksumAddress(address);
      } catch (error) {
        return false;
      }
    };

    // Create bridge
    console.log('Starting automated configuration for Chainlink nodes...');
    for (let node of stacktical.chainlink.nodesConfiguration) {
      printSeparator();
      console.log('Preparing node: ' + node.name);
      const messengers = taskArgs.index
        ? [stacktical.messengers[taskArgs.index]]
        : stacktical.messengers;
      for (let messenger of messengers) {
        consola.info('Creating use case configuration: ' + messenger.contract);
        let bridge = await updatedBridge(
          node,
          messenger.useCaseName,
          messenger.externalAdapterUrl
        );
        while (!bridge) {
          // eslint-disable-next-line no-await-in-loop
          await wait(5000);
          console.log(
            'Bridge creation in Chainlink node failed, reattempting in 5 seconds'
          );
          // eslint-disable-next-line no-await-in-loop
          bridge = await updatedBridge(
            node,
            messenger.useCaseName,
            messenger.externalAdapterUrl
          );
        }
        console.log(`Bridge created! Bridge ID: ${bridge.id}.`);

        // Create job
        // eslint-disable-next-line global-require
        let job = await updatedJob(node, messenger.useCaseName);
        while (!job) {
          // eslint-disable-next-line no-await-in-loop
          await wait(5000);
          console.log(
            'Job creation in Chainlink node failed, reattempting in 5 seconds'
          );
          // eslint-disable-next-line no-await-in-loop
          job = await updatedJob(node, messenger.useCaseName);
        }
        console.log(`Job created! Job ID: ${job.id}.`);
      }

      // Fund node
      let chainlinkNodeAddress = await updatedAddress(node);
      while (!chainlinkNodeAddress) {
        await wait(5000);
        console.log(
          'Address fetch from Chainlink node failed, reattempting in 5 seconds'
        );
        chainlinkNodeAddress = await updatedAddress(node);
      }
      console.log(`Chainlink Node Address: ${chainlinkNodeAddress}`);
      const { nodeFunds } = stacktical.chainlink;
      const [defaultAccount] = await web3.eth.getAccounts();
      let balance = await web3.eth.getBalance(chainlinkNodeAddress);
      if (Number(web3.utils.fromWei(balance)) < Number(nodeFunds)) {
        await web3.eth.sendTransaction({
          from: defaultAccount,
          to: chainlinkNodeAddress,
          value: web3.utils.toWei(String(nodeFunds), 'ether'),
          ...(network.config.gas !== 'auto' && {
            gasLimit: network.config.gas,
          }),
        });
      }
      balance = await web3.eth.getBalance(chainlinkNodeAddress);
      console.log(
        `Chainlink Node balance: ${web3.utils.fromWei(balance)} ether`
      );

      // Authorize node
      const oracleContract = Oracle__factory.connect(
        oracle.address,
        await ethers.getSigner(deployer)
      );
      let permissions = await oracleContract.getAuthorizationStatus(
        chainlinkNodeAddress
      );
      if (!permissions) {
        const tx = await oracleContract.setFulfillmentPermission(
          chainlinkNodeAddress,
          true,
          {
            ...(network.config.gas !== 'auto' && {
              gasLimit: network.config.gas,
            }),
          }
        );
        await tx.wait();
      }
      permissions = await oracleContract.getAuthorizationStatus(
        chainlinkNodeAddress
      );
      console.log(`Chainlink Node Fullfillment permissions: ${permissions}`);
      console.log('Automated configuration finished for node: ' + node.name);
      printSeparator();
    }
    console.log('Automated configuration finished for all nodes');
  }
);

subtask(SUB_TASK_NAMES.DEPLOY_LOCAL_CHAINLINK_NODES, undefined).setAction(
  async (_, hre: HardhatRuntimeEnvironment) => {
    const localServicesSubtasks = [
      SUB_TASK_NAMES.SETUP_DOCKER_COMPOSE,
      SUB_TASK_NAMES.STOP_LOCAL_CHAINLINK_NODES,
      SUB_TASK_NAMES.START_LOCAL_CHAINLINK_NODES,
      SUB_TASK_NAMES.PREPARE_CHAINLINK_NODES,
    ];
    const { run } = hre;
    for (let subtask of localServicesSubtasks) {
      console.log(subtask);
      await run(subtask);
    }
  }
);

subtask(
  SUB_TASK_NAMES.INITIALIZE_DEFAULT_ADDRESSES,
  'Saves addresses from stacktical config'
).setAction(async (_, hre: HardhatRuntimeEnvironment) => {
  const { deployments, network } = hre;
  const { stacktical } = network.config;
  const { getArtifact }: DeploymentsExtension = deployments;
  for (let contractName of Object.keys(stacktical.addresses)) {
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
});

subtask(SUB_TASK_NAMES.EXPORT_NETWORKS, undefined).setAction(
  async (_, hre: HardhatRuntimeEnvironment) => {
    consola.info('Starting export contracts addresses process');
    const exportedNetworks = [];
    const base_path = `${appRoot}/exported-data`;
    const networks = fs.readdirSync(`${appRoot}/deployments/`);

    for (let network of networks.filter(
      (network) => !['localhost', 'hardhat'].includes(network)
    )) {
      try {
        consola.info('Exporting ' + network + ' data');
        const SLORegistry = JSON.parse(
          fs.readFileSync(`${appRoot}/deployments/${network}/SLORegistry.json`)
        );
        const SLARegistry = JSON.parse(
          fs.readFileSync(`${appRoot}/deployments/${network}/SLARegistry.json`)
        );
        const MessengerRegistry = JSON.parse(
          fs.readFileSync(
            `${appRoot}/deployments/${network}/MessengerRegistry.json`
          )
        );
        const PeriodRegistry = JSON.parse(
          fs.readFileSync(
            `${appRoot}/deployments/${network}/PeriodRegistry.json`
          )
        );
        const StakeRegistry = JSON.parse(
          fs.readFileSync(
            `${appRoot}/deployments/${network}/StakeRegistry.json`
          )
        );
        const PreCoordinator = JSON.parse(
          fs.readFileSync(
            `${appRoot}/deployments/${network}/PreCoordinator.json`
          )
        );
        const StringUtils = JSON.parse(
          fs.readFileSync(`${appRoot}/deployments/${network}/StringUtils.json`)
        );
        const { tokens, messengers } = hre.config.networks[network].stacktical;
        const addresses = {
          SLORegistry: SLORegistry.address,
          SLARegistry: SLARegistry.address,
          MessengerRegistry: MessengerRegistry.address,
          PeriodRegistry: PeriodRegistry.address,
          StakeRegistry: StakeRegistry.address,
          PreCoordinator: PreCoordinator.address,
          StringUtils: StringUtils.address,
          ...tokens.reduce(
            (r, token) => ({
              ...r,
              [token.name + 'Token']: require(appRoot.path +
                '/deployments/' +
                network +
                '/' +
                token.name).address,
            }),
            {}
          ),
          ...messengers.reduce(
            (r, messenger) => ({
              ...r,
              [messenger.contract]: require(appRoot.path +
                '/deployments/' +
                network +
                '/' +
                messenger.contract).address,
            }),
            {}
          ),
        };
        consola.info('Resulting addresses');
        console.log(addresses);
        const prettifiedAddresses = prettier.format(
          `export const ${network} = ` + JSON.stringify(addresses),
          {
            useTabs: false,
            tabWidth: 2,
            singleQuote: true,
            parser: 'typescript',
          }
        );
        fs.writeFileSync(
          path.resolve(__dirname, `${base_path}/${network}.ts`),
          prettifiedAddresses
        );
        exportedNetworks.push(network);
      } catch (error) {
        consola.error('Error getting data for ' + network + ' network');
        consola.error(error.message);
      }
    }
    const exportLines = exportedNetworks.reduce(
      (r, network) => (r += `export {${network}} from './${network}'\n`),
      ''
    );
    const prettifiedIndex = prettier.format(`${exportLines}\n`, {
      useTabs: false,
      tabWidth: 2,
      singleQuote: true,
      parser: 'typescript',
    });
    fs.appendFile(
      path.resolve(__dirname, `${base_path}/index.ts`),
      prettifiedIndex
    );
    consola.success('Contract addresses exported correctly');
  }
);

subtask(SUB_TASK_NAMES.EXPORT_TO_FRONT_END, undefined).setAction(async () => {
  consola.info('Exporting contracts addresses to frontend apps');
  if (fs.existsSync(`${appRoot}/../stacktical-dsla-frontend`)) {
    printSeparator();
    let srcPath = `${appRoot}/exported-data`;
    consola.info('Exporting to Stacktical dApp frontend');
    let destPath = `${appRoot}/../stacktical-dsla-frontend/src/addresses`;
    fs.copySync(srcPath, destPath, { overwrite: true });
    consola.success('Contract address export to Stacktical dApp finished');
    consola.info('Exporting typechain to Stacktical dApp');
    srcPath = `${appRoot}/typechain`;
    destPath = `${appRoot}/../stacktical-dsla-frontend/src/typechain`;
    fs.copySync(srcPath, destPath, { overwrite: true });
    consola.success('Typechain export to Stacktical dApp finished');
  } else {
    printSeparator();
    consola.warn('Stacktical dApp frontend folder not found');
  }
  if (fs.existsSync(`${appRoot}/../dsla-protocol-app`)) {
    printSeparator();
    let srcPath = `${appRoot}/exported-data`;
    consola.info('Exporting to DSLA protocol dApp frontend');
    let destPath = `${appRoot}/../dsla-protocol-app/src/addresses`;
    fs.copySync(srcPath, destPath, { overwrite: true });
    consola.success('Contract address export DSLA protocol dApp finished');
    consola.info('Exporting typechain DSLA protocol dApp');
    srcPath = `${appRoot}/typechain`;
    destPath = `${appRoot}/../dsla-protocol-app/src/typechain`;
    fs.copySync(srcPath, destPath, { overwrite: true });
    consola.success('Typechain export DSLA protocol dApp finished');
  } else {
    printSeparator();
    consola.warn(' DSLA protocol dApp folder not found');
  }
  printSeparator();
});

// subtask(SUB_TASK_NAMES.EXPORT_NETWORKS, undefined).setAction(
//   async (_, hre: HardhatRuntimeEnvironment) => {
//     const { network, deployments } = hre;
//     const { get } = deployments;
//     const { stacktical } = network.config;
//
//     consola.info('Starting export contracts addresses process');
//     const SLORegistry = await get(CONTRACT_NAMES.SLORegistry);
//     const SLARegistry = await get(CONTRACT_NAMES.SLARegistry);
//     const MessengerRegistry = await get(CONTRACT_NAMES.MessengerRegistry);
//     const PeriodRegistry = await get(CONTRACT_NAMES.PeriodRegistry);
//     const StakeRegistry = await get(CONTRACT_NAMES.StakeRegistry);
//     const Details = await get(CONTRACT_NAMES.Details);
//     const PreCoordinator = await get(CONTRACT_NAMES.PreCoordinator);
//     const StringUtils = await get(CONTRACT_NAMES.StringUtils);
//
//     const addresses = {
//       SLORegistry: SLORegistry.address,
//       SLARegistry: SLARegistry.address,
//       MessengerRegistry: MessengerRegistry.address,
//       PeriodRegistry: PeriodRegistry.address,
//       StakeRegistry: StakeRegistry.address,
//       Details: Details.address,
//       PreCoordinator: PreCoordinator.address,
//       StringUtils: StringUtils.address,
//       ...stacktical.tokens.reduce(
//         (r, token) => ({
//           ...r,
//           [token.name + 'Token']: require(appRoot.path +
//             '/deployments/' +
//             network.name +
//             '/' +
//             token.name).address,
//         }),
//         {}
//       ),
//       ...stacktical.messengers.reduce(
//         (r, messenger) => ({
//           ...r,
//           [messenger.contract]: require(appRoot.path +
//             '/deployments/' +
//             network.name +
//             '/' +
//             messenger.contract).address,
//         }),
//         {}
//       ),
//     };
//     consola.info('Resulting addresses');
//     console.log(addresses);
//     const base_path = `${appRoot}/exported-data`;
//     const prettifiedAddresses = prettier.format(
//       `export const ${network.name} = ` + JSON.stringify(addresses),
//       {
//         useTabs: false,
//         tabWidth: 2,
//         singleQuote: true,
//         parser: 'typescript',
//       }
//     );
//     fs.writeFileSync(
//       path.resolve(__dirname, `${base_path}/${network.name}.ts`),
//       prettifiedAddresses
//     );
//
//     const exportLines = networks
//       .filter((network) => network.exportable)
//       .reduce(
//         (r, network) =>
//           (r += `export {${network.name}} from './${network.name}'\n`),
//         ''
//       );
//     const prettifiedIndex = prettier.format(`${exportLines}\n`, {
//       useTabs: false,
//       tabWidth: 2,
//       singleQuote: true,
//       parser: 'typescript',
//     });
//     fs.writeFileSync(
//       path.resolve(__dirname, `${base_path}/index.ts`),
//       prettifiedIndex
//     );
//     consola.success('Contract addresses exported correctly');
//   }
// );

subtask(SUB_TASK_NAMES.EXPORT_SUBGRAPH_DATA, undefined).setAction(async () => {
  consola.info('Starting subgraph json data file creation process');
  const networks = fs.readdirSync(`${appRoot}/deployments/`);
  for (let network of networks.filter(
    (network) => !['localhost', 'hardhat'].includes(network)
  )) {
    consola.info('Exporting ' + network + ' data');
    try {
      const SLORegistry = JSON.parse(
        fs.readFileSync(`${appRoot}/deployments/${network}/SLORegistry.json`)
      );
      const SLARegistry = JSON.parse(
        fs.readFileSync(`${appRoot}/deployments/${network}/SLARegistry.json`)
      );
      const StakeRegistry = JSON.parse(
        fs.readFileSync(`${appRoot}/deployments/${network}/StakeRegistry.json`)
      );

      const MessengerRegistry = JSON.parse(
        fs.readFileSync(
          `${appRoot}/deployments/${network}/MessengerRegistry.json`
        )
      );
      const PeriodRegistry = JSON.parse(
        fs.readFileSync(`${appRoot}/deployments/${network}/PeriodRegistry.json`)
      );

      const data = {
        slaRegistryAddress: SLARegistry.address,
        slaRegistryStartBlock: SLARegistry.receipt.blockNumber,
        sloRegistryAddress: SLORegistry.address,
        sloRegistryStartBlock: SLORegistry.receipt.blockNumber,
        stakeRegistryAddress: StakeRegistry.address,
        stakeRegistryStartBlock: StakeRegistry.receipt.blockNumber,
        messengerRegistryAddress: MessengerRegistry.address,
        messengerRegistryStartBlock: MessengerRegistry.receipt.blockNumber,
        periodRegistryAddress: PeriodRegistry.address,
        periodRegistryStartBlock: PeriodRegistry.receipt.blockNumber,
        graphNetwork: GRAPH_NETWORKS[network],
      };
      consola.info('Resulting data');
      consola.info(data);
      const base_path = `${appRoot}/subgraph/networks`;
      const prettifiedAddresses = prettier.format(JSON.stringify(data), {
        useTabs: false,
        tabWidth: 2,
        singleQuote: true,
        parser: 'json',
      });
      fs.writeFileSync(
        path.resolve(__dirname, `${base_path}/${network}.subgraph.json`),
        prettifiedAddresses
      );
    } catch (error) {
      consola.error('Error getting data for ' + network + ' network');
      consola.error(error.message);
    }
  }

  consola.success('Subgraph json data file creation process finished');
});

subtask(SUB_TASK_NAMES.BOOTSTRAP_STAKE_REGISTRY, undefined).setAction(
  async (_, hre: HardhatRuntimeEnvironment) => {
    const {
      stacktical: { bootstrap, tokens },
    } = hre.network.config;
    const {
      registry: {
        stake: { stakingParameters },
      },
    } = bootstrap;
    const { deployments, ethers, getNamedAccounts, network } = hre;
    const { deployer } = await getNamedAccounts();
    const signer = await ethers.getSigner(deployer);
    const { get } = deployments;

    const [startBootstrap, finishBootstrap] = bootstrapStrings(
      CONTRACT_NAMES.StakeRegistry
    );
    console.log(startBootstrap);

    const stakeRegistryArtifact = await get(CONTRACT_NAMES.StakeRegistry);
    const stakeRegistry = await StakeRegistry__factory.connect(
      stakeRegistryArtifact.address,
      signer
    );

    console.log('Allowing tokens on StakeRegistry');
    for (let token of tokens) {
      console.log('Allowing ' + token.name + ' token');
      const tokenArtifact = await get(token.name);
      const allowedToken = await stakeRegistry.isAllowedToken(
        tokenArtifact.address
      );
      if (allowedToken) {
        console.log(token.name + ' token already allowed');
      } else {
        const tx = await stakeRegistry.addAllowedTokens(tokenArtifact.address);
        await tx.wait();
        console.log(token.name + ' token successfully allowed');
      }
    }

    const currentStakingParameters = await stakeRegistry.getStakingParameters();
    if (stakingParameters && Object.keys(stakingParameters).length > 0) {
      // this parameters are represented in Wei, and the options are specified in Ether i.e. 10^18 wei
      const normalizedParameters = [
        'dslaDepositByPeriod',
        'dslaPlatformReward',
        'dslaMessengerReward',
        'dslaUserReward',
        'dslaBurnedByVerification',
      ];
      const parametersToUpdate = [];
      for (let parameter of Object.keys(stakingParameters)) {
        let normalizedStakingParameter = normalizedParameters.includes(
          parameter
        )
          ? fromWei(currentStakingParameters[parameter].toString())
          : currentStakingParameters[parameter].toString();
        if (normalizedStakingParameter !== stakingParameters[parameter]) {
          parametersToUpdate.push({
            parameter,
            oldValue: normalizedStakingParameter,
            newValue: stakingParameters[parameter],
          });
        }
      }
      // if only 1 parameter is different, then set the parameters and break the loop
      if (parametersToUpdate.length > 0) {
        for (let parameterToUpdate of parametersToUpdate) {
          console.log(
            parameterToUpdate.parameter + ' needs an update on StakeRegistry'
          );
          console.log('Old value: ' + parameterToUpdate.oldValue);
          console.log('New value: ' + parameterToUpdate.newValue);
        }
        console.log('Updating staking parameters');
        const tx = await stakeRegistry.setStakingParameters(
          currentStakingParameters.DSLAburnRate,
          (stakingParameters.dslaDepositByPeriod &&
            toWei(stakingParameters.dslaDepositByPeriod)) ||
            currentStakingParameters.dslaDepositByPeriod,
          (stakingParameters.dslaPlatformReward &&
            toWei(stakingParameters.dslaPlatformReward)) ||
            currentStakingParameters.dslaPlatformReward,
          (stakingParameters.dslaMessengerReward &&
            toWei(stakingParameters.dslaMessengerReward)) ||
            currentStakingParameters.dslaMessengerReward,
          (stakingParameters.dslaUserReward &&
            toWei(stakingParameters.dslaUserReward)) ||
            currentStakingParameters.dslaUserReward,
          (stakingParameters.dslaBurnedByVerification &&
            toWei(stakingParameters.dslaBurnedByVerification)) ||
            currentStakingParameters.dslaBurnedByVerification,
          stakingParameters.maxTokenLength ||
            currentStakingParameters.maxTokenLength,
          stakingParameters.maxLeverage || currentStakingParameters.maxLeverage,
          stakingParameters.burnDSLA !== undefined
            ? stakingParameters.burnDSLA
            : currentStakingParameters.burnDSLA,
          {
            ...(network.config.gas !== 'auto' && {
              gasLimit: network.config.gas,
            }),
          }
        );
        consola.info('Transaction receipt:');
        consola.info(tx);
        await tx.wait();
        const newParameters = await stakeRegistry.getStakingParameters();
        console.log('DSLAburnRate: ' + newParameters.DSLAburnRate.toString());
        console.log(
          'dslaDepositByPeriod: ' +
            fromWei(newParameters.dslaDepositByPeriod.toString())
        );
        console.log(
          'dslaPlatformReward: ' +
            fromWei(newParameters.dslaPlatformReward.toString())
        );
        console.log(
          'dslaMessengerReward: ' +
            fromWei(newParameters.dslaMessengerReward.toString())
        );
        console.log(
          'dslaUserReward: ' + fromWei(newParameters.dslaUserReward.toString())
        );
        console.log(
          'dslaBurnedByVerification: ' +
            fromWei(newParameters.dslaBurnedByVerification.toString())
        );
        console.log(
          'maxTokenLength: ' + newParameters.maxTokenLength.toString()
        );
        console.log('maxLeverage: ' + newParameters.maxLeverage.toString());
        console.log('burnDSLA: ' + newParameters.burnDSLA);
      }
    }
    console.log(finishBootstrap);
  }
);

subtask(SUB_TASK_NAMES.BOOTSTRAP_MESSENGER_REGISTRY, undefined).setAction(
  async (_, hre: HardhatRuntimeEnvironment) => {
    const { deployments, ethers, getNamedAccounts } = hre;
    const { deployer } = await getNamedAccounts();
    const signer = await ethers.getSigner(deployer);
    const { get } = deployments;
    const {
      stacktical: { messengers },
    } = hre.network.config;
    const [startBootstrap, finishBootstrap] = bootstrapStrings(
      CONTRACT_NAMES.MessengerRegistry
    );

    console.log(startBootstrap);
    const slaRegistry = await SLARegistry__factory.connect(
      (
        await get(CONTRACT_NAMES.SLARegistry)
      ).address,
      signer
    );

    const messengerRegistry = await MessengerRegistry__factory.connect(
      (
        await get(CONTRACT_NAMES.MessengerRegistry)
      ).address,
      signer
    );

    for (let messenger of messengers) {
      console.log('Registering ' + messenger.contract + ' on the SLARegistry');
      const messengerArtifact = await get(messenger.contract);
      const specificationPath = `${appRoot.path}/contracts/messengers/${messenger.useCaseName}/use-case-spec.json`;
      const messengerSpec = JSON.parse(fs.readFileSync(specificationPath));
      const updatedSpec = {
        ...messengerSpec,
        timestamp: new Date().toISOString(),
      };
      const seMessengerSpecIPFS = await getIPFSHash(updatedSpec);
      const registeredMessenger = await messengerRegistry.registeredMessengers(
        messengerArtifact.address
      );
      if (!registeredMessenger) {
        const tx = await slaRegistry.registerMessenger(
          messengerArtifact.address,
          `${process.env.IPFS_URI}/ipfs/${seMessengerSpecIPFS}`
        );
        await tx.wait();
      } else {
        console.log(
          messenger.contract + ' already registered on MessengerRegistry'
        );
      }
    }
    console.log(finishBootstrap);
  }
);

subtask(SUB_TASK_NAMES.DEPLOY_MESSENGER, undefined).setAction(
  async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    const { deployments, ethers, getNamedAccounts, network } = hre;
    const { deployer } = await getNamedAccounts();
    const signer = await ethers.getSigner(deployer);
    const { get, deploy } = deployments;
    const { messengers } = network.config.stacktical;
    printSeparator();
    consola.start('Starting automated jobs to register messengers');
    const slaRegistry = await SLARegistry__factory.connect(
      (
        await get(CONTRACT_NAMES.SLARegistry)
      ).address,
      signer
    );

    const messengerRegistry = await MessengerRegistry__factory.connect(
      (
        await get(CONTRACT_NAMES.MessengerRegistry)
      ).address,
      signer
    );

    const messenger = messengers[taskArgs.index];

    consola.info('Deploying ' + messenger.contract + ' to ' + hre.network.name);
    const preCoordinator = await get(CONTRACT_NAMES.PreCoordinator);
    const stakeRegistry = await get(CONTRACT_NAMES.StakeRegistry);
    const stringUtils = await get(CONTRACT_NAMES.StringUtils);
    const periodRegistry = await get(CONTRACT_NAMES.PeriodRegistry);
    const linkToken = await get(CONTRACT_NAMES.LinkToken);
    const feeMultiplier =
      network.config.stacktical.chainlink.nodesConfiguration.length;
    const deployedMessenger = await deploy(messenger.contract, {
      from: deployer,
      log: true,
      args: [
        preCoordinator.address,
        linkToken.address,
        feeMultiplier,
        periodRegistry.address,
        stakeRegistry.address,
        formatBytes32String(network.name),
      ],
      libraries: {
        StringUtils: stringUtils.address,
      },
    });
    if (deployedMessenger.newlyDeployed) {
      consola.success(
        messenger.contract +
          ' successfully deployed at ' +
          deployedMessenger.address
      );
    } else {
      consola.warn(
        messenger.contract + ' already deployed at ' + deployedMessenger.address
      );
    }

    const registeredMessenger = await messengerRegistry.registeredMessengers(
      deployedMessenger.address
    );
    if (!registeredMessenger) {
      consola.info(
        'Registering ' + messenger.contract + ' in MessengerRegistry'
      );
      const specificationPath = `${appRoot.path}/contracts/messengers/${messenger.useCaseName}/use-case-spec.json`;
      const messengerSpec = JSON.parse(fs.readFileSync(specificationPath));
      const updatedSpec = {
        ...messengerSpec,
        timestamp: new Date().toISOString(),
      };
      const seMessengerSpecIPFS = await getIPFSHash(updatedSpec);
      let tx = await slaRegistry.registerMessenger(
        deployedMessenger.address,
        `${process.env.IPFS_URI}/ipfs/${seMessengerSpecIPFS}`
      );
      await tx.wait();
      consola.success(
        messenger.contract +
          ' messenger successfully registered on the MessengerRegistry'
      );
      await hre.run(SUB_TASK_NAMES.SET_PRECOORDINATOR, {
        index: taskArgs.index,
      });
      consola.info('Creating saId in messenger ' + messenger.contract);
      await hre.run(SUB_TASK_NAMES.UPDATE_PRECOORDINATOR, {
        index: taskArgs.index,
      });
    } else {
      consola.warn(
        messenger.contract + ' already registered on MessengerRegistry'
      );
    }
    consola.ready(
      'Finishing automated jobs to register messenger: ' + messenger.contract
    );
    printSeparator();
  }
);

subtask(SUB_TASK_NAMES.BOOTSTRAP_PERIOD_REGISTRY, undefined).setAction(
  async (_, hre: HardhatRuntimeEnvironment) => {
    const {
      stacktical: { bootstrap },
    } = hre.network.config;
    const {
      registry: { periods },
    } = bootstrap;
    const { deployments, ethers, getNamedAccounts } = hre;
    const { deployer } = await getNamedAccounts();
    const signer = await ethers.getSigner(deployer);

    const { get } = deployments;

    const [startBootstrap, finishBootstrap] = bootstrapStrings(
      CONTRACT_NAMES.PeriodRegistry
    );
    console.log(startBootstrap);

    const periodRegistryArtifact = await get(CONTRACT_NAMES.PeriodRegistry);
    const periodRegistry = await PeriodRegistry__factory.connect(
      periodRegistryArtifact.address,
      signer
    );

    console.log('Initializing periods');
    for (let period of periods) {
      const { periodType, amountOfPeriods, expiredPeriods } = period;
      let initializedPeriod = await periodRegistry.isInitializedPeriod(
        periodType
      );

      if (initializedPeriod) {
        console.log(
          PERIOD_TYPE[periodType] + ' period type already initialized'
        );
        continue;
      }

      const [periodStarts, periodEnds] = generateBootstrapPeriods(
        periodType,
        amountOfPeriods,
        expiredPeriods
      );
      const periodStartsDate = periodStarts.map((date) =>
        moment(date * 1000)
          .utc(0)
          .format('DD/MM/YYYY HH:mm:ss')
      );
      const periodEndsDate = periodEnds.map((date) =>
        moment(date * 1000)
          .utc(0)
          .format('DD/MM/YYYY HH:mm:ss')
      );
      console.log(
        'Periods generated for ' + PERIOD_TYPE[periodType] + ' period type:'
      );
      console.log(periodStartsDate, periodEndsDate);
      console.log(periodStarts, periodEnds);
      let tx = await periodRegistry.initializePeriod(
        periodType,
        periodStarts,
        periodEnds
      );
      await tx.wait();
    }

    console.log(finishBootstrap);
  }
);

subtask(SUB_TASK_NAMES.SET_CONTRACTS_ALLOWANCE, undefined).setAction(
  async (_, hre: HardhatRuntimeEnvironment) => {
    const {
      stacktical: { bootstrap },
    } = hre.network.config;
    const { allowance } = bootstrap;
    const { deployments, ethers, getNamedAccounts } = hre;
    const { deployer } = await getNamedAccounts();
    const signer = await ethers.getSigner(deployer);
    const { get } = deployments;

    console.log('Setting allowance to contracts');
    for (let tokenAllowance of allowance) {
      console.log(
        'Setting allowance of ' +
          tokenAllowance.allowance +
          ' ' +
          tokenAllowance.token +
          ' for ' +
          tokenAllowance.contract +
          '  '
      );
      const token = await ERC20__factory.connect(
        (
          await get(tokenAllowance.token)
        ).address,
        signer
      );
      const contract = await get(tokenAllowance.contract);
      let tx = await token.approve(
        contract.address,
        toWei(tokenAllowance.allowance)
      );
      await tx.wait();
    }
    console.log('Alowance setted to contracts');
  }
);

subtask(SUB_TASK_NAMES.DEPLOY_SLA, undefined).setAction(
  async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    const {
      deployments,
      ethers,
      getNamedAccounts,
      network: {
        config: {
          stacktical: { scripts },
        },
      },
    } = hre;
    const { deployer, notDeployer } = await getNamedAccounts();
    consola.info('deployer', deployer);
    consola.info('notDeployer', notDeployer);
    const signer = await ethers.getSigner(deployer);
    const { get } = deployments;
    const { stacktical } = hre.network.config;
    console.log('Starting SLA deployment process');
    const { deploy_sla } = scripts;
    const slaConfigs = taskArgs.index
      ? [deploy_sla[taskArgs.index]]
      : deploy_sla;
    for (let config of slaConfigs) {
      printSeparator();
      console.log('Deploying SLA:');
      console.log(config);
      const {
        serviceMetadata,
        sloValue,
        sloType,
        whitelisted,
        periodType,
        initialPeriodId,
        finalPeriodId,
        extraData,
        leverage,
        initialTokenSupply,
        initialTokenSupplyDivisor,
        deployerStakeTimes,
        notDeployerStakeTimes,
      } = config;
      const stakeAmount =
        Number(initialTokenSupply) / initialTokenSupplyDivisor;
      const stakeAmountTimesWei = (times) => toWei(String(stakeAmount * times));
      const messenger: IMessenger = await ethers.getContract(
        config.messengerContract
      );
      const ipfsHash = await getIPFSHash(serviceMetadata);
      const stakeRegistryArtifact = await get(CONTRACT_NAMES.StakeRegistry);
      const dslaTokenArtifact = await get(CONTRACT_NAMES.DSLA);
      const slaRegistryArtifact = await get(CONTRACT_NAMES.SLARegistry);
      const dslaTokenConfig = stacktical.tokens.find(
        (token) => token.name === TOKEN_NAMES.DSLA
      );
      const dslaToken = await dslaTokenConfig.factory.connect(
        dslaTokenArtifact.address,
        signer
      );
      const stakeRegistry = await StakeRegistry__factory.connect(
        stakeRegistryArtifact.address,
        signer
      );
      const slaRegistry = await SLARegistry__factory.connect(
        slaRegistryArtifact.address,
        signer
      );
      console.log(
        'Starting process 1: Allowance on Stake registry to deploy SLA'
      );
      const { dslaDepositByPeriod } =
        await stakeRegistry.callStatic.getStakingParameters();
      const dslaDeposit = toWei(
        String(
          Number(fromWei(dslaDepositByPeriod.toString())) *
            (finalPeriodId - initialPeriodId + 1)
        )
      );
      let tx = await dslaToken.approve(stakeRegistry.address, dslaDeposit);
      await tx.wait();

      console.log('Starting process 2: Deploy SLA');
      tx = await slaRegistry.createSLA(
        sloValue * Number(await messenger.messengerPrecision()),
        sloType,
        whitelisted,
        messenger.address,
        periodType,
        initialPeriodId,
        finalPeriodId,
        ipfsHash,
        extraData,
        leverage,
        {
          ...(hre.network.config.gas !== 'auto' && {
            gasLimit: hre.network.config.gas,
          }),
        }
      );
      await tx.wait();

      const slaAddresses = await slaRegistry.userSLAs(deployer);
      const sla = await SLA__factory.connect(
        slaAddresses[slaAddresses.length - 1],
        signer
      );

      console.log(`SLA address: ${slaAddresses[slaAddresses.length - 1]}`);

      tx = await sla.addAllowedTokens(dslaToken.address);
      await tx.wait();

      console.log('Starting process 3: Stake on deployer and notOwner pools');

      const deployerStake = stakeAmountTimesWei(deployerStakeTimes);
      console.log(
        `Starting process 3.1: deployer: ${fromWei(deployerStake)} DSLA`
      );
      tx = await dslaToken.approve(sla.address, deployerStake);
      await tx.wait();
      tx = await sla.stakeTokens(deployerStake, dslaToken.address);
      await tx.wait();
      const notDeployerBalance = await dslaToken.callStatic.balanceOf(
        notDeployer
      );
      const notDeployerStake = stakeAmountTimesWei(notDeployerStakeTimes);
      if (fromWei(notDeployerStake) > fromWei(notDeployerBalance.toString())) {
        tx = await dslaToken.transfer(notDeployer, notDeployerStake);
        await tx.wait();
      }
      console.log(
        `Starting process 3.2: notDeployer: ${fromWei(notDeployerStake)} DSLA`
      );
      tx = await dslaToken
        .connect(await ethers.getSigner(notDeployer))
        .approve(sla.address, notDeployerStake);
      await tx.wait();
      tx = await sla
        .connect(await ethers.getSigner(notDeployer))
        .stakeTokens(notDeployerStake, dslaToken.address);
      await tx.wait();
      printSeparator();
    }
    console.log('SLA deployment process finished');
  }
);

subtask(SUB_TASK_NAMES.REQUEST_SLI, undefined).setAction(
  async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    const { deployments, ethers, getNamedAccounts, network } = hre;
    const { deployer } = await getNamedAccounts();
    const signer = await ethers.getSigner(deployer);
    const { get } = deployments;
    const slaRegistry = await SLARegistry__factory.connect(
      (
        await get(CONTRACT_NAMES.SLARegistry)
      ).address,
      signer
    );

    const slaAddress = taskArgs.slaAddress
      ? ethers.utils.getAddress(taskArgs.slaAddress)
      : (await slaRegistry.userSLAs(deployer)).slice(-1)[0];

    if (!slaAddress) {
      throw new Error('No SLAs deployed to the network yet!');
    }
    const sla = await SLA__factory.connect(slaAddress, signer);

    const nextVerifiablePeriod = await sla.nextVerifiablePeriod();
    console.log(
      'Starting SLI request process for period ' +
        nextVerifiablePeriod.toString()
    );
    console.log(`SLA address: ${slaAddress}`);
    const ownerApproval = true;
    let tx;
    if (taskArgs.retry) {
      console.log('Retrying request...');
      const messenger = IMessenger__factory.connect(
        await sla.messengerAddress(),
        await ethers.getSigner(deployer)
      );
      tx = await messenger.retryRequest(slaAddress, nextVerifiablePeriod);
    } else {
      console.log('Requesting SLI...');
      tx = await slaRegistry.requestSLI(
        Number(nextVerifiablePeriod),
        sla.address,
        ownerApproval,
        {
          ...(network.config.gas !== 'auto' && {
            gasLimit: network.config.gas,
          }),
        }
      );
    }
    console.log('Transaction receipt: ');
    console.log(tx);
    await tx.wait();
    await new Promise((resolve) => sla.on('SLICreated', () => resolve(null)));
    const createdSLI = await sla.periodSLIs(nextVerifiablePeriod);
    const { timestamp, sli, status } = createdSLI;
    console.log('Created SLI timestamp: ', timestamp.toString());
    console.log('Created SLI sli: ', sli.toString());
    console.log('Created SLI status: ', PERIOD_STATUS[status]);
    console.log('SLI request process finished');
  }
);

subtask(SUB_TASK_NAMES.GET_PRECOORDINATOR, undefined).setAction(
  async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    const { deployments, ethers, getNamedAccounts } = hre;
    const { deployer } = await getNamedAccounts();
    const signer = await ethers.getSigner(deployer);
    const { get } = deployments;

    console.log('Getting Chainlink config from PreCoordinator contract');

    const precoordinator = <PreCoordinator>(
      await ethers.getContract(CONTRACT_NAMES.PreCoordinator)
    );
    const eventsFilter = precoordinator.filters.NewServiceAgreement();
    const events = await precoordinator.queryFilter(
      eventsFilter,
      (await get(CONTRACT_NAMES.PreCoordinator))?.receipt?.blockNumber ||
        undefined
    );
    for (let event of events) {
      printSeparator();
      const { saId, payment, minresponses } = event.args;
      console.log('Service agreement blockNumber: ' + event.blockNumber);
      console.log('Service agreement ID: ' + saId);
      console.log(
        'Service agreement payment: ' +
          ethers.utils.formatEther(payment) +
          ' LINK'
      );
      console.log('Service agreement minresponses: ' + minresponses);
      const serviceAgreement = await precoordinator.getServiceAgreement(saId);
      console.log('Service agreement jobIds array: ');
      console.log(serviceAgreement.jobIds);
      console.log('Service agreement oracles array: ');
      console.log(serviceAgreement.oracles);
      console.log('Service agreement payments array: ');
      console.log(
        serviceAgreement.payments.map((payment) =>
          ethers.utils.formatEther(payment)
        )
      );
      printSeparator();
    }
  }
);

subtask(SUB_TASK_NAMES.SET_PRECOORDINATOR, undefined).setAction(
  async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    const { deployments, ethers, getNamedAccounts, network } = hre;
    const { deployer } = await getNamedAccounts();
    const signer = await ethers.getSigner(deployer);
    const { get } = deployments;
    const { stacktical } = network.config;
    console.log('Setting Chainlink config on PreCoordinator contract');
    console.log('Nodes configuration from stacktical config:');
    console.log(stacktical.chainlink.nodesConfiguration);
    const oracle = await get(CONTRACT_NAMES.Oracle);
    const messenger = stacktical.messengers[taskArgs.index];
    for (let node of stacktical.chainlink.nodesConfiguration) {
      const jobs = await getChainlinkJobs(node);
      const job = jobs.find(
        (postedJob) =>
          postedJob.attributes.tasks.some(
            (task) => task.type === messenger.useCaseName
          ) &&
          postedJob.attributes.initiators.some(
            (initiator) =>
              toChecksumAddress(initiator.params.address) === oracle.address
          )
      );
      if (!job) {
        await hre.run(SUB_TASK_NAMES.PREPARE_CHAINLINK_NODES, {
          index: taskArgs.index,
        });
      }
    }
    const preCoordinatorConfiguration = await getPreCoordinatorConfiguration(
      stacktical.chainlink.nodesConfiguration,
      messenger.useCaseName,
      oracle.address
    );
    console.log('PreCoordinator configuration from nodes information:');
    console.log(preCoordinatorConfiguration);
    const precoordinator = await PreCoordinator__factory.connect(
      (
        await get(CONTRACT_NAMES.PreCoordinator)
      ).address,
      signer
    );
    const minResponses = 1;
    const tx = await precoordinator.createServiceAgreement(
      minResponses,
      preCoordinatorConfiguration.oracles,
      preCoordinatorConfiguration.jobIds,
      preCoordinatorConfiguration.payments
    );
    const receipt = await tx.wait();
    console.log('Service agreement created: ');
    console.log(receipt.events[0].args);
    return receipt.events[0].args.saId;
  }
);

subtask(SUB_TASK_NAMES.DEPLOY_CHAINLINK_CONTRACTS, undefined).setAction(
  async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    const { deploy, get } = hre.deployments;
    const { deployer } = await hre.getNamedAccounts();

    await deploy(CONTRACT_NAMES.LinkToken, {
      from: deployer,
      log: true,
      skipIfAlreadyDeployed: true,
    });

    const linkToken = await get(CONTRACT_NAMES.LinkToken);
    await deploy(CONTRACT_NAMES.Oracle, {
      from: deployer,
      args: [linkToken.address],
      log: true,
      skipIfAlreadyDeployed: true,
    });

    await deploy(CONTRACT_NAMES.PreCoordinator, {
      from: deployer,
      log: true,
      args: [linkToken.address],
    });
  }
);

subtask(SUB_TASK_NAMES.UPDATE_PRECOORDINATOR, undefined).setAction(
  async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    const { get } = hre.deployments;
    const { deployer } = await hre.getNamedAccounts();
    const signer = await hre.ethers.getSigner(deployer);
    const { stacktical } = hre.network.config;
    const precoordinator = await PreCoordinator__factory.connect(
      (
        await get(CONTRACT_NAMES.PreCoordinator)
      ).address,
      signer
    );
    let eventFilter = precoordinator.filters.NewServiceAgreement();
    let events = await precoordinator.queryFilter(
      eventFilter,
      (await get(CONTRACT_NAMES.PreCoordinator))?.receipt?.blockNumber ||
        undefined
    );
    const lastEvent = events.slice(-1)[0];
    const { saId } = lastEvent.args;
    const serviceAgreement = await precoordinator.getServiceAgreement(saId);
    const messengerName = stacktical.messengers[taskArgs.index].contract;
    const messenger = await IMessenger__factory.connect(
      (
        await get(messengerName)
      ).address,
      signer
    );

    let tx = await messenger.setChainlinkJobID(
      saId,
      serviceAgreement.payments.length
    );
    await tx.wait();
    consola.success('Service agreeement id updated in ' + messengerName);
    console.log(saId);
  }
);

subtask(SUB_TASK_NAMES.CHECK_CONTRACTS_ALLOWANCE, undefined).setAction(
  async (_, hre: HardhatRuntimeEnvironment) => {
    const { deployments, ethers, getNamedAccounts, network } = hre;
    const { stacktical } = network.config;
    const {
      bootstrap: { allowance },
    } = stacktical;
    const { get } = deployments;
    const { deployer } = await getNamedAccounts();
    const signer = await ethers.getSigner(deployer);
    for (let tokenAllowance of allowance) {
      console.log(
        'Getting allowance of ' +
          tokenAllowance.token +
          ' for ' +
          tokenAllowance.contract
      );
      const token = await ERC20__factory.connect(
        (
          await get(tokenAllowance.token)
        ).address,
        signer
      );
      const contract = Ownable__factory.connect(
        (await get(tokenAllowance.contract)).address,
        signer
      );
      const owner = await contract.owner();
      let allowance = await token.allowance(owner, contract.address);
      console.log('Allowance: ' + fromWei(allowance.toString()));
      const ownerBalance = await token.balanceOf(owner);
      console.log('Allower address: ' + owner);
      console.log('Allower balance: ' + fromWei(ownerBalance.toString()));
    }
  }
);

subtask(SUB_TASK_NAMES.FULFILL_SLI, undefined).setAction(
  async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    throw new Error('Not implemented yet');
    // const { deployments, ethers, getNamedAccounts, run, network } = hre;
    // const { stacktical }: { stacktical: StackticalConfiguration } =
    //   network.config;
    // await run(SUB_TASK_NAMES.INITIALIZE_DEFAULT_ADDRESSES);
    // const { get } = deployments;
    // const { deployer } = await getNamedAccounts();
    // const signer = await ethers.getSigner(deployer);
    // const seMessenger = await SEMessenger__factory.connect(
    //   (
    //     await get(CONTRACT_NAMES.BaseMessenger)
    //   ).address,
    //   signer
    // );
    // const { periodId, periodType } = taskArgs;
    //
    // let seFilter = seMessenger.filters.ChainlinkRequested();
    // let seEvents = await seMessenger.queryFilter(seFilter);
    // let sliRequestedEvent;
    // for (let event of seEvents) {
    //   const { id } = event.args;
    //   const sliRequestEvent = await seMessenger.requestIdToSLIRequest(id);
    //   if (
    //     sliRequestEvent.periodId == taskArgs.periodId &&
    //     sliRequestEvent.slaAddress === taskArgs.address
    //   ) {
    //     sliRequestedEvent = event;
    //   }
    // }
    // if (sliRequestedEvent === undefined)
    //   throw new Error('Request id not found');
    // const chainlinkNodeConfig: ChainlinkNodeConfiguration =
    //   stacktical.chainlink.nodesConfiguration.find(
    //     (node) => node.name === taskArgs.nodeName
    //   );
    // if (!chainlinkNodeConfig)
    //   throw new Error('Chainlink node config not found');
    // const externalAdapterUrl = stacktical.chainlink.deployLocal
    //   ? chainlinkNodeConfig.externalAdapterUrl
    //   : 'http://localhost:' +
    //     chainlinkNodeConfig.externalAdapterUrl.split(':').slice(-1)[0];
    // const networkAnalytics = await NetworkAnalytics__factory.connect(
    //   (
    //     await get(CONTRACT_NAMES.NetworkAnalytics)
    //   ).address,
    //   signer
    // );
    // const { data } = await axios({
    //   method: 'post',
    //   url: `${externalAdapterUrl}`,
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   // eslint-disable-next-line global-require,import/no-dynamic-require
    //   data: {
    //     data: {
    //       job_type: 'staking_efficiency',
    //       network_analytics_address: networkAnalytics.address,
    //       period_id: taskArgs.periodId,
    //       sla_address: toChecksumAddress(taskArgs.address),
    //     },
    //   },
    // });
    // const { result } = data.data;
    // const preCoordinator = await PreCoordinator__factory.connect(
    //   (
    //     await get(CONTRACT_NAMES.PreCoordinator)
    //   ).address,
    //   signer
    // );
    // const saRequestedFilter = preCoordinator.filters.ChainlinkRequested();
    // const saRequestedEvents = await preCoordinator.queryFilter(
    //   saRequestedFilter
    // );
    // const oracleRequestId = saRequestedEvents.find(
    //   (event) => event.blockNumber === sliRequestedEvent.blockNumber
    // ).args.id;
    // const job = await getChainlinkJob(chainlinkNodeConfig);
    // const oracle = await Oracle__factory.connect(
    //   job.attributes.initiators[0].params.address,
    //   signer
    // );
    // const oracleRqFilter = oracle.filters.OracleRequest();
    // const oracleRqEvents = await oracle.queryFilter(oracleRqFilter);
    // const oracleRqEvent = oracleRqEvents.find(
    //   (event) => event.args.requestId === oracleRequestId
    // );
    // const preCoordinatorCallbackId = '0x6a9705b4';
    //
    // await oracle.fulfillOracleRequest(
    //   oracleRequestId,
    //   String(0.1 * 10 ** 18),
    //   preCoordinator.address,
    //   preCoordinatorCallbackId,
    //   oracleRqEvent.args.cancelExpiration,
    //   '0x' + result
    // );
  }
);

subtask(SUB_TASK_NAMES.REGISTRIES_CONFIGURATION, undefined).setAction(
  async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    const { deployments, ethers, getNamedAccounts } = hre;
    const { get } = deployments;
    const { deployer } = await getNamedAccounts();
    const signer = await ethers.getSigner(deployer);
    const stakeRegistry = <StakeRegistry>(
      await ethers.getContract(CONTRACT_NAMES.StakeRegistry)
    );
    const stakingParameters = await stakeRegistry.getStakingParameters();
    console.log('Staking parameters: ');
    const entries = Object.entries(stakingParameters);
    const formattedStakingParameters = entries
      .splice(entries.length / 2, entries.length)
      .map(([i, j]) => [i, j.toString()]);
    console.log(formattedStakingParameters);
    const periodRegistry = await PeriodRegistry__factory.connect(
      (
        await get(CONTRACT_NAMES.PeriodRegistry)
      ).address,
      signer
    );
    const periodDefinitions = await periodRegistry.getPeriodDefinitions();
    console.log('Period definitions (UTC=0): ');
    console.log(
      periodDefinitions.reduce(
        (r, definition, index) => ({
          ...r,
          [PERIOD_TYPE[index]]: {
            initialized: definition.initialized,
          },
        }),
        {}
      )
    );
    console.log(
      periodDefinitions.reduce(
        (r, definition, index) => ({
          ...r,
          [PERIOD_TYPE[index]]: {
            initialized: definition.initialized,
            starts: definition.starts.map((start) =>
              moment(Number(start.toString()) * 1000)
                .utc(0)
                .format('DD/MM/YYYY HH:mm:ss')
            ),
            startsUnix: definition.starts.map((start) => start.toString()),
            ends: definition.ends.map((end) =>
              moment(Number(end.toString()) * 1000)
                .utc(0)
                .format('DD/MM/YYYY HH:mm:ss')
            ),
            endsUnix: definition.ends.map((end) => end.toString()),
          },
        }),
        {}
      )
    );
  }
);

subtask(SUB_TASK_NAMES.GET_VALID_SLAS, undefined).setAction(
  async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    const { deployments, ethers, getNamedAccounts } = hre;
    const { get } = deployments;
    const { deployer } = await getNamedAccounts();
    const signer = await ethers.getSigner(deployer);
    const slaRegistry = await SLARegistry__factory.connect(
      (
        await get(CONTRACT_NAMES.SLARegistry)
      ).address,
      signer
    );
    const allSLAs = await slaRegistry.allSLAs();
    consola.info('SLA registry address:');
    consola.info(slaRegistry.address);
    consola.info('All valid SLAs:');
    for (let slaAddress of allSLAs) {
      printSeparator();
      const sla = <SLA>(
        await ethers.getContractAt(CONTRACT_NAMES.SLA, slaAddress)
      );
      const breachedContract = await sla.breachedContract();
      const contractFinished = await sla.contractFinished();
      const creationBlockNumber = await sla.creationBlockNumber();
      const messengerAddress = await sla.messengerAddress();
      const initialPeriodId = await sla.initialPeriodId();
      const finalPeriodId = await sla.finalPeriodId();
      const nextVerifiablePeriod = await sla.nextVerifiablePeriod();
      const periodType = await sla.periodType();
      const DSLAtoken = <ERC20PresetMinterPauser>(
        await ethers.getContract('DSLA')
      );
      const DSLASPtokenAddress = await sla.duTokenRegistry(DSLAtoken.address);
      const DSLALPtokenAddress = await sla.dpTokenRegistry(DSLAtoken.address);

      consola.info('slaAddress', slaAddress);
      consola.info('breachedContract', breachedContract);
      consola.info('contractFinished', contractFinished);
      consola.info('messengerAddress', messengerAddress);
      consola.info('periodType', PERIOD_TYPE[periodType]);
      consola.info('creationBlockNumber', creationBlockNumber.toString());
      consola.info('initialPeriodId', initialPeriodId.toString());
      consola.info('finalPeriodId', finalPeriodId.toString());
      consola.info('nextVerifiablePeriod', nextVerifiablePeriod.toString());
      consola.info('DSLA SP token address', DSLASPtokenAddress);
      consola.info('DSLA LP token address', DSLALPtokenAddress);
      printSeparator();
    }
  }
);

subtask(SUB_TASK_NAMES.GET_REVERT_MESSAGE, undefined).setAction(
  async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    const { ethers, network } = hre;
    const transaction = await ethers.provider.getTransaction(
      taskArgs.transactionHash
    );
    console.log('Transaction:');
    console.log(transaction);
    const { data } = await axios({
      method: 'post',
      url: (network.config as any).url,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        jsonrpc: '2.0',
        method: 'eth_call',
        params: [
          {
            from: transaction.from,
            to: transaction.to,
            value: numberToHex(transaction.value.toString()),
            data: transaction.data,
          },
          numberToHex(transaction.blockNumber),
        ],
        id: 1,
      },
    });
    console.log('Error data:');
    console.log(data);
  }
);

subtask(SUB_TASK_NAMES.GET_MESSENGER, undefined).setAction(
  async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    const { ethers, network } = hre;
    const { stacktical } = network.config;
    const messengers = taskArgs.index
      ? [stacktical.messengers[taskArgs.index]]
      : stacktical.messengers;
    for (let messenger of messengers) {
      const messengerArtifact = <IMessenger>(
        await ethers.getContract(messenger.contract)
      );
      printSeparator();
      consola.info('messenger: ', messenger.contract);
      const fee = await messengerArtifact.fee();
      consola.info('fee:', fromWei(fee.toString()));
      const fulfillsCounter = await messengerArtifact.fulfillsCounter();
      consola.info('fulfillsCounter:', fulfillsCounter.toString());
      const requestsCounter = await messengerArtifact.requestsCounter();
      consola.info('requestsCounter:', requestsCounter.toString());
      const jobId = await messengerArtifact.jobId();
      consola.info('jobId:', jobId);
      const messengerPrecision = await messengerArtifact.messengerPrecision();
      consola.info('messengerPrecision:', messengerPrecision.toString());
      const oracle = await messengerArtifact.oracle();
      consola.info('oracle:', oracle);
      const owner = await messengerArtifact.owner();
      consola.info('owner:', owner);
      printSeparator();
    }
  }
);

subtask(SUB_TASK_NAMES.TRANSFER_OWNERSHIP, undefined).setAction(
  async (taskArgs, hre: HardhatRuntimeEnvironment) => {
    const { ethers, network, getNamedAccounts } = hre;
    const { stacktical } = network.config;
    const { deployer } = await getNamedAccounts();
    const periodRegistry = <PeriodRegistry>(
      await ethers.getContract(CONTRACT_NAMES.PeriodRegistry)
    );
    const stakeRegistry = <StakeRegistry>(
      await ethers.getContract(CONTRACT_NAMES.StakeRegistry)
    );
    const newOwner = toChecksumAddress(taskArgs.newOwner);
    const periodRegistryOwner = await periodRegistry.owner();
    const stakeRegistryOwner = await stakeRegistry.owner();
    consola.info('PeriodRegistry owner address:', periodRegistryOwner);
    consola.info('StakeRegistry owner address:', stakeRegistryOwner);
    consola.info('New owner address:', newOwner);
    let tx;
    if (newOwner !== periodRegistryOwner && periodRegistryOwner === deployer) {
      printSeparator();
      consola.info('Transferring PeriodRegistry ownership');
      tx = await periodRegistry.transferOwnership(newOwner);
      consola.info(tx);
      await tx.wait();
      consola.success(
        'PeriodRegistry ownership successfully transferred, new owner:',
        await periodRegistry.owner()
      );
    }
    if (newOwner !== stakeRegistryOwner && stakeRegistryOwner === deployer) {
      printSeparator();
      consola.info('Transferring StakeRegistry ownership');
      tx = await stakeRegistry.transferOwnership(newOwner);
      await tx.wait();
      consola.success(
        'StakeRegistry ownership successfully transferred, new owner:',
        await stakeRegistry.owner()
      );
      consola.info(tx);
    }

    for (let messenger of stacktical.messengers) {
      const messengerContract: IMessenger = await ethers.getContract(
        messenger.contract
      );
      const messengerOwner = await messengerContract.owner();
      consola.info(`${messenger.useCaseName} owner: ${messengerOwner}`);
      if (newOwner !== messengerOwner && messengerOwner === deployer) {
        printSeparator();
        consola.info(
          `Transferring ${messenger.useCaseName} messenger ownership`
        );
        tx = await messengerContract.transferOwnership(newOwner);
        await tx.wait();
        consola.success(
          `${messenger.useCaseName} ownership successfully transferred, new owner: `,
          await messengerContract.owner()
        );
        consola.info(tx);
      }
    }
    printSeparator();
  }
);

// subtask(SUB_TASK_NAMES.FULFILL_ANALYTICS, undefined).setAction(
//   async (taskArgs, hre: HardhatRuntimeEnvironment) => {
//     const { deployments, ethers, getNamedAccounts, network } = hre;
//     const { stacktical }: { stacktical: StackticalConfiguration } =
//       network.config;
//     const { get } = deployments;
//     const { deployer } = await getNamedAccounts();
//     const signer = await ethers.getSigner(deployer);
//     const networkTicker = taskArgs.networkTicker.toUpperCase();
//     if (!Object.keys(SENetworks).includes(networkTicker)) {
//       throw new Error('Network not recognized: ' + networkTicker);
//     }
//     const na = await NetworkAnalytics__factory.connect(
//       (
//         await get(CONTRACT_NAMES.NetworkAnalytics)
//       ).address,
//       signer
//     );
//     const { periodId, periodType } = taskArgs;
//     const networkBytes32 = formatBytes32String(networkTicker);
//     const isRequested = await na.periodAnalyticsRequested(
//       networkBytes32,
//       periodType,
//       periodId
//     );
//     if (!isRequested) throw new Error('Analytics not requested yet');
//     const storedAnalytics = await na.periodAnalytics(
//       networkBytes32,
//       periodType,
//       periodId
//     );
//     if (Number(storedAnalytics) !== 0) {
//       console.log('Stored analytics:');
//       console.log(storedAnalytics);
//       console.log('IPFS data:');
//       console.log(
//         process.env.IPFS_URI +
//           /ipfs/ +
//           bs58.encode(
//             Buffer.from(`1220${storedAnalytics.replace('0x', '')}`, 'hex')
//           )
//       );
//       throw new Error('Analytics already fulfilled');
//     }
//
//     let filter = na.filters.ChainlinkRequested();
//     let events = await na.queryFilter(
//       filter,
//       (await get(CONTRACT_NAMES.NetworkAnalytics))?.receipt?.blockNumber ||
//         undefined
//     );
//     let requestedAnalyticsEvent;
//     for (let event of events) {
//       const { id } = event.args;
//       const analyticsRequest = await na.requestIdToAnalyticsRequest(id);
//       if (
//         analyticsRequest.networkName === networkBytes32 &&
//         Number(analyticsRequest.periodId) === periodId &&
//         analyticsRequest.periodType === periodType
//       ) {
//         requestedAnalyticsEvent = event;
//       }
//     }
//     if (requestedAnalyticsEvent === undefined)
//       throw new Error('Request id not found');
//     const chainlinkNodeConfig: ChainlinkNodeConfiguration =
//       stacktical.chainlink.nodesConfiguration.find(
//         (node) => node.name === taskArgs.nodeName
//       );
//     if (!chainlinkNodeConfig)
//       throw new Error('Chainlink node config not found');
//     const externalAdapterUrl = stacktical.chainlink.deployLocal
//       ? chainlinkNodeConfig.externalAdapterUrl
//       : 'http://localhost:' +
//         chainlinkNodeConfig.externalAdapterUrl.split(':').slice(-1)[0];
//
//     const preCoordinator = await PreCoordinator__factory.connect(
//       (
//         await get(CONTRACT_NAMES.PreCoordinator)
//       ).address,
//       signer
//     );
//     const saRequestedFilter = preCoordinator.filters.ChainlinkRequested();
//     const saRequestedEvents = await preCoordinator.queryFilter(
//       saRequestedFilter,
//       (await get(CONTRACT_NAMES.PreCoordinator))?.receipt?.blockNumber ||
//         undefined
//     );
//     const oracleRequestId = saRequestedEvents.find(
//       (event) => event.blockNumber === requestedAnalyticsEvent.blockNumber
//     ).args.id;
//     const job = await getChainlinkJob(chainlinkNodeConfig);
//     const oracle = await Oracle__factory.connect(
//       job.attributes.initiators[0].params.address,
//       signer
//     );
//     const oracleRqFilter = oracle.filters.OracleRequest();
//     const oracleRqEvents = await oracle.queryFilter(
//       oracleRqFilter,
//       (await get(CONTRACT_NAMES.Oracle))?.receipt?.blockNumber || undefined
//     );
//     const oracleRqEvent = oracleRqEvents.find(
//       (event) => event.args.requestId === oracleRequestId
//     );
//     console.log('Request id successfully identified: ');
//     console.log(oracleRqEvent.args);
//     const preCoordinatorCallbackId = '0x6a9705b4';
//     const periodRegistry = await PeriodRegistry__factory.connect(
//       (
//         await get(CONTRACT_NAMES.PeriodRegistry)
//       ).address,
//       signer
//     );
//     const { start, end } = await periodRegistry.getPeriodStartAndEnd(
//       periodType,
//       periodId
//     );
//     const { data } = await axios({
//       method: 'post',
//       url: externalAdapterUrl,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       data: {
//         data: {
//           job_type: 'staking_efficiency_analytics',
//           network_name: networkTicker,
//           period_id: periodId,
//           period_type: periodType,
//           sla_monitoring_start: start.toString(),
//           sla_monitoring_end: end.toString(),
//         },
//       },
//     });
//     const { result } = data.data;
//     if (taskArgs.signTransaction) {
//       await oracle.fulfillOracleRequest(
//         oracleRequestId,
//         String(0.1 * 10 ** 18),
//         preCoordinator.address,
//         preCoordinatorCallbackId,
//         oracleRqEvent.args.cancelExpiration,
//         '0x' + result
//       );
//     }
//   }
// );
//
// subtask(SUB_TASK_NAMES.PREC_FULFILL_ANALYTICS, undefined).setAction(
//   async (taskArgs, hre: HardhatRuntimeEnvironment) => {
//     const { deployments, ethers, getNamedAccounts, network } = hre;
//     const { stacktical }: { stacktical: StackticalConfiguration } =
//       network.config;
//     const { get } = deployments;
//     const { deployer } = await getNamedAccounts();
//     const signer = await ethers.getSigner(deployer);
//     const networkTicker = taskArgs.networkTicker.toUpperCase();
//     if (!Object.keys(SENetworks).includes(networkTicker)) {
//       throw new Error('Network not recognized: ' + networkTicker);
//     }
//     const na = await NetworkAnalytics__factory.connect(
//       (
//         await get(CONTRACT_NAMES.NetworkAnalytics)
//       ).address,
//       signer
//     );
//     const { periodId, periodType } = taskArgs;
//     const networkBytes32 = formatBytes32String(networkTicker);
//     const isRequested = await na.periodAnalyticsRequested(
//       networkBytes32,
//       periodType,
//       periodId
//     );
//     if (!isRequested) throw new Error('Analytics not requested yet');
//     const storedAnalytics = await na.periodAnalytics(
//       networkBytes32,
//       periodType,
//       periodId
//     );
//     if (Number(storedAnalytics) !== 0) {
//       console.log('Stored analytics:');
//       console.log(storedAnalytics);
//       console.log('IPFS data:');
//       console.log(
//         process.env.IPFS_URI +
//           /ipfs/ +
//           bs58.encode(
//             Buffer.from(`1220${storedAnalytics.replace('0x', '')}`, 'hex')
//           )
//       );
//       throw new Error('Analytics already fulfilled');
//     }
//
//     let filter = na.filters.ChainlinkRequested();
//     let events = await na.queryFilter(
//       filter,
//       (await get(CONTRACT_NAMES.NetworkAnalytics))?.receipt?.blockNumber ||
//         undefined
//     );
//     let requestedAnalyticsEvent;
//     for (let event of events) {
//       const { id } = event.args;
//       const analyticsRequest = await na.requestIdToAnalyticsRequest(id);
//       if (
//         analyticsRequest.networkName === networkBytes32 &&
//         Number(analyticsRequest.periodId) === periodId &&
//         analyticsRequest.periodType === periodType
//       ) {
//         requestedAnalyticsEvent = event;
//       }
//     }
//     if (requestedAnalyticsEvent === undefined)
//       throw new Error('Request analytics event not found');
//     const chainlinkNodeConfig: ChainlinkNodeConfiguration =
//       stacktical.chainlink.nodesConfiguration.find(
//         (node) => node.name === taskArgs.nodeName
//       );
//     if (!chainlinkNodeConfig)
//       throw new Error('Chainlink node config not found');
//     const externalAdapterUrl = stacktical.chainlink.deployLocal
//       ? chainlinkNodeConfig.externalAdapterUrl
//       : 'http://localhost:' +
//         chainlinkNodeConfig.externalAdapterUrl.split(':').slice(-1)[0];
//
//     const preCoordinator = await PreCoordinator__factory.connect(
//       (
//         await get(CONTRACT_NAMES.PreCoordinator)
//       ).address,
//       signer
//     );
//     const pcRequestedFilter = preCoordinator.filters.ChainlinkRequested();
//     const pcRequestedEvents = await preCoordinator.queryFilter(
//       pcRequestedFilter,
//       (await get(CONTRACT_NAMES.PreCoordinator))?.receipt?.blockNumber ||
//         undefined
//     );
//     const preCoordinatorArtifact = await get(CONTRACT_NAMES.PreCoordinator);
//     const requestsSlot = preCoordinatorArtifact.storageLayout.storage.find(
//       (layout) => layout.label === 'requests'
//     ).slot;
//     if (!requestsSlot) {
//       throw new Error('requests mapping slot not found');
//     }
//     console.log('Requested Analytics event:');
//     console.log(requestedAnalyticsEvent);
//     let oracleRequestId;
//     console.log(
//       'Reading PreCoordinator "requests" internal mapping from storage'
//     );
//     for (let event of pcRequestedEvents) {
//       // read the "requests" mapping of the PreCoordinator by reading storage
//       // https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html#mappings-and-dynamic-arrays
//       const storageIndex = soliditySha3(
//         event.args.id,
//         padLeft(numberToHex(requestsSlot), 64)
//       );
//       const { data } = await axios({
//         method: 'post',
//         url: (network.config as any).url,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         data: {
//           jsonrpc: '2.0',
//           method: 'eth_getStorageAt',
//           params: [preCoordinator.address, storageIndex, 'latest'],
//           id: 1,
//         },
//       });
//       // if incomingRequest is equal to the PreCoordinator's ChainlinkRequest id, then catch the outgoingRequestId
//       printSeparator();
//       if (data.result === requestedAnalyticsEvent.args.id) {
//         console.log('Match found');
//         oracleRequestId = event.args.id;
//       }
//       console.log('PreCoordinator outgoing request: ' + event.args.id);
//       console.log('PreCoordinator incoming request: ' + data.result);
//     }
//     printSeparator();
//
//     console.log('Request id successfully identified: ');
//     console.log(oracleRequestId);
//     const periodRegistry = await PeriodRegistry__factory.connect(
//       (
//         await get(CONTRACT_NAMES.PeriodRegistry)
//       ).address,
//       signer
//     );
//     const { start, end } = await periodRegistry.getPeriodStartAndEnd(
//       periodType,
//       periodId
//     );
//     const { data } = await axios({
//       method: 'post',
//       url: externalAdapterUrl,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       data: {
//         data: {
//           job_type: 'staking_efficiency_analytics',
//           network_name: networkTicker,
//           period_id: periodId,
//           period_type: periodType,
//           sla_monitoring_start: start.toString(),
//           sla_monitoring_end: end.toString(),
//         },
//       },
//     });
//     const { result } = data.data;
//     console.log('External adapter result: ');
//     console.log(result);
//     console.log('IPFS data:');
//     console.log(
//       process.env.IPFS_URI +
//         /ipfs/ +
//         bs58.encode(Buffer.from(`1220${result}`, 'hex'))
//     );
//     if (taskArgs.signTransaction) {
//       throw new Error('should set gas price and limit');
//       await preCoordinator.chainlinkCallback(
//         oracleRequestId,
//         BigNumber.from('0x' + result),
//         {
//           gasLimit: 'set the gas limit',
//           gasPrice: 'set the gas price',
//         }
//       );
//     }
//   }
// );
