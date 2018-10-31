'use strict';

const crypto = require('crypto');
const _ = require('underscore');

function cleanSongName(author: string, title: string) {
  const pattern: RegExp = / ?-? ?\[?\(?\{?【?(HD|HQ|Official Video|Official Music Video|Music Video|Lyrics|lyric|Official|Official|audio|video|official music video|audio|music video|free download|720p|1080p).+?\]?\)?\}?】?/gi;
  return {
    cleanAuthor: author.replace(pattern, ''),
    cleanTitle: title.replace(pattern, '')
  };
}

function hashString(str: string) {
  return crypto
    .createHash('md5')
    .update(str.toLowerCase())
    .digest('hex');
}

function replaceRandom(str: string, sampleCount: number = 1) {
  while (/\{\(.+?\)\}/.test(str)) {
    const parts = str.match(/\{\((.+?)\)\}/);
    if (parts) {
      const options = _.sample(parts[1].split(','), sampleCount);
      str = str.replace(parts[0], options.join(', ').replace(/,([^,]*)$/, ' or $1'));
    }
  }
  return str.replace(/\s+/g, ' ');
}

function replaceText(str: string, replacements: object) {
  for (const [key, value] of Object.entries(replacements)) {
    str = str.replace(new RegExp(`{${key}}`, 'g'), value);
  }
  return str;
}

function trimToSchema(schema: object, item: object) {
  if (typeof item !== 'string') {
    for (let i in item) {
      if (schema && schema.hasOwnProperty(i)) {
        // FIXIT: should be able to specify schema for items in array
        if (!Array.isArray(item[i])) {
          trimToSchema(schema[i], item[i]);
        }
      } else {
        delete item[i];
      }
    }
  }
  return item;
}

export default {
  cleanSongName,
  hashString,
  replaceRandom,
  replaceText,
  trimToSchema
};
