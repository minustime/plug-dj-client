'use strict';

import PlugBot from './plug-bot';
import PlugApi = require('./plug-api/');
import config from './config/config';
import winston = require('winston');
import { eventNames } from 'cluster';

// Setup logging
const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      timestamp: () => new Date(),
      prettyPrint: true,
      colorize: false
    })
  ]
});

const chromeConfig = {
  "headless": true
};
console.log
if(config.dockerized === true) {
  chromeConfig['executablePath'] = 'google-chrome-unstable';
  chromeConfig['args'] = ['--no-sandbox', '--disable-setuid-sandbox'];
}

const plugApi = new PlugApi({
  headless: true,
  ...chromeConfig
});

new PlugBot(config, logger, plugApi);
