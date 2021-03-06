'use strict';

require('dotenv').load();

const joi = require('joi');
const schema = joi.object({
  API_URI: joi.string(),
  FACEBOOK_VERIFY_TOKEN: joi.string(),
  FACEBOOK_PAGE_ACCESS: joi.string(),
  FACEBOOK_APP_SECRET: joi.string(),
  PORT: joi.number()
}).unknown().required();

const { error, value: envVars } = joi.validate(process.env, schema);

if (error) throw new Error(`Settings environments error: ${error.message}`);

const config = {
  api: envVars.API_URI,
  serverPort: envVars.PORT,
  facebook: {
    token: envVars.FACEBOOK_VERIFY_TOKEN,
    pageAccess: envVars.FACEBOOK_PAGE_ACCESS,
    appSecret: envVars.FACEBOOK_APP_SECRET
  }
};

module.exports = config;