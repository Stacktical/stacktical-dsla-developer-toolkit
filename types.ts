import { PERIOD_TYPE, SLO_TYPE } from './constants';

export type StackticalConfiguration = {
  web3WebsocketProviderUrl: string;
  productionChainlinkNode?: ChainlinkNodeConfiguration;
  developChainlinkNode?: ChainlinkNodeConfiguration;
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

export type ChainlinkNodeConfiguration = {
  funds: string;
  ethUrl: string;
  gasLimit?: string;
  externalAdapterUrL?: string;
  preCoordinatorConfiguration?: PreCoordinatorConfiguration;
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
