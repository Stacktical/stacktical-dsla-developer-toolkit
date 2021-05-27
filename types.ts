import { CONTRACT_NAMES, PERIOD_TYPE, SLO_TYPE } from './constants';

export type StackticalConfiguration = {
  chainlink: ChainlinkConfiguration;
  checkPastPeriods: boolean;
  addresses: DeployedContractAddresses;
  bootstrap: BootstrapConfiguration;
  scripts?: ScriptsConfiguration;
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
  tokens: {
    LINK: string | null;
    DSLA: string | null;
    DAI: string | null;
    USDC: string | null;
  };
  oracle: string | null;
};

export type ChainlinkConfiguration = {
  isProduction: boolean;
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
  externalAdapterUrl: string;
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
    messengers: Array<MessengerDefinition>;
    stake: StakeBootstrapDefinition;
  };
  messengers: {
    networkAnalytics: {
      allowedNetworks: Array<string>;
    };
  };
};

export type StakeBootstrapDefinition = {
  allowedTokens: Array<CONTRACT_NAMES>;
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
  token: CONTRACT_NAMES;
  allowance: string;
};

export type MessengerDefinition = {
  contract: CONTRACT_NAMES;
  specificationPath: string;
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
