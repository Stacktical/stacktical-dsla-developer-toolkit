import 'hardhat/types/config';
import 'hardhat/types/runtime';
import { StackticalConfiguration } from './types';

declare module 'hardhat/types/config' {
  interface HardhatNetworkUserConfig {
    stacktical?: StackticalConfiguration | undefined;
  }

  interface HttpNetworkUserConfig {
    stacktical?: StackticalConfiguration | undefined;
  }

  interface HardhatNetworkConfig {
    stacktical?: StackticalConfiguration | undefined;
  }

  interface HttpNetworkConfig {
    stacktical?: StackticalConfiguration | undefined;
  }

  interface HardhatNetworkUserConfig {
    stacktical?: StackticalConfiguration | undefined;
  }
}

declare module 'hardhat/types/runtime' {
  interface HardhatNetworkUserConfig {
    stacktical?: StackticalConfiguration | undefined;
  }
  interface Network {
    stacktical?: StackticalConfiguration | undefined;
  }
}
