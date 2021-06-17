import { NETWORKS } from './constants';

export const enabledNetworks = [
  { name: NETWORKS.DEVELOP, enabled: true },
  { name: NETWORKS.KOVAN, enabled: false },
  { name: NETWORKS.MUMBAI, enabled: false },
  { name: NETWORKS.HARMONYTESTNET, enabled: false },
  { name: NETWORKS.ETHEREUM, enabled: false },
  { name: NETWORKS.HARMONY, enabled: false },
  { name: NETWORKS.POLYGON, enabled: false },
];
