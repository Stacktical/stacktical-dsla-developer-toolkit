import { NETWORKS } from '../constants';

export const networks = [
  { name: NETWORKS.DEVELOP, enabled: false, exportable: true },
  { name: NETWORKS.KOVAN, enabled: false, exportable: true },
  { name: NETWORKS.MUMBAI, enabled: false, exportable: false },
  { name: NETWORKS.HARMONYTESTNET, enabled: false, exportable: false },
  { name: NETWORKS.ETHEREUM, enabled: false, exportable: true },
  { name: NETWORKS.HARMONY, enabled: false, exportable: true },
  { name: NETWORKS.POLYGON, enabled: false, exportable: false },
  { name: NETWORKS.RINKEBY, enabled: false, exportable: true },
  { name: NETWORKS.BSC, enabled: true, exportable: true },
];
