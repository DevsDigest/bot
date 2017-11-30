'use strict';

const joi = require('joi');
const schema = joi.object({
  MONGODB_URI: joi.string().default('mongodb://127.0.0.1:27017/devsdigest'),
  API_URI: joi.string(),
  SERVER_URI: joi.string(),
  SERVER_PORT: joi.number(),
  FACEBOOK_VERIFY_TOKEN: joi.string().required(),
  FACEBOOK_PAGE_ACCESS: joi.string().required()
}).unknown().required();

const { error, value: envVars } = joi.validate(process.env, schema);

if (error) throw new Error(`Configuration validation error: ${error.message}`);

const config = {
  mongo: envVars.MONGODB_URI,
  api: envVars.API_URI,
  server: {
    uri: envVars.SERVER_URI,
    port: envVars.SERVER_PORT
  },
  facebook: {
    token: envVars.FACEBOOK_VERIFY_TOKEN,
    pageAccess: envVars.FACEBOOK_PAGE_ACCESS
  }
};

module.exports = config;