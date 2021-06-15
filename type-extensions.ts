import 'hardhat/types/config';
import 'hardhat/types/runtime';
import { StackticalConfiguration } from './types';

declare module 'hardhat/types/config' {
  interface HardhatNetworkUserConfig {
    stacktical?: StackticalConfiguration;
  }

  interface HttpNetworkUserConfig {
    stacktical?: StackticalConfiguration;
  }

  interface HardhatNetworkConfig {
    stacktical?: StackticalConfiguration;
  }

  interface HttpNetworkConfig {
    stacktical?: StackticalConfiguration;
  }

  interface HardhatNetworkUserConfig {
    stacktical?: StackticalConfiguration;
  }
}

declare module 'hardhat/types/runtime' {
  interface HardhatNetworkUserConfig {
    stacktical?: StackticalConfiguration;
  }
  interface Network {
    stacktical?: StackticalConfiguration;
  }
}
