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
  // Needs to match the correspondig Oracle .sol file
  BaseOracle = 'BaseOracle',
  AssetFloorOracle = 'AssetFloorOracle',
  AssetPegOracle = 'AssetPegOracle',
  StakingRewardsOracle = 'StakingRewardsOracle',
  StakingUptimeOracle = 'StakingUptimeOracle',
  InflationOracle = 'InflationOracle',
  StakingParametricOracle = 'StakingParametricOracle',
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

// Matches the messenger' folder name
export enum USE_CASES {
  STAKING_REWARDS = 'staking-rewards',
  STAKING_UPTIME = 'staking-uptime',
  BASE_MESSENGER = 'base',
  ASSET_PEG = 'asset-peg',
  ASSET_FLOOR = 'asset-floor',
  INFLATION = 'inflation-rate',
  STAKING_PARAMETRIC = 'staking-parametric',
}

export const STAKING_REWARDS_SPECS = JSON.parse(
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

const STAKING_PARAMETRIC_SPECS = JSON.parse(
  // @ts-ignore
  fs.readFileSync(
    `${appRoot.path}/contracts/messengers/${USE_CASES.STAKING_PARAMETRIC}/use-case-spec.json`
  )
);

export enum NETWORKS {
  DEVELOP = 'develop',
  DEVELOP_AVALANCHE = 'develop_avalanche',
  MUMBAI = 'mumbai',
  HARMONYTESTNET = 'harmonytestnet',
  ETHEREUM = 'ethereum',
  ETHEREUMV2 = 'ethereumv2',
  POLYGON = 'polygon',
  POLYGONV2 = 'polygonv2',
  HARMONY = 'harmony',
  FANTOM = 'fantom',
  AVALANCHE = 'avalanche',
  AVALANCHEV2 = 'avalanchev2',
  ARBITRUMNOVA = 'arbitrumnova',
  ARBITRUMV2 = 'arbitrumv2',
  ARBITRUMTESTNETV2 = 'arbitrumtestnetv2',
  ARBITRUMTESTNET = 'arbitrumtestnet',
  KOVAN = 'kovan',
  FUJI = 'fuji',
  RINKEBY = 'rinkeby',
  BSC = 'bsc',
}

export const GRAPH_NETWORKS = {
  [NETWORKS.DEVELOP]: 'mainnet',
  [NETWORKS.DEVELOP_AVALANCHE]: 'mainnet',
  [NETWORKS.ETHEREUM]: 'mainnet',
  [NETWORKS.ETHEREUMV2]: 'mainnet',
  [NETWORKS.HARMONY]: 'mainnet',
  [NETWORKS.FANTOM]: 'mainnet',
  [NETWORKS.HARMONYTESTNET]: 'testnet',
  [NETWORKS.MUMBAI]: 'mumbai',
  [NETWORKS.POLYGON]: 'polygon',
  [NETWORKS.POLYGONV2]: 'polygon',
  [NETWORKS.AVALANCHE]: 'avalanche',
  [NETWORKS.AVALANCHEV2]: 'avalanche',
  [NETWORKS.ARBITRUMNOVA]: 'arbitrumnova',
  [NETWORKS.ARBITRUMV2]: 'arbitrum',
  [NETWORKS.ARBITRUMTESTNET]: 'arbitrumtestnet',
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
  BASE: {
    DSLA_LP: {
      name: "Dummy Service Credit",
      symbol: "🔺FOO",
    },
    DSLA_SP: {
      name: "Dummy Service Credit",
      symbol: "🔻BAR",
    },
  },
  STAKING_REWARDS: {
    DSLA_LP: {
      name: STAKING_REWARDS_SPECS.lp.name,
      symbol: STAKING_REWARDS_SPECS.lp.symbol,
    },
    DSLA_SP: {
      name: STAKING_REWARDS_SPECS.sp.name,
      symbol:  STAKING_REWARDS_SPECS.sp.symbol,
    },
  },
  STAKING_UPTIME: {
    DSLA_LP: {
      name: STAKING_UPTIME_SPECS.lp.name,
      symbol: STAKING_UPTIME_SPECS.lp.symbol,
    },
    DSLA_SP: {
      name: STAKING_UPTIME_SPECS.sp.name,
      symbol: STAKING_UPTIME_SPECS.sp.symbol,
    },
  },
  INFLATION: {
    DSLA_LP: {
      name: INFLATION_SPECS.lp.name,
      symbol: INFLATION_SPECS.lp.symbol,
    },
    DSLA_SP: {
      name: INFLATION_SPECS.sp.name,
      symbol: INFLATION_SPECS.sp.symbol,
    },
  },
  ASSET_PEG: {
    DSLA_LP: {
      name: ASSET_PEG_SPECS.lp.name,
      symbol: ASSET_PEG_SPECS.lp.symbol,
    },
    DSLA_SP: {
      name: ASSET_PEG_SPECS.sp.name,
      symbol: ASSET_PEG_SPECS.sp.symbol,
    },
  },
  ASSET_FLOOR: {
    DSLA_LP: {
      name: ASSET_FLOOR_SPECS.lp.name,
      symbol: ASSET_FLOOR_SPECS.lp.symbol,
    },
    DSLA_SP: {
      name: ASSET_FLOOR_SPECS.sp.name,
      symbol: ASSET_FLOOR_SPECS.sp.symbol,
    },
  },
  STAKING_PARAMETRIC: {
    DSLA_LP: {
      name: STAKING_PARAMETRIC_SPECS.lp.name,
      symbol: STAKING_PARAMETRIC_SPECS.lp.symbol,
    },
    DSLA_SP: {
      name: STAKING_PARAMETRIC_SPECS.sp.name,
      symbol: STAKING_PARAMETRIC_SPECS.sp.symbol,
    },
  },
};
