const env = process.env;

export default {
  puppeteer: {
    contained: env.hasOwnProperty('PUPPETEER_CONTAINED')
      ? env.PUPPETEER_CONTAINED === 'true'
      : false,
  },
  plug: {
    username: env.PLUG_USERNAME || '',
    password: env.PLUG_PASSWORD || '',
    room: env.PLUG_ROOM || '',
  },
  redis: {
    host: env.REDIS_HOST || 'localhost',
    port: env.REDIS_PORT || 6379,
  },
};
