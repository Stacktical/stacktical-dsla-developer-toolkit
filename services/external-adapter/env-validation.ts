import hardhat from 'hardhat';

const Joi = require('joi');
require('dotenv').config();

const networksObject = Object.keys(hardhat.config.networks)
  .filter((network) => !['hardhat', 'localhost'].includes(network))
  .reduce(
    (r, network) => ({
      ...r,
      [`${network.toUpperCase()}_URI`]: Joi.string().uri().required(),
    }),
    {}
  );

const schema = Joi.object({
  IPFS_URI: Joi.string().uri().required(),
  ...networksObject,
}).unknown();

const { error } = schema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
