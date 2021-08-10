import { NETWORKS } from '../constants';

export const networks = [
  { name: NETWORKS.DEVELOP, enabled: true, exportable: true },
  { name: NETWORKS.KOVAN, enabled: true, exportable: true },
  { name: NETWORKS.MUMBAI, enabled: false, exportable: false },
  { name: NETWORKS.HARMONYTESTNET, enabled: false, exportable: false },
  { name: NETWORKS.ETHEREUM, enabled: false, exportable: true },
  { name: NETWORKS.HARMONY, enabled: false, exportable: true },
  { name: NETWORKS.POLYGON, enabled: false, exportable: false },
  { name: NETWORKS.RINKEBY, enabled: true, exportable: true },
];
