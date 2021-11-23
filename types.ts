import {
  CONTRACT_NAMES,
  PERIOD_TYPE,
  SLO_TYPE,
  TOKEN_NAMES,
  USE_CASES,
} from './constants';

export type StackticalConfiguration = {
  checkPastPeriods: boolean;
  deployTokens: boolean;
  tokens: Array<TokenConfiguration>;
  ipfs: string;
  chainlink: ChainlinkConfiguration;
  addresses: DeployedContractAddresses;
  bootstrap: BootstrapConfiguration;
  messengers: Array<MessengerConfiguration>;
  scripts: ScriptsConfiguration;
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
  deploy_sla?: Array<DeploySLAConfiguration>;
};

export type DeployedContractAddresses = {
  [key: string]: string;
};

export type ChainlinkConfiguration = {
  deployLocal: boolean;
  deleteOldJobs: boolean;
  cleanLocalFolder: boolean;
  nodeFunds: string;
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
    burnDSLA?: boolean;
  };
};

export type TokenAllowance = {
  contract: CONTRACT_NAMES;
  token: CONTRACT_NAMES | TOKEN_NAMES;
  allowance: string;
};

export type MessengerConfiguration = {
  contract: CONTRACT_NAMES;
  useCaseName: USE_CASES;
  externalAdapterUrl: string;
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
  periodType: PERIOD_TYPE;
  initialPeriodId: number;
  finalPeriodId: number;
  leverage: number;
  messengerContract: CONTRACT_NAMES;
  whitelisted: boolean;
  extraData: Array<string>;
  initialTokenSupply: string;
  initialTokenSupplyDivisor: number;
  deployerStakeTimes: number;
  notDeployerStakeTimes: number;
};
