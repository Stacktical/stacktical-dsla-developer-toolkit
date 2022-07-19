export const appRoot = require('app-root-path');

const fs = require('fs');

export enum CONTRACT_NAMES {
  DSLA = 'DSLA',
  DAI = 'DAI',
  USDC = 'USDC',
  USDT = 'USDT',
  WETH = 'WETH',
  WAVAX = 'WAVAX',
  WONE = 'WONE',
  WBNB = 'WBNB',
  WFTM = 'WFTM',
  WMATIC = 'WMATIC',
  WSTETH = 'WSTETH',
  ONE = 'ONE',
  ERC20 = 'ERC20',
  Details = 'Details',
  IMessenger = 'IMessenger',
  LinkToken = 'LinkToken',
  MessengerRegistry = 'MessengerRegistry',
  Oracle = 'Oracle',
  PeriodRegistry = 'PeriodRegistry',
  SLA = 'SLA',
  SLORegistry = 'SLORegistry',
  SLARegistry = 'SLARegistry',
  StakeRegistry = 'StakeRegistry',
  Staking = 'Staking',
  StringUtils = 'StringUtils',
  PreCoordinator = 'PreCoordinator',
  EthereumERC20 = 'EthereumERC20',
  HarmonyERC20 = 'HarmonyERC20',
  PolygonERC20 = 'PolygonERC20',
  AvalancheERC20 = 'AvalancheERC20',
  FantomERC20 = 'FantomERC20',
  FujiERC20 = 'FujiERC20',
  BaseOracle = 'BaseOracle',
  AssetFloorOracle = 'AssetFloorOracle',
  AssetPegOracle = 'AssetPegOracle',
  StakingRewardsOracle = 'StakingRewardsOracle',
  StakingUptimeOracle = 'StakingUptimeOracle',
  InflationOracle = 'InflationOracle',
}

export enum TOKEN_NAMES {
  DSLA = 'DSLA',
  DAI = 'DAI',
  USDC = 'USDC',
  USDT = 'USDT',
  WETH = 'WETH',
  WAVAX = 'WAVAX',
  WONE = 'WONE',
  WBNB = 'WBNB',
  WFTM = 'WFTM',
  WMATIC = 'WMATIC',
  WSTETH = 'WSTETH',
}

export enum DEPLOYMENT_TAGS {
  DSLA = 'dsla',
  Chainlink = 'chainlink',
  Services = 'services',
  Details = 'details',
  Messengers = 'messengers',
  DummyTokens = 'dummy-tokens',
}

export enum USE_CASES {
  STAKING_REWARDS = 'staking-apr',
  STAKING_UPTIME = 'staking-uptime',
  BASE_MESSENGER = 'base',
  ASSET_PEG = 'asset-peg',
  ASSET_FLOOR = 'asset-floor',
  INFLATION = 'inflation-rate',
}

const STAKING_REWARDS_SPECS = JSON.parse(
  // @ts-ignore
  fs.readFileSync(
    `${appRoot.path}/contracts/messengers/${USE_CASES.STAKING_REWARDS}/use-case-spec.json`
  )
);

const STAKING_UPTIME_SPECS = JSON.parse(
  // @ts-ignore
  fs.readFileSync(
    `${appRoot.path}/contracts/messengers/${USE_CASES.STAKING_UPTIME}/use-case-spec.json`
  )
);

const ASSET_PEG_SPECS = JSON.parse(
  // @ts-ignore
  fs.readFileSync(
    `${appRoot.path}/contracts/messengers/${USE_CASES.ASSET_PEG}/use-case-spec.json`
  )
);

const ASSET_FLOOR_SPECS = JSON.parse(
  // @ts-ignore
  fs.readFileSync(
    `${appRoot.path}/contracts/messengers/${USE_CASES.ASSET_FLOOR}/use-case-spec.json`
  )
);

const INFLATION_SPECS = JSON.parse(
  // @ts-ignore
  fs.readFileSync(
    `${appRoot.path}/contracts/messengers/${USE_CASES.INFLATION}/use-case-spec.json`
  )
);

export enum NETWORKS {
  DEVELOP = 'develop',
  DEVELOP_AVALANCHE = 'develop_avalanche',
  MUMBAI = 'mumbai',
  HARMONYTESTNET = 'harmonytestnet',
  ETHEREUM = 'ethereum',
  POLYGON = 'polygon',
  HARMONY = 'harmony',
  FANTOM = 'fantom',
  AVALANCHE = 'avalanche',
  KOVAN = 'kovan',
  FUJI = 'fuji',
  RINKEBY = 'rinkeby',
  BSC = 'bsc',
}

export const GRAPH_NETWORKS = {
  [NETWORKS.DEVELOP]: 'mainnet',
  [NETWORKS.DEVELOP_AVALANCHE]: 'mainnet',
  [NETWORKS.ETHEREUM]: 'mainnet',
  [NETWORKS.HARMONY]: 'mainnet',
  [NETWORKS.FANTOM]: 'mainnet',
  [NETWORKS.HARMONYTESTNET]: 'testnet',
  [NETWORKS.MUMBAI]: 'mumbai',
  [NETWORKS.POLYGON]: 'polygon',
  [NETWORKS.AVALANCHE]: 'avalanche',
  [NETWORKS.KOVAN]: 'kovan',
  [NETWORKS.FUJI]: 'fuji',
  [NETWORKS.RINKEBY]: 'rinkeby',
  [NETWORKS.BSC]: 'bsc',
};

export enum PERIOD_TYPE {
  HOURLY,
  DAILY,
  WEEKLY,
  BIWEEKLY,
  MONTHLY,
  YEARLY,
}

export enum PERIOD_STATUS {
  NotVerified,
  Respected,
  NotRespected,
}

export enum SLO_TYPE {
  EqualTo,
  NotEqualTo,
  SmallerThan,
  SmallerOrEqualTo,
  GreaterThan,
  GreaterOrEqualTo,
}

export enum PARAMS_NAMES {
  SLA_ADDRESS = 'slaAddress',
  INDEX = 'index',
  TRANSACTION_HASH = 'transactionHash',
}

export const SERVICE_CREDITS = {
  STAKING_REWARDS: {
    DSLA_LP: {
      name: STAKING_REWARDS_SPECS.name,
      symbol: STAKING_REWARDS_SPECS.symbol,
    },
    DSLA_SP: {
      name: STAKING_REWARDS_SPECS.name,
      symbol: 'APR.du',
    },
  },
  STAKING_UPTIME: {
    DSLA_LP: {
      name: 'Staking Uptime Credit',
      symbol: 'UPTIME.dp',
    },
    DSLA_SP: {
      name: 'Staking Uptime Credit',
      symbol: 'UPTIME.du',
    },
  },
  INFLATION: {
    DSLA_LP: {
      name: 'Inflation Credit',
      symbol: 'INFLATION.dp',
    },
    DSLA_SP: {
      name: 'Inflation Credit',
      symbol: 'INFLATION.du',
    },
  },
  ASSET_PEG: {
    DSLA_LP: {
      name: 'Peg Parity Credit',
      symbol: 'PEG.dp',
    },
    DSLA_SP: {
      name: 'Peg Parity Credit',
      symbol: 'PEG.du',
    },
  },
  ASSET_FLOOR: {
    DSLA_LP: {
      name: 'Floor Credit',
      symbol: 'FLOOR.dp',
    },
    DSLA_SP: {
      name: 'Floor Credit',
      symbol: 'FLOOR.du',
    },
  },
};
