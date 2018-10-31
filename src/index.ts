'use strict';

import PlugBot from './plug-bot';
import PlugApi = require('./plug-api/');
import config from './config/config';
import winston = require('winston');

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
  headless: true,
  executablePath: 'google-chrome-unstable',
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});

new PlugBot(config, logger, plugApi);
