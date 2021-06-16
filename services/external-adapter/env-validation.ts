const Joi = require('joi');
import { NETWORKS } from '../../constants';
require('dotenv').config();

const networksObject = Object.keys(NETWORKS).reduce(
  (r, networkName) => ({
    ...r,
    [`${networkName}_URI`]: Joi.string().uri().required(),
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
