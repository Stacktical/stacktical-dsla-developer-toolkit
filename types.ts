import { CONTRACT_NAMES, PERIOD_TYPE, SLO_TYPE } from './constants';

export type StackticalConfiguration = {
  chainlink?: ChainlinkConfiguration;
  checkPastPeriods: boolean;
  addresses: {
    tokens: {
      LINK: string | null;
      DSLA: string | null;
      DAI: string | null;
      USDC: string | null;
    };
    oracle: string | null;
  };
  bootstrap: {
    allowance: Array<TokenAllowance>;
    messengers: {
      networkAnalytics: {
        allowedNetworks: Array<string>;
      };
    };
    registry: {
      periods: Array<PeriodBootstrapDefinition>;
      messengers: Array<MessengerDefinition>;
      stake: {
        allowedTokens: Array<CONTRACT_NAMES>;
        stakingParameters?: {
          DSLAburnRate?: string;
          dslaDepositByPeriod?: string;
          dslaPlatformReward?: string;
          dslaMessengerReward?: string;
          dslaUserReward?: string;
          dslaBurnedByVerification?: string;
          maxTokenLength?: string;
          maxLeverage?: string;
        };
      };
    };
  };
  scripts?: {
    deploy_sla?: DeploySLAConfiguration;
  };
};

export type PeriodBootstrapDefinition = {
  periodType: number;
  amountOfPeriods: number;
  expiredPeriods: number;
};

export type ChainlinkConfiguration = {
  isProduction: boolean;
  nodeFunds: string;
  ethWsUrl: string;
  ethHttpUrl?: string;
  gasLimit?: string;
  externalAdapterUrL?: string;
  nodesConfiguration: Array<ChainlinkNodeConfiguration>;
};

export type ChainlinkNodeConfiguration = {
  name: string;
  restApiUrl: string;
  restApiPort: string;
  email: string;
  password: string;
  externalAdapterUrl: string;
};

export type PreCoordinatorConfiguration = {
  oracles: Array<string>;
  jobIds: Array<string>;
  payments: Array<string>;
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
