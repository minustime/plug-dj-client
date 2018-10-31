'use strict';

import PlugBot from './lib/plug-bot';

const config = require('../config/config.json');
const winston = require('winston');
const PlugApi = require('./lib/plug-api');
const env = process.env;

// Overwrite default config with environment options if provided
config.plug.username = env.PLUG_USERNAME || config.plug.username;
config.plug.password = env.PLUG_PASSWORD || config.plug.password;
config.plug.room = env.PLUG_ROOM || config.plug.room;
config.redis.host = env.REDIS_HOST || config.redis.host;
config.redis.port = env.REDIS_PORT || config.redis.port;

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
