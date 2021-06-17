const Joi = require('joi');
require('dotenv').config();

const schema = Joi.object({
  IPFS_URI: Joi.string().required(),

  MAINNET_MNEMONIC: Joi.string().required(),
  TESTNET_MNEMONIC: Joi.string().required(),
  DEVELOP_MNEMONIC: Joi.string().required(),

  MUMBAI_URI: Joi.string().required(),
  MUMBAI_WS_URI: Joi.string().required(),
  POLYGON_URI: Joi.string().required(),
  POLYGON_WS_URI: Joi.string().required(),
  HARMONYTESTNET_URI: Joi.string().required(),
  HARMONYTESTNET_WS_URI: Joi.string().required(),
  HARMONY_URI: Joi.string().required(),
  HARMONY_WS_URI: Joi.string().required(),
  DEVELOP_URI: Joi.string().required(),
  DEVELOP_WS_URI: Joi.string().required(),
  ETHEREUM_URI: Joi.string().required(),
  ETHEREUM_WS_URI: Joi.string().required(),
  KOVAN_URI: Joi.string().required(),
  KOVAN_WS_URI: Joi.string().required(),
}).unknown();

const { error, value } = schema.validate(process.env);

if (error) {
  throw new Error(`.env file validation error: ${error.message}`);
} else {
  process.env = value;
}
