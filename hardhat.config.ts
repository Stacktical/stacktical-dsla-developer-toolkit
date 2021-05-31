/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config({ path: './.env' });
const appRoot = require('app-root-path');

import { StackticalConfiguration } from './types';
import './tasks';
import {
  CONTRACT_NAMES,
  NETWORKS,
  PERIOD_TYPE,
  SENetworkNames,
  SENetworkNamesBytes32,
  SENetworks,
  SLO_TYPE,
} from './constants';
import { extendEnvironment } from 'hardhat/config';
import 'hardhat-deploy';
import 'hardhat-deploy-ethers';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-web3';
import 'babel-polyfill';
import 'babel-register';
import '@typechain/hardhat';
import './stacktical-plugin';
import './type-extensions';
import {
  HardhatRuntimeEnvironment,
  HardhatUserConfig,
  Network,
} from 'hardhat/types';

const developStacktical: StackticalConfiguration = {
  chainlink: {
    isProduction: false,
    deleteOldJobs: true,
    nodeFunds: '10',
    gasLimit: undefined,
    ethWsUrl: 'ws://host.docker.internal:8545',
    ethHttpUrl: 'http://host.docker.internal:8545',
    nodesConfiguration: [
      {
        name: 'develop-1',
        restApiUrl: 'http://localhost',
        restApiPort: '6688',
        email: 'test@stacktical.com',
        password: 'PaSSword123456',
        externalAdapterUrl: 'http://host.docker.internal:6060',
      },
    ],
  },
  addresses: {},
  checkPastPeriods: false,
  bootstrap: {
    allowance: [
      {
        contract: CONTRACT_NAMES.NetworkAnalytics,
        token: CONTRACT_NAMES.LinkToken,
        allowance: '10',
      },
      {
        contract: CONTRACT_NAMES.SEMessenger,
        token: CONTRACT_NAMES.LinkToken,
        allowance: '10',
      },
    ],
    messengers: {
      networkAnalytics: {
        allowedNetworks: SENetworkNames,
      },
    },
    registry: {
      periods: [
        {
          periodType: PERIOD_TYPE.HOURLY,
          amountOfPeriods: 5,
          expiredPeriods: 2,
        },
        {
          periodType: PERIOD_TYPE.DAILY,
          amountOfPeriods: 5,
          expiredPeriods: 2,
        },
        {
          periodType: PERIOD_TYPE.WEEKLY,
          amountOfPeriods: 52,
          expiredPeriods: 10,
        },
      ],
      stake: {
        allowedTokens: [CONTRACT_NAMES.DAI, CONTRACT_NAMES.USDC],
        stakingParameters: {},
      },
      messengers: [
        {
          contract: CONTRACT_NAMES.SEMessenger,
          specificationPath: `${appRoot.path}/messenger-specs/${CONTRACT_NAMES.SEMessenger}.json`,
        },
      ],
    },
  },
  scripts: {
    deploy_sla: {
      sloValue: 50 * 10 ** 3,
      sloType: SLO_TYPE.GreaterThan,
      whitelisted: false,
      periodType: PERIOD_TYPE.WEEKLY,
      initialPeriodId: 0,
      finalPeriodId: 10,
      extraData: [SENetworkNamesBytes32[SENetworks.DOT]],
      initialTokenSupply: '10000000',
      initialTokenSupplyDivisor: 100,
      leverage: 50,
      deployerStakeTimes: 100,
      notDeployerStakeTimes: 2,
      serviceMetadata: {
        serviceName: 'P-OPS',
        serviceDescription: 'Official bDSLA Beta Partner.',
        serviceImage:
          'https://storage.googleapis.com/bdsla-incentivized-beta/validators/chainode.svg',
        serviceURL: 'https://bdslaToken.network',
        serviceAddress: 'validator-address',
        serviceTicker: SENetworkNames[SENetworks.DOT],
      },
    },
  },
};

const config: HardhatUserConfig = {
  // defaultNetwork: NETWORKS.DEVELOP,
  networks: {
    hardhat: {
      chainId: 1337,
      accounts: {
        mnemonic: process.env.DEVELOP_MNEMONIC,
      },
      saveDeployments: true,
      mining: {
        auto: true,
      },
      stacktical: developStacktical,
    },
    [NETWORKS.DEVELOP]: {
      chainId: 1337,
      accounts: {
        mnemonic: process.env.DEVELOP_MNEMONIC,
      },
      url: 'http://localhost:8545',
      stacktical: developStacktical,
    },
    [NETWORKS.ETHEREUM]: {
      chainId: 1,
      accounts: {
        mnemonic: process.env.MAINNET_MNEMONIC,
      },
      url: process.env.ETHEREUM_URI,
      stacktical: {
        chainlink: {
          isProduction: true,
          deleteOldJobs: false,
          nodeFunds: '1',
          gasLimit: undefined,
          ethWsUrl: process.env.ETHEREUM_WS_URI,
          nodesConfiguration: developStacktical.chainlink.nodesConfiguration,
        },
        addresses: {
          [CONTRACT_NAMES.DSLA]: '0x3aFfCCa64c2A6f4e3B6Bd9c64CD2C969EFd1ECBe',
          [CONTRACT_NAMES.DAI]: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
          [CONTRACT_NAMES.USDC]: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
          [CONTRACT_NAMES.Oracle]: '0x972614782a893ad3139418Ef00e17fE95896A7c6',
          [CONTRACT_NAMES.LinkToken]:
            '0x514910771af9ca656af840dff83e8264ecf986ca',
          [CONTRACT_NAMES.SLORegistry]:
            '0x1bE60A36Ba9De2eCeFe8be8d2720B67f932EC487',
          [CONTRACT_NAMES.SLARegistry]:
            '0xB63a13825e129fBa2f2205847158461bec5f265A',
          [CONTRACT_NAMES.MessengerRegistry]:
            '0x766C0b52fADC43Bc3EEAe8BC64536404981951bE',
          [CONTRACT_NAMES.PeriodRegistry]:
            '0x5Da279bE9D6CeB11e7D7117915075066909357bc',
          [CONTRACT_NAMES.StakeRegistry]:
            '0x4b48AdDd838A11061cE285106f4a30cc5636735C',
          [CONTRACT_NAMES.SEMessenger]:
            '0xFB29aFC3F4B78755f07faD5B86448595D2EEC86C',
          [CONTRACT_NAMES.NetworkAnalytics]:
            '0xC33492F8D76918A9527165A9fD71089980656357',
          [CONTRACT_NAMES.Details]:
            '0x38b0cd8BB4C4608E32EE75b25A8846459cEAd513',
          [CONTRACT_NAMES.PreCoordinator]:
            '0x7db551Ce6677211309db39A67F73cA923e9d4944',
        },
        checkPastPeriods: true,
        bootstrap: {
          messengers: {
            networkAnalytics: {
              allowedNetworks: SENetworkNames,
            },
          },
          allowance: [
            {
              contract: CONTRACT_NAMES.NetworkAnalytics,
              token: CONTRACT_NAMES.LinkToken,
              allowance: '10',
            },
            {
              contract: CONTRACT_NAMES.SEMessenger,
              token: CONTRACT_NAMES.LinkToken,
              allowance: '10',
            },
          ],
          registry: {
            periods: [
              {
                periodType: PERIOD_TYPE.WEEKLY,
                amountOfPeriods: 52,
                expiredPeriods: 0,
              },
            ],
            stake: {
              allowedTokens: [CONTRACT_NAMES.DAI, CONTRACT_NAMES.USDC],
              stakingParameters: {},
            },
            messengers: [
              {
                contract: CONTRACT_NAMES.SEMessenger,
                specificationPath: `${appRoot.path}/messenger-specs/${CONTRACT_NAMES.SEMessenger}`,
              },
            ],
          },
        },
        scripts: {
          deploy_sla: developStacktical.scripts.deploy_sla,
        },
      },
    },
    [NETWORKS.POLYGON]: {
      chainId: 137,
      accounts: {
        mnemonic: process.env.MAINNET_MNEMONIC,
      },
      url: process.env.POLYGON_URI,
      stacktical: {
        chainlink: {
          isProduction: true,
          deleteOldJobs: true,
          nodeFunds: '1',
          gasLimit: undefined,
          ethWsUrl: process.env.POLYGON_WS_URI,
          nodesConfiguration: developStacktical.chainlink.nodesConfiguration,
        },
        addresses: {
          [CONTRACT_NAMES.DSLA]: '0xa0E390e9ceA0D0e8cd40048ced9fA9EA10D71639',
          [CONTRACT_NAMES.DAI]: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
          [CONTRACT_NAMES.USDC]: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
          [CONTRACT_NAMES.SLORegistry]:
            '0x0b1cfF33ad49690dB0Eb0bc17429613969C7dDcF',
          [CONTRACT_NAMES.SLARegistry]:
            '0xf41EaA49BBae8650f051100d4385d5d7F9af4a54',
          [CONTRACT_NAMES.MessengerRegistry]:
            '0x8993F44B7Ee14446B12B6D879c325E3Cd624653B',
          [CONTRACT_NAMES.PeriodRegistry]:
            '0xEF12BDcF5E5D5ae4c950a9FaEb2A274d1646b48D',
          [CONTRACT_NAMES.StakeRegistry]:
            '0xc5C890444975f2211F84d3b543355f8DC74a6069',
          [CONTRACT_NAMES.SEMessenger]:
            '0x3eBe46d0d873B635D1e003BEe76de67cE2F3a584',
          [CONTRACT_NAMES.NetworkAnalytics]:
            '0x2f5F25F158cb7Ae0BF1f7eBfDF4ed9A58E3BcB58',
          [CONTRACT_NAMES.Details]:
            '0x857533E7d9DE216E8BdBd1620018099B88cDD792',
          [CONTRACT_NAMES.PreCoordinator]:
            '0x6e782e2c3f42003eE56d30BdD269555738A39e4A',
          [CONTRACT_NAMES.StringUtils]:
            '0x143c0e6cB35AC53C7f06d4914199E4cAc3977AC7',
          [CONTRACT_NAMES.LinkToken]:
            '0xb0897686c545045afc77cf20ec7a532e3120e0f1',
          [CONTRACT_NAMES.Oracle]: '0x99F4e62a317cc666589c9e370c73c15B158f3c61',
        },
        checkPastPeriods: true,
        bootstrap: {
          messengers: {
            networkAnalytics: {
              allowedNetworks: SENetworkNames,
            },
          },
          allowance: [
            {
              contract: CONTRACT_NAMES.NetworkAnalytics,
              token: CONTRACT_NAMES.LinkToken,
              allowance: '10',
            },
            {
              contract: CONTRACT_NAMES.SEMessenger,
              token: CONTRACT_NAMES.LinkToken,
              allowance: '10',
            },
          ],
          registry: {
            periods: [
              {
                periodType: PERIOD_TYPE.WEEKLY,
                amountOfPeriods: 52,
                expiredPeriods: 0,
              },
            ],
            stake: {
              allowedTokens: [CONTRACT_NAMES.DAI, CONTRACT_NAMES.USDC],
              stakingParameters: {},
            },
            messengers: [
              {
                contract: CONTRACT_NAMES.SEMessenger,
                specificationPath: `${appRoot.path}/messenger-specs/${CONTRACT_NAMES.SEMessenger}`,
              },
            ],
          },
        },
        scripts: {
          deploy_sla: developStacktical.scripts.deploy_sla,
        },
      },
    },
    [NETWORKS.HARMONYTESTNET]: {
      chainId: 1666700000,
      gas: 12000000,
      gasPrice: 1000000000,
      accounts: {
        mnemonic: process.env.TESTNET_MNEMONIC,
      },
      url: process.env.HARMONYTESTNET_URI,
      saveDeployments: true,
      stacktical: {
        chainlink: {
          isProduction: false,
          deleteOldJobs: false,
          nodeFunds: '0.001',
          gasLimit: undefined,
          ethWsUrl: process.env.HARMONYTESTNET_WS_URI,
          nodesConfiguration: developStacktical.chainlink.nodesConfiguration,
        },
        addresses: {},
        checkPastPeriods: false,
        bootstrap: {
          messengers: {
            networkAnalytics: {
              allowedNetworks: SENetworkNames,
            },
          },
          allowance: [
            {
              contract: CONTRACT_NAMES.NetworkAnalytics,
              token: CONTRACT_NAMES.LinkToken,
              allowance: '10',
            },
            {
              contract: CONTRACT_NAMES.SEMessenger,
              token: CONTRACT_NAMES.LinkToken,
              allowance: '10',
            },
          ],
          registry: {
            periods: [
              {
                periodType: PERIOD_TYPE.HOURLY,
                amountOfPeriods: 5,
                expiredPeriods: 2,
              },
              {
                periodType: PERIOD_TYPE.DAILY,
                amountOfPeriods: 5,
                expiredPeriods: 2,
              },
              {
                periodType: PERIOD_TYPE.WEEKLY,
                amountOfPeriods: 52,
                expiredPeriods: 10,
              },
            ],
            stake: {
              allowedTokens: [CONTRACT_NAMES.DAI, CONTRACT_NAMES.USDC],
              stakingParameters: {},
            },
            messengers: [
              {
                contract: CONTRACT_NAMES.SEMessenger,
                specificationPath: `${appRoot.path}/messenger-specs/${CONTRACT_NAMES.SEMessenger}`,
              },
            ],
          },
        },
        scripts: {
          deploy_sla: developStacktical.scripts.deploy_sla,
        },
      },
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.6.6',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.4.24',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.4.11',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  paths: {
    sources: 'contracts',
    deploy: 'deploy',
    deployments: 'deployments',
    imports: './build/contracts',
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    notDeployer: {
      default: 1,
    },
  },
};

extendEnvironment((env) => {
  networkFromConfig(env, env.network);
});

function networkFromConfig(env: HardhatRuntimeEnvironment, network: Network) {
  network.stacktical = env.network.stacktical;
}

module.exports = config;
