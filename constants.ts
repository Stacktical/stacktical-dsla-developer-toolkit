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
  SEMessenger = 'SEMessenger',
  SEAMessenger = 'SEAMessenger',
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
  BaseMessenger = 'BaseMessenger',
  PPMessenger = 'PPMessenger',
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
  STAKING_EFFICIENCY = 'staking-efficiency',
  STAKING_EFFICIENCY_ALT = 'staking-efficiency-alt',
  BASE_MESSENGER = 'base-messenger',
  PAR_PEG = 'par-peg-messenger',
}

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
export const appRoot = require('app-root-path');
