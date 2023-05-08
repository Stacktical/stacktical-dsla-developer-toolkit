import * as hardhat from 'hardhat';

const Joi = require('joi');
require('dotenv').config();

const schema = Joi.object(
  Object.keys(hardhat.config.networks)
    .filter((network) => !['hardhat', 'localhost'].includes(network))
    .reduce(
      (r, network) => ({
        ...r,
        [`${network.toUpperCase()}_URI`]: Joi.string().uri().required(),
      }),
      { IPFS_GATEWAY_URI: Joi.string().uri().required() }
    )
).unknown();

const { error } = schema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
