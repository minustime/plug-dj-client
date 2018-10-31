const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const ObjectId = mongoose.SchemaTypes.ObjectId;
const SongSchema = new mongoose.Schema({
  title: String,
  author: String,
  duration: { type: Number, default: 0 },
  sig: {
    title: { type: String, default: '' },
    author: { type: String, default: '' },
    authortitle: { type: String, default: '' }
  },
  duplicates: [{ type: ObjectId, ref: 'Song' }], // Possible duplicate songs, TODO: build tool to merge songs and spins
  aka: [{ type: String, default: '' }],
  tags: [String],
  dateAdded: { type: Date },
  dateUpdated: { type: Date },
  isRenamed: { type: Number, default: 0 },
  media: [
    {
      type: { type: String, default: '' }, // YT, SC, Spotify
      id: { type: String, default: '' },
      duration: { type: Number, default: 0 },
      url: { type: String, default: '' },
      urlShort: { type: String, default: '' }
    }
  ],
  provider: [
    {
      siteId: { type: String, default: '' }, // plug, dubtrack, soma
      songId: { type: String, default: '' } // song identifier within that system
    }
  ]
});

export const SongModel = mongoose.model('Song', SongSchema);
