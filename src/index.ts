'use strict';

import PlugBot from './plug-bot';
import config from './config';
import winston = require('winston');
const PlugApi = require('./plug-api/');

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

const plugApi = new PlugApi({
  headless: true
  // executablePath: 'google-chrome-unstable',
  // args: ['--no-sandbox', '--disable-setuid-sandbox']
});
const plugBot = new PlugBot(config, logger, plugApi);
