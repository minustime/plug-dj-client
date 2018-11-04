'use strict';

import PlugBot from './plug-bot';
import PlugApi from 'plug-dj-api';
import config from './config/config';
import winston = require('winston');

// Setup logging
const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      colorize: false,
      prettyPrint: true,
      timestamp: () => new Date(),
    }),
  ],
});

let puppeteerOptions = {
  headless: true,
};

if (config.puppeteer.contained) {
  puppeteerOptions = Object.assign(puppeteerOptions, {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    executablePath: 'google-chrome-unstable',
  });
}

const plugApi = new PlugApi(puppeteerOptions);
const plugBot = new PlugBot(config, logger, plugApi);
