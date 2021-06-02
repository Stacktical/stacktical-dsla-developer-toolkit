import { formatBytes32String } from 'ethers/lib/utils';

// SEMessenger configuration
export enum SENetworks {
  ONE,
  DOT,
  ATOM,
  BAND,
  eGLD,
  XTZ,
  AVAX,
  ROSE,
}

export const SENetworkNames = Object.keys(SENetworks).filter((key: any) =>
  isNaN(key)
);
export const SENetworkNamesBytes32 = SENetworkNames.map(formatBytes32String);

export enum CONTRACT_NAMES {
  DSLA = 'DSLA',
  DAI = 'DAI',
  USDC = 'USDC',
  ERC20 = 'ERC20',
  Details = 'Details',
  IMessenger = 'IMessenger',
  LinkToken = 'LinkToken',
  MessengerRegistry = 'MessengerRegistry',
  NetworkAnalytics = 'NetworkAnalytics',
  Oracle = 'Oracle',
  PeriodRegistry = 'PeriodRegistry',
  SEMessenger = 'SEMessenger',
  SLA = 'SLA',
  SLORegistry = 'SLORegistry',
  SLARegistry = 'SLARegistry',
  StakeRegistry = 'StakeRegistry',
  Staking = 'Staking',
  StringUtils = 'StringUtils',
  PreCoordinator = 'PreCoordinator',
}

export enum TOKEN_NAMES {
  DSLA = 'DSLA',
  DAI = 'DAI',
  USDC = 'USDC',
}

export enum DEPLOYMENT_TAGS {
  DSLA = 'dsla',
  Chainlink = 'chainlink',
  Services = 'services',
  Details = 'details',
}

export enum NETWORKS {
  DEVELOP = 'develop',
  MUMBAI = 'mumbai',
  HARMONYTESTNET = 'harmonytestnet',
  ETHEREUM = 'ethereum',
  POLYGON = 'polygon',
}

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
