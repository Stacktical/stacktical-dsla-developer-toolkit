export const networkNames = {
  DEVELOP: 'develop',
  KOVAN: 'kovan',
  MAINNET: 'mainnet',
  HARMONYTESTNET: 'harmonytestnet',
};

export const environments = {
  [networkNames.DEVELOP]: {
    oracleAddress: '0x254dffcd3277C0b1660F6d42EFbB754edaBAbC2B',
    linkTokenAddress: '0xCfEB869F69431e42cdB54A4F4f105C19C080A601',
    chainlinkNodeFunds: '1000',
    gas: undefined,
  },
  [networkNames.HARMONYTESTNET]: {
    oracleAddress: '0x9b1f7F645351AF3631a656421eD2e40f2802E6c0',
    linkTokenAddress: '0x0290FB167208Af455bB137780163b7B7a9a10C16',
    chainlinkNodeFunds: '1',
    gas: 12000000,
  },
};

export const getEnvFromNodeEnv = () => environments[process.env.NODE_ENV];
