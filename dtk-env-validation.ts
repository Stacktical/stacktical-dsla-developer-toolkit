const Joi = require('joi');
require('dotenv').config();

const schema = Joi.object({
  IPFS_URI: Joi.string().default('http://localhost:5001'),
  MAINNET_MNEMONIC: Joi.string().required(),
  TESTNET_MNEMONIC: Joi.string().required(),
  DEVELOP_MNEMONIC: Joi.string().required(),

  MUMBAI_URI: Joi.string().default(
    'https://matic-testnet-archive-rpc.bwarelabs.com'
  ),
  MUMBAI_WS_URI: Joi.string().default(
    'wss://matic-testnet-archive-ws.bwarelabs.com'
  ),
  POLYGON_WS_URI: Joi.string().default(
    'wss://matic-mainnet-full-ws.bwarelabs.com'
  ),
  HARMONYTESTNET_URI: Joi.string().default('https://api.s0.b.hmny.io'),
  HARMONYTESTNET_WS_URI: Joi.string().default('wss://ws.s0.b.hmny.io'),
  HARMONY_URI: Joi.string().default('https://api.s0.t.hmny.io'),
  HARMONY_WS_URI: Joi.string().default('wss://ws.s0.t.hmny.io'),
  DEVELOP_URI: Joi.string().default('http://localhost:8545'),
  DEVELOP_WS_URI: Joi.string().default('http://localhost:8545'),
  ETHEREUM_URI: Joi.string().required(),
  ETHEREUM_WS_URI: Joi.string().required(),
  KOVAN_URI: Joi.string().required(),
  KOVAN_WS_URI: Joi.string().required(),
}).unknown();

const { error, value } = schema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
} else {
  process.env = value;
}
