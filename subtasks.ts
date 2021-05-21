/* eslint-disable no-await-in-loop, import/no-extraneous-dependencies */
import { DeploymentsExtension } from 'hardhat-deploy/dist/types';
import { fromWei, toChecksumAddress, toWei } from 'web3-utils';

import {
  deleteJob,
  getChainlinkAccounts,
  getChainlinkBridge,
  getChainlinkJob,
  getChainlinkLinkToken,
  postChainlinkBridge,
  postChainlinkJob,
  setChainlinkEnv,
} from './chainlinkUtils';
import { subtask } from 'hardhat/config';
import { DeploySLAConfiguration, StackticalConfiguration } from './types';
import {
  DAI__factory,
  DSLA__factory,
  LinkToken__factory,
  NetworkAnalytics__factory,
  Oracle__factory,
  PeriodRegistry__factory,
  SEMessenger__factory,
  SLA__factory,
  SLARegistry__factory,
  StakeRegistry__factory,
  USDC__factory,
} from './typechain';
import { getIPFSHash, generateBootstrapPeriods, eventListener } from './utils';
import {
  CONTRACT_NAMES,
  PERIOD_STATUS,
  PERIOD_TYPE,
  SENetworkNamesBytes32,
} from './constants';

const prettier = require('prettier');
const { DataFile } = require('edit-config');
const appRoot = require('app-root-path');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const compose = require('docker-compose');
const moment = require('moment');

export enum SUB_TASK_NAMES {
  PREPARE_CHAINLINK_NODE = 'PREPARE_CHAINLINK_NODE',
  SETUP_DOCKER_COMPOSE = 'SETUP_DOCKER_COMPOSE',
  SET_CHAINLINK_ENV = 'SET_CHAINLINK_ENV',
  STOP_CHAINLINK_NODE = 'STOP_CHAINLINK_NODE',
  START_CHAINLINK_NODE = 'START_CHAINLINK_NODE',
  INITIALIZE_DEFAULT_ADDRESSES = 'INITIALIZE_DEFAULT_ADDRESSES',
  SAVE_CONTRACTS_ADDRESSES = 'SAVE_CONTRACTS_ADDRESSES',
  EXPORT_ABIS = 'EXPORT_ABIS',
  DEPLOY_SLA = 'DEPLOY_SLA',
  BOOTSTRAP_DSLA_PROTOCOL = 'BOOTSTRAP_DSLA_PROTOCOL',
  REQUEST_SLI = 'REQUEST_SLI',
  REQUEST_ANALYTICS = 'REQUEST_ANALYTICS',
}

subtask(SUB_TASK_NAMES.SET_CHAINLINK_ENV, undefined).setAction(
  async (_, hre: any) => {
    setChainlinkEnv(hre.network.config.stacktical);
  }
);

subtask(SUB_TASK_NAMES.STOP_CHAINLINK_NODE, undefined).setAction(async () => {
  await compose.down({
    cwd: path.join(`${appRoot}/dev-env/`),
    log: true,
  });
});

subtask(SUB_TASK_NAMES.START_CHAINLINK_NODE, undefined).setAction(async () => {
  await compose.upAll({
    cwd: path.join(`${appRoot}/dev-env/`),
    log: true,
  });
});

subtask(SUB_TASK_NAMES.SETUP_DOCKER_COMPOSE, undefined).setAction(
  async (_, hre: any) => {
    const { deployments, network } = hre;
    const { get } = deployments;
    const oracle = await get(CONTRACT_NAMES.Oracle);
    const linkToken = await get(CONTRACT_NAMES.LinkToken);

    const jobSpec = await DataFile.load(
      `${appRoot.path}/dev-env/dsla-protocol.json`
    );
    jobSpec.set('initiators', [
      {
        type: 'RunLog',
        params: { address: oracle.address },
      },
    ]);

    await jobSpec.save();

    const dockerComposePath = `${appRoot.path}/dev-env/docker-compose.yaml`;
    const fileContents = fs.readFileSync(dockerComposePath, 'utf8');
    const data = yaml.load(fileContents);
    data.services.chainlink.environment =
      data.services.chainlink.environment.map((envVariable) => {
        switch (true) {
          case /LINK_CONTRACT_ADDRESS/.test(envVariable):
            return `LINK_CONTRACT_ADDRESS=${
              network.config.stacktical.linkTokenAddress || linkToken.address
            }`;
          case /ETH_CHAIN_ID/.test(envVariable):
            return `ETH_CHAIN_ID=${network.config.chainId}`;
          case /ETH_URL/.test(envVariable):
            return `ETH_URL=${network.config.stacktical.developChainlinkNode.ethUrl}`;
          default:
            return envVariable;
        }
      });
    data.services.postgres.volumes = [
      `./postgres/${network.name}/db:/var/lib/postgresql/data`,
    ];
    const yamlStr = yaml.dump(data);
    fs.writeFileSync(dockerComposePath, yamlStr, 'utf8');
  }
);

subtask(SUB_TASK_NAMES.PREPARE_CHAINLINK_NODE, undefined).setAction(
  async (_, hre: any) => {
    function wait(timeout) {
      return new Promise((resolve) => {
        setTimeout(resolve, timeout);
      });
    }

    const updatedBridge = async () => {
      try {
        const postedBridge = await getChainlinkBridge();
        if (postedBridge) return postedBridge;
        const httpRequestJobRes = await postChainlinkBridge();
        return httpRequestJobRes.data;
      } catch (error) {
        return false;
      }
    };

    const updatedJob = async () => {
      try {
        const postedJob = await getChainlinkJob();
        if (postedJob) {
          await deleteJob(postedJob.id);
        }
        const httpRequestJobRes = await postChainlinkJob();
        return httpRequestJobRes.data;
      } catch (error) {
        return false;
      }
    };

    const updatedAddress = async () => {
      try {
        const addresses = await getChainlinkAccounts();
        if (addresses.length === 0) return false;
        const {
          attributes: { address },
        } = addresses.find((address) => !address.attributes.isFunding);
        return toChecksumAddress(address);
      } catch (error) {
        return false;
      }
    };
    const { deployments, network, ethers, getNamedAccounts, web3 } = hre;
    const { deployer } = await getNamedAccounts();
    const { get } = deployments;
    // Create bridge
    console.log('Creating dsla-protocol bridge in Chainlink node...');
    let bridge = await updatedBridge();
    while (!bridge) {
      // eslint-disable-next-line no-await-in-loop
      await wait(5000);
      console.log(
        'Bridge creation in Chainlink node failed, reattempting in 5 seconds'
      );
      // eslint-disable-next-line no-await-in-loop
      bridge = await updatedBridge();
    }
    console.log(`Bridge created! Bridge ID: ${bridge.id}.`);

    // Create job
    console.log('Creating staking efficiency job on Chainlink node...');
    // eslint-disable-next-line global-require
    let job = await updatedJob();
    while (!job) {
      // eslint-disable-next-line no-await-in-loop
      await wait(5000);
      console.log(
        'Job creation in Chainlink node failed, reattempting in 5 seconds'
      );
      // eslint-disable-next-line no-await-in-loop
      job = await updatedJob();
    }
    console.log(`Job created! Job ID: ${job.id}.`);

    // Fund node
    let chainlinkNodeAddress = await updatedAddress();
    while (!chainlinkNodeAddress) {
      await wait(5000);
      console.log(
        'Address fetch from Chainlink node failed, reattempting in 5 seconds'
      );
      chainlinkNodeAddress = await updatedAddress();
    }
    console.log(`Chainlink Node Address: ${chainlinkNodeAddress}`);
    const { productionChainlinkNode, developChainlinkNode } =
      network.config.stacktical;
    const { funds, gasLimit } = productionChainlinkNode || developChainlinkNode;
    const [defaultAccount] = await web3.eth.getAccounts();
    let balance = await web3.eth.getBalance(chainlinkNodeAddress);
    if (web3.utils.fromWei(balance) < funds) {
      await web3.eth.sendTransaction({
        from: defaultAccount,
        to: chainlinkNodeAddress,
        value: web3.utils.toWei(
          String(funds - web3.utils.fromWei(balance)),
          'ether'
        ),
        gas: gasLimit,
      });
    }
    balance = await web3.eth.getBalance(chainlinkNodeAddress);
    console.log(`Chainlink Node balance: ${web3.utils.fromWei(balance)} ether`);

    // Authorize node
    const oracle = await get(CONTRACT_NAMES.Oracle);
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
        true
      );
      await tx.wait();
    }
    permissions = await oracleContract.getAuthorizationStatus(
      chainlinkNodeAddress
    );
    console.log(`Chainlink Node Fullfillment permissions: ${permissions}`);
  }
);

subtask(
  SUB_TASK_NAMES.INITIALIZE_DEFAULT_ADDRESSES,
  'Saves addresses from stacktical config'
).setAction(async (_, hre: any) => {
  const { deployments, network } = hre;
  const { stacktical }: { stacktical: StackticalConfiguration } =
    network.config;
  const { getArtifact }: DeploymentsExtension = deployments;
  if (stacktical.addresses.oracle) {
    const artifact = await getArtifact(CONTRACT_NAMES.Oracle);
    deployments.save(CONTRACT_NAMES.Oracle, {
      address: stacktical.addresses.oracle,
      abi: artifact.abi,
    });
  }
  if (stacktical.addresses.tokens.LINK) {
    const artifact = await getArtifact(CONTRACT_NAMES.LinkToken);
    await deployments.save(CONTRACT_NAMES.LinkToken, {
      address: stacktical.addresses.tokens.LINK,
      abi: artifact.abi,
    });
  }
  if (stacktical.addresses.tokens.DSLA) {
    const artifact = await getArtifact(CONTRACT_NAMES.ERC20);
    await deployments.save(CONTRACT_NAMES.DSLA, {
      address: stacktical.addresses.tokens.DSLA,
      abi: artifact.abi,
    });
  }
  if (stacktical.addresses.tokens.DAI) {
    const artifact = await getArtifact(CONTRACT_NAMES.ERC20);
    await deployments.save(CONTRACT_NAMES.DAI, {
      address: stacktical.addresses.tokens.DAI,
      abi: artifact.abi,
    });
  }
  if (stacktical.addresses.tokens.USDC) {
    const artifact = await getArtifact(CONTRACT_NAMES.ERC20);
    await deployments.save(CONTRACT_NAMES.USDC, {
      address: stacktical.addresses.tokens.USDC,
      abi: artifact.abi,
    });
  }
});

subtask(SUB_TASK_NAMES.SAVE_CONTRACTS_ADDRESSES, undefined).setAction(
  async (_, hre: any) => {
    const { network, deployments } = hre;
    const { get } = deployments;
    const getLines = (networkName) => [
      `const ${networkName} = `,
      `\n\nexport default ${networkName}`,
    ];
    const [startingLine, finalLine] = getLines(network.name);
    const NetworkAnalytics = await get(CONTRACT_NAMES.NetworkAnalytics);
    const DSLAToken = await get(CONTRACT_NAMES.DSLA);
    const DAIToken = await get(CONTRACT_NAMES.DAI);
    const USDCToken = await get(CONTRACT_NAMES.USDC);
    const SLORegistry = await get(CONTRACT_NAMES.SLORegistry);
    const SLARegistry = await get(CONTRACT_NAMES.SLARegistry);
    const MessengerRegistry = await get(CONTRACT_NAMES.MessengerRegistry);
    const PeriodRegistry = await get(CONTRACT_NAMES.PeriodRegistry);
    const StakeRegistry = await get(CONTRACT_NAMES.StakeRegistry);
    const SEMessenger = await get(CONTRACT_NAMES.SEMessenger);
    const Details = await get(CONTRACT_NAMES.Details);
    const PreCoordinator = await get(CONTRACT_NAMES.PreCoordinator);
    const StringUtils = await get(CONTRACT_NAMES.StringUtils);

    const addresses = {
      DSLAToken: DSLAToken.address,
      DAIToken: DAIToken.address,
      USDCToken: USDCToken.address,
      SLORegistry: SLORegistry.address,
      SLARegistry: SLARegistry.address,
      MessengerRegistry: MessengerRegistry.address,
      PeriodRegistry: PeriodRegistry.address,
      StakeRegistry: StakeRegistry.address,
      SEMessenger: SEMessenger.address,
      NetworkAnalytics: NetworkAnalytics.address,
      Details: Details.address,
      PreCoordinator: PreCoordinator.address,
      StringUtils: StringUtils.address,
    };

    const base_path = `${appRoot}/exported-data/networks`;
    const prettifiedAddresses = prettier.format(
      startingLine + JSON.stringify(addresses) + finalLine,
      {
        useTabs: false,
        tabWidth: 2,
        singleQuote: true,
        parser: 'typescript',
      }
    );
    fs.writeFileSync(
      path.resolve(__dirname, `${base_path}/${network.name}.ts`),
      prettifiedAddresses
    );

    const files = await new Promise((resolve, reject) => {
      fs.readdir(`${appRoot}/deployments`, undefined, (err, files) => {
        if (err) return reject(err);
        resolve(files);
      });
    });
    const importLines = Object.values(files).reduce(
      (r, name) => (r += `import ${name} from './${name}'\n`),
      ''
    );
    const exportLines = Object.values(files).reduce(
      (r, name) => (r += `${name}, `),
      ''
    );
    const prettifiedIndex = prettier.format(
      `${importLines}\n \n export{ \n ${exportLines} }`,
      {
        useTabs: false,
        tabWidth: 2,
        singleQuote: true,
        parser: 'typescript',
      }
    );
    fs.writeFileSync(
      path.resolve(__dirname, `${base_path}/index.ts`),
      prettifiedIndex
    );
  }
);

subtask(SUB_TASK_NAMES.EXPORT_ABIS, undefined).setAction(
  async (_, hre: any) => {
    const { deployments } = hre;
    const { getArtifact } = deployments;
    const SLA = await getArtifact(CONTRACT_NAMES.SLA);
    const SLARegistry = await getArtifact(CONTRACT_NAMES.SLARegistry);
    const SLORegistry = await getArtifact(CONTRACT_NAMES.SLORegistry);
    const PeriodRegistry = await getArtifact(CONTRACT_NAMES.PeriodRegistry);
    const StakeRegistry = await getArtifact(CONTRACT_NAMES.StakeRegistry);
    const MessengerRegistry = await getArtifact(
      CONTRACT_NAMES.MessengerRegistry
    );
    const Details = await getArtifact(CONTRACT_NAMES.Details);
    const NetworkAnalytics = await getArtifact(CONTRACT_NAMES.NetworkAnalytics);
    const ERC20 = await getArtifact(CONTRACT_NAMES.ERC20);

    const files = {
      SLA: {
        constName: 'export const SLAABI: AbiItem[] =',
        tsFileName: 'SLAABI.ts',
        abi: SLA.abi,
      },
      SLARegistry: {
        constName: 'export const SLARegistryABI: AbiItem[] =',
        tsFileName: 'SLARegistryABI.ts',
        abi: SLARegistry.abi,
      },
      SLORegistry: {
        constName: 'export const SLORegistryABI: AbiItem[] =',
        tsFileName: 'SLORegistryABI.ts',
        abi: SLORegistry.abi,
      },
      PeriodRegistry: {
        constName: 'export const PeriodRegistryABI: AbiItem[] =',
        tsFileName: 'PeriodRegistryABI.ts',
        abi: PeriodRegistry.abi,
      },
      StakeRegistry: {
        constName: 'export const StakeRegistryABI: AbiItem[] =',
        tsFileName: 'StakeRegistryABI.ts',
        abi: StakeRegistry.abi,
      },
      MessengerRegistry: {
        constName: 'export const MessengerRegistryABI: AbiItem[] =',
        tsFileName: 'MessengerRegistryABI.ts',
        abi: MessengerRegistry.abi,
      },
      Details: {
        constName: 'export const DetailsABI: AbiItem[] =',
        tsFileName: 'DetailsABI.ts',
        abi: Details.abi,
      },
      NetworkAnalytics: {
        constName: 'export const NetworkAnalyticsABI: AbiItem[] =',
        tsFileName: 'NetworkAnalyticsABI.ts',
        abi: NetworkAnalytics.abi,
      },
      bDSLA: {
        constName: 'export const erc20ABI: AbiItem[] =',
        tsFileName: 'erc20ABI.ts',
        abi: ERC20.abi,
      },
    };

    const base_path = `${appRoot}/exported-data`;
    const importAbiItem = "import { AbiItem } from 'web3-utils/types';\n\n";
    for (const file of Object.values(files)) {
      const { constName, tsFileName, abi } = file;
      const content = prettier.format(
        importAbiItem + constName + JSON.stringify(abi),
        {
          useTabs: false,
          tabWidth: 2,
          singleQuote: true,
          parser: 'typescript',
        }
      );
      fs.writeFileSync(
        path.resolve(__dirname, `${base_path}/${tsFileName}`),
        content
      );
    }
  }
);

subtask(SUB_TASK_NAMES.BOOTSTRAP_DSLA_PROTOCOL, undefined).setAction(
  async (_, hre: any) => {
    const {
      stacktical: { bootstrap },
    }: { stacktical: StackticalConfiguration } = hre.network.config;
    const { periods, messengersLinkTokenAllowance } = bootstrap;

    console.log('Starting automated jobs to bootstrap protocol correctly');
    console.log(
      'Starting automated job 1: allowing DAI and USDC on StakeRegistry'
    );
    const { deployments, ethers, getNamedAccounts } = hre;
    const { deployer } = await getNamedAccounts();
    const signer = await ethers.getSigner(deployer);
    const { get } = deployments;

    const daiArtifact = await get(CONTRACT_NAMES.DAI);
    const usdcArtifact = await get(CONTRACT_NAMES.USDC);
    const stakeRegistryArtifact = await get(CONTRACT_NAMES.StakeRegistry);
    const periodRegistryArtifact = await get(CONTRACT_NAMES.PeriodRegistry);
    const networkAnalyticsArtifact = await get(CONTRACT_NAMES.NetworkAnalytics);
    const networkAnalytics = await NetworkAnalytics__factory.connect(
      networkAnalyticsArtifact.address,
      signer
    );
    const daiToken = await DAI__factory.connect(daiArtifact.address, signer);
    const usdcToken = await USDC__factory.connect(usdcArtifact.address, signer);
    const stakeRegistry = await StakeRegistry__factory.connect(
      stakeRegistryArtifact.address,
      signer
    );
    const periodRegistry = await PeriodRegistry__factory.connect(
      periodRegistryArtifact.address,
      signer
    );
    const seMessenger = await SEMessenger__factory.connect(
      (
        await get(CONTRACT_NAMES.SEMessenger)
      ).address,
      signer
    );
    const slaRegistry = await SLARegistry__factory.connect(
      (
        await get(CONTRACT_NAMES.SLARegistry)
      ).address,
      signer
    );
    let tx = await stakeRegistry.addAllowedTokens(daiToken.address);
    await tx.wait();
    tx = await stakeRegistry.addAllowedTokens(usdcToken.address);
    await tx.wait();

    console.log('Starting automated job 2: periods initialization');
    for (let period of periods) {
      const { periodType, amountOfPeriods, expiredPeriods } = period;
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
      tx = await periodRegistry.initializePeriod(
        periodType,
        periodStarts,
        periodEnds
      );
      await tx.wait();
    }

    console.log(
      'Starting automated job 3: Adding the network names to the NetworkAnalytics contract'
    );
    tx = await networkAnalytics.addMultipleNetworks(SENetworkNamesBytes32);
    await tx.wait();

    console.log(
      'Starting automated job 4: Increasing allowance for NetworkAnalytics and SEMessenger with 10 link tokens'
    );
    const linkTokenAddress = await getChainlinkLinkToken();
    const linkToken = await LinkToken__factory.connect(
      linkTokenAddress,
      signer
    );
    tx = await linkToken.approve(
      networkAnalytics.address,
      ethers.utils.parseEther(messengersLinkTokenAllowance)
    );
    await tx.wait();
    tx = await linkToken.approve(
      seMessenger.address,
      ethers.utils.parseEther(messengersLinkTokenAllowance)
    );
    await tx.wait();

    console.log(
      'Starting automated job 5: Registering messenger on the SLARegistry'
    );
    const seMessengerSpec = JSON.parse(
      fs.readFileSync(`${appRoot.path}/messenger-specs/semessenger.spec.json`)
    );

    const updatedSpec = {
      ...seMessengerSpec,
      timestamp: new Date().toISOString(),
    };
    const seMessengerSpecIPFS = await getIPFSHash(updatedSpec);

    tx = await slaRegistry.registerMessenger(
      seMessenger.address,
      `https://ipfs.dsla.network/ipfs/${seMessengerSpecIPFS}`
    );
    await tx.wait();
    console.log('Bootstrap process completed');
  }
);

subtask(SUB_TASK_NAMES.DEPLOY_SLA, undefined).setAction(async (_, hre: any) => {
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
  const signer = await ethers.getSigner(deployer);
  const { get } = deployments;
  console.log('Starting SLA deployment process');
  console.log(
    'Starting process 1: Allowance on Stake registry to contracts-deploy SLA'
  );
  const { deploy_sla }: { deploy_sla: DeploySLAConfiguration } = scripts;
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
  } = deploy_sla;
  const stakeAmount = Number(initialTokenSupply) / initialTokenSupplyDivisor;
  const stakeAmountTimesWei = (times) => toWei(String(stakeAmount * times));
  const semessengerArtifact = await get(CONTRACT_NAMES.SEMessenger);
  const seMessenger = await SEMessenger__factory.connect(
    semessengerArtifact.address,
    signer
  );
  const ipfsHash = await getIPFSHash(serviceMetadata);
  const stakeRegistryArtifact = await get(CONTRACT_NAMES.StakeRegistry);
  const dslaTokenArtifact = await get(CONTRACT_NAMES.DSLA);
  const slaRegistryArtifact = await get(CONTRACT_NAMES.SLARegistry);
  const dslaToken = await DSLA__factory.connect(
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
    sloValue,
    sloType,
    whitelisted,
    seMessenger.address,
    periodType,
    initialPeriodId,
    finalPeriodId,
    ipfsHash,
    extraData,
    leverage
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
    `Starting process 3.1: deployer: ${fromWei(deployerStake)} bDSLA`
  );
  tx = await dslaToken.approve(sla.address, deployerStake);
  await tx.wait();
  tx = await sla.stakeTokens(deployerStake, dslaToken.address);
  await tx.wait();
  const notDeployerBalance = await dslaToken.callStatic.balanceOf(notDeployer);
  const notDeployerStake = stakeAmountTimesWei(notDeployerStakeTimes);
  if (fromWei(notDeployerStake) > fromWei(notDeployerBalance.toString())) {
    tx = await dslaToken.transfer(notDeployer, notDeployerStake);
    await tx.wait();
  }
  console.log(
    `Starting process 3.2: notDeployer: ${fromWei(notDeployerStake)} bDSLA`
  );
  await dslaToken.connect(await ethers.getSigner(notDeployer));
  tx = await dslaToken.approve(sla.address, notDeployerStake);
  await tx.wait();
  tx = await sla.stakeTokens(notDeployerStake, dslaToken.address);
  await tx.wait();
});

subtask(SUB_TASK_NAMES.REQUEST_SLI, undefined).setAction(
  async (taskArgs, hre: any) => {
    const {
      deployments,
      ethers,
      getNamedAccounts,
      network: {
        config: {
          stacktical: { scripts, web3WebsocketProviderUrl },
        },
      },
    } = hre;
    const { deployer } = await getNamedAccounts();
    const signer = await ethers.getSigner(deployer);
    const { get } = deployments;
    console.log('Starting SLI request process');
    const slaRegistry = await SLARegistry__factory.connect(
      (
        await get(CONTRACT_NAMES.SLARegistry)
      ).address,
      signer
    );

    const slaAddresses = await slaRegistry.userSLAs(deployer);
    if (taskArgs.address) ethers.utils.getAddress(taskArgs.address);
    const slaAddress = taskArgs.address || slaAddresses.slice(-1)[0];
    const sla = await SLA__factory.connect(slaAddress, signer);
    console.log(`SLA address: ${slaAddresses}`);

    const nextVerifiablePeriod = await sla.nextVerifiablePeriod();
    const ownerApproval = true;
    console.log(
      'Starting automated job 1: Request SLI for period ' +
        nextVerifiablePeriod.toString()
    );
    let tx = await slaRegistry.requestSLI(
      Number(nextVerifiablePeriod),
      sla.address,
      ownerApproval
    );
    await tx.wait();
    await new Promise((resolve) => sla.on('SLICreated', () => resolve(null)));
    const createdSLI = await sla.periodSLIs(nextVerifiablePeriod);
    const { timestamp, sli, status } = createdSLI;
    console.log('Created SLI timestamp:', timestamp.toString());
    console.log('Created SLI sli:', sli.toString());
    console.log('Created SLI status:', PERIOD_STATUS[status]);
    console.log('SLI request process finished');
  }
);

subtask(SUB_TASK_NAMES.REQUEST_ANALYTICS, undefined).setAction(
  async (taskArgs, hre: any) => {
    const { deployments, ethers, getNamedAccounts, network } = hre;
    const { stacktical }: { stacktical: StackticalConfiguration } =
      network.config;
    const { deployer } = await getNamedAccounts();
    const signer = await ethers.getSigner(deployer);
    const { get } = deployments;

    console.log('SLI request process finished');
    console.log('Starting Analytics request process');

    const networkAnalytics = await NetworkAnalytics__factory.connect(
      (
        await get(CONTRACT_NAMES.NetworkAnalytics)
      ).address,
      signer
    );
    const ownerApproval = true;
    const {
      scripts: { deploy_sla },
    } = stacktical;
    console.log(
      'Starting automated job 1: Request Analytics for period ' +
        taskArgs.periodId
    );
    let tx = await networkAnalytics.requestAnalytics(
      taskArgs.periodId,
      deploy_sla.periodType,
      deploy_sla.extraData[0],
      ownerApproval
    );
    await tx.wait();
    await new Promise((resolve) =>
      networkAnalytics.on('AnalyticsReceived', () => resolve(null))
    );
    const analyticsResult = await networkAnalytics.periodAnalytics(
      deploy_sla.extraData[0],
      deploy_sla.periodType,
      taskArgs.periodId
    );
    console.log('Analytics result: ', analyticsResult);
    console.log('Analytics request process finished');
  }
);
