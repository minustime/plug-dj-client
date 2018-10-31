const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const ObjectId = mongoose.SchemaTypes.ObjectId;
const SpinSchema = new mongoose.Schema({
  siteId: { type: String, default: '' },
  roomId: { type: String, default: '' },
  time: { type: Date, default: Date.now },
  song: {
    // A replica of the song object at the time of the spin
    _id: { type: ObjectId, ref: 'Song' },
    title: String,
    author: String,
    aka: [{ type: String, default: '' }],
    sig: {
      title: { type: String, default: '' },
      author: { type: String, default: '' },
      authortitle: { type: String, default: '' }
    },
    tags: [String],
    duration: { type: Number, default: 0 },
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
    source: [
      {
        site: { type: String, default: '' },
        id: { type: String, default: '' }
      }
    ]
  },
  dj: {
    _id: { type: ObjectId, ref: 'User' },
    id: String,
    username: String
  },
  action: [
    {
      type: { type: String },
      user: {
        // _id: { type: ObjectId, ref: 'User' },
        _id: { type: ObjectId, ref: 'User' },
        id: { type: String },
        username: { type: String }
      },
      content: { type: String, default: '' },
      // vote: { type: Number, default: 0 },
      time: { type: Date, default: Date.now }
    }
  ]
});

export const SpinModel = mongoose.model('Spin', SpinSchema);
