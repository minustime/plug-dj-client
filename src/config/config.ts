const env = process.env;

export default {
  plug: {
    password: env.PLUG_PASSWORD || '',
    room: env.PLUG_ROOM || '',
    username: env.PLUG_USERNAME || '',
  },
  puppeteer: {
    contained: env.hasOwnProperty('PUPPETEER_CONTAINED')
      ? env.PUPPETEER_CONTAINED === 'true'
      : false,
  },
  redis: {
    host: env.REDIS_HOST || 'localhost',
    port: env.REDIS_PORT || 6379,
  },
};
