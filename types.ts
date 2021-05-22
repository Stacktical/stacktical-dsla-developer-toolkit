import { PERIOD_TYPE, SLO_TYPE } from './constants';

export type StackticalConfiguration = {
  chainlink?: ChainlinkConfiguration;
  checkPastPeriods: boolean;
  addresses: {
    tokens: {
      LINK?: string | null;
      DSLA?: string | null;
      DAI?: string | null;
      USDC?: string | null;
    };
    oracle?: string | null;
  };
  bootstrap: {
    periods: Array<PeriodBootstrapDefinition>;
    messengersLinkTokenAllowance: string;
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
  email: string;
  password: string;
  externalAdapterUrl: string;
};

export type PreCoordinatorConfiguration = {
  oracles: Array<string>;
  jobIds: Array<string>;
  payments: Array<string>;
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
