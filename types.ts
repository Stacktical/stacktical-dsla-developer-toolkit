import {
  CONTRACT_NAMES,
  PERIOD_TYPE,
  SLO_TYPE,
  TOKEN_NAMES,
} from './constants';

export type StackticalConfiguration = {
  burnDSLA: boolean;
  checkPastPeriods: boolean;
  tokens: Array<TokenConfiguration>;
  chainlink: ChainlinkConfiguration;
  addresses: DeployedContractAddresses;
  bootstrap: BootstrapConfiguration;
  scripts?: ScriptsConfiguration;
};

export type TokenConfiguration = {
  factory: any;
  name: TOKEN_NAMES;
  address?: string;
};

export type PeriodBootstrapDefinition = {
  periodType: PERIOD_TYPE;
  amountOfPeriods: number;
  expiredPeriods: number;
};

export type ScriptsConfiguration = {
  deploy_sla?: DeploySLAConfiguration;
};

export type DeployedContractAddresses = {
  [key: string]: string;
};

export type ChainlinkConfiguration = {
  isProduction: boolean;
  deleteOldJobs: boolean;
  nodeFunds: string;
  gasLimit?: string;
  ethWsUrl: string;
  ethHttpUrl?: string;
  nodesConfiguration: Array<ChainlinkNodeConfiguration>;
};

export type ChainlinkNodeConfiguration = {
  name: string;
  restApiUrl: string;
  restApiPort?: string;
  email: string;
  password: string;
};

export type PreCoordinatorConfiguration = {
  oracles: Array<string>;
  jobIds: Array<string>;
  payments: Array<string>;
};

export type BootstrapConfiguration = {
  allowance: Array<TokenAllowance>;
  registry: {
    periods: Array<PeriodBootstrapDefinition>;
    messengers: Array<MessengerConfiguration>;
    stake: StakeBootstrapDefinition;
  };
};

export type StakeBootstrapDefinition = {
  stakingParameters: {
    dslaDepositByPeriod?: string;
    dslaPlatformReward?: string;
    dslaMessengerReward?: string;
    dslaUserReward?: string;
    dslaBurnedByVerification?: string;
    maxTokenLength?: string;
    maxLeverage?: string;
  };
};

export type TokenAllowance = {
  contract: CONTRACT_NAMES;
  token: CONTRACT_NAMES | TOKEN_NAMES;
  allowance: string;
};

export type MessengerConfiguration = {
  contract: CONTRACT_NAMES;
  specificationPath: string;
  externalAdapterUrl: string;
  useCaseName: string;
};

export type DeploySLAConfiguration = {
  serviceMetadata: {
    serviceName: string;
    serviceDescription: string;
    serviceImage: string;
    serviceURL: string;
    serviceAddress: string;
    serviceTicker: string;
  };
  sloValue: number;
  sloType: SLO_TYPE;
  whitelisted: boolean;
  periodType: PERIOD_TYPE;
  initialPeriodId: number;
  finalPeriodId: number;
  extraData: Array<string>;
  leverage: number;
  initialTokenSupply: string;
  initialTokenSupplyDivisor: number;
  deployerStakeTimes: number;
  notDeployerStakeTimes: number;
};
