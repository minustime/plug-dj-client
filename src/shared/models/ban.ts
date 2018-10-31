const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var BanSchema = new mongoose.Schema({
  roomId: { type: String, default: '' },
  whitelisted: { type: Number, default: 0 },
  skipTime: { type: Number, default: 0 },
  skipCount: { type: Number, default: 0 },
  autoSkipCount: { type: Number, default: 0 },
  dateUpdated: { type: Date, default: Date.now },
  spinIds: [String],
  submitter: {
    id: String,
    username: String
  },
  song: {
    title: String,
    author: String,
    duration: { type: Number, default: 0 },
    sig: {
      title: { type: String, default: '' },
      author: { type: String, default: '' },
      authortitle: { type: String, default: '' }
    },
    aka: [{ type: String, default: '' }],
    tags: [String],
    dateAdded: { type: Date },
    dateUpdated: { type: Date },
    media: [
      {
        type: { type: String, default: '' },
        id: { type: String, default: '' },
        duration: { type: Number, default: 0 },
        url: { type: String, default: '' },
        urlShort: { type: String, default: '' }
      }
    ],
    provider: [
      {
        siteId: { type: String, default: '' },
        songId: { type: String, default: '' }
      }
    ]
  }
});

export const BanModel = mongoose.model('Ban', BanSchema);
