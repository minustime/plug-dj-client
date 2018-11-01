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
      colorize: false,
    }),
  ],
});

const puppeteerOptions = {
  headless: true,
};

if (config.puppeteer.contained) {
  puppeteerOptions['executablePath'] = 'google-chrome-unstable';
  puppeteerOptions['args'] = ['--no-sandbox', '--disable-setuid-sandbox'];
}

const plugApi = new PlugApi(puppeteerOptions);

new PlugBot(config, logger, plugApi);
