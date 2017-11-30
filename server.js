'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./infra/config');
const app = express();

app.set('port', (config.server.port));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  next();
});

app.use('/', require('./routes/'));

app.listen(app.get('port'), () => {
  console.info(`started bot server on ${app.get('port')}`);
});
