import { extendConfig } from 'hardhat/config';
import { HardhatConfig, HardhatUserConfig } from 'hardhat/types';

import './type-extensions';
import Joi from 'joi';

extendConfig(
  (config: HardhatConfig, userConfig: Readonly<HardhatUserConfig>) => {
    Object.keys(userConfig.networks).forEach((network) => {
      const networkDefinition = userConfig.networks[network]['stacktical'];
      // Check if potentially env parameters fields (private data such as credentials) is parsed correctly before executing
      if (networkDefinition) {
        const schema = Joi.object({
          chainlink: Joi.object({
            ethWsUrl: Joi.string().required(),
            nodesConfiguration: Joi.array().items(
              Joi.object({
                name: Joi.string().required(),
                restApiUrl: Joi.string().required(),
                restApiPort: Joi.string().required(),
                email: Joi.string().required(),
                password: Joi.string().required(),
              })
            ),
          }).unknown(),
        }).unknown();
        const { error } = schema.validate(networkDefinition);
        if (error) {
          throw new Error(
            `Config validation error for network ${network}: ${error.message}`
          );
        }

        config.networks[network]['stacktical'] =
          userConfig.networks[network]['stacktical'];
      }
    });
  }
);
