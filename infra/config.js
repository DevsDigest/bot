'use strict';

const joi = require('joi');
const schema = joi.object({
  API_URI: joi.string(),
  FACEBOOK_VERIFY_TOKEN: joi.string().required(),
  FACEBOOK_PAGE_ACCESS: joi.string().required()
}).unknown().required();

const { error, value: envVars } = joi.validate(process.env, schema);

if (error) throw new Error(`Configuration validation error: ${error.message}`);

const config = {
  api: envVars.API_URI,
  facebook: {
    token: envVars.FACEBOOK_VERIFY_TOKEN,
    pageAccess: envVars.FACEBOOK_PAGE_ACCESS
  }
};

module.exports = config;