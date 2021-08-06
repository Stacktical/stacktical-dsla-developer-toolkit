import { NETWORKS } from '../constants';

export const networks = [
  { name: NETWORKS.DEVELOP, enabled: true, exportable: true },
  { name: NETWORKS.KOVAN, enabled: true, exportable: true },
  { name: NETWORKS.MUMBAI, enabled: true, exportable: false },
  { name: NETWORKS.HARMONYTESTNET, enabled: false, exportable: false },
  { name: NETWORKS.ETHEREUM, enabled: true, exportable: true },
  { name: NETWORKS.HARMONY, enabled: true, exportable: true },
  { name: NETWORKS.POLYGON, enabled: true, exportable: false },
];
