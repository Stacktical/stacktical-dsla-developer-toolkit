import { extendConfig } from 'hardhat/config';
import { HardhatConfig, HardhatUserConfig } from 'hardhat/types';

import './type-extensions';

const Joi = require('joi');
require('dotenv').config({ path: '../.env' });

const schema = Joi.object({
  IPFS_URI: Joi.string().required(),
}).unknown();

const { error, value } = schema.validate(process.env);

if (error) {
  throw new Error(`global .env file validation error: ${error.message}`);
} else {
  process.env = value;
}

extendConfig(
  (config: HardhatConfig, userConfig: Readonly<HardhatUserConfig>) => {
    Object.keys(userConfig.networks).forEach((network) => {
      const stackticalConfig = userConfig.networks[network]['stacktical'];
      // Check if potentially env parameters fields (private data such as credentials) is parsed correctly before executing
      if (stackticalConfig) {
        const schema = Joi.object({
          ipfs: Joi.string().required(),
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
        const { error } = schema.validate(stackticalConfig);
        if (error) {
          throw new Error(
            `Config validation error for network ${network}: ${error.message}`
          );
        }
        if (!stackticalConfig.deployTokens) {
          const undefTokenAddress = stackticalConfig.tokens.find(
            (token) => token.address === undefined
          );
          if (undefTokenAddress) {
            throw new Error(
              undefTokenAddress.name +
                ' token has no address in ' +
                network +
                ' network config'
            );
          }
        }
        if (
          new Set(
            stackticalConfig.messengers.map(
              (messenger) => messenger.useCaseName
            )
          ).size !== stackticalConfig.messengers.length
        ) {
          throw new Error(
            'Messenger use case name repeated for network ' + network
          );
        }
        config.networks[network]['stacktical'] =
          userConfig.networks[network]['stacktical'];
      }
    });
  }
);
