import { extendConfig } from 'hardhat/config';
import { HardhatConfig, HardhatUserConfig } from 'hardhat/types';

import './type-extensions';

extendConfig(
  (config: HardhatConfig, userConfig: Readonly<HardhatUserConfig>) => {
    Object.keys(userConfig.networks).forEach((network) => {
      if (userConfig.networks[network]['stacktical']) {
        config.networks[network]['stacktical'] =
          userConfig.networks[network]['stacktical'];
      }
    });
  }
);
