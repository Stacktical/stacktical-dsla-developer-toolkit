const Joi = require('joi');
require('dotenv').config();

const schema = Joi.object({
  IPFS_URI: Joi.string().required(),
}).unknown();

const { error, value } = schema.validate(process.env);

if (error) {
  throw new Error(`global .env file validation error: ${error.message}`);
} else {
  process.env = value;
}
