const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// schema for plug.dj user
var UserSchema = new mongoose.Schema({
  id: { type: String, unique: false }, // FIXIT: index should be id + siteId
  siteId: { type: String, unique: false },
  username: { type: String, unique: false },
  aka: [String],
  linkage: { type: Array, default: [] },
  dateJoined: Date,
  avatarID: String,
  lastActivity: { type: Date, default: Date.now },
  dateAdded: { type: Date },
  permission: { type: Number, default: 0 }
});

UserSchema.index(
  {
    id: 1,
    siteId: 1
  },
  { unique: true }
);

// Remove this at some point, should be in a separate collection
// dashboard: [
//   {
//     roomId: { type: String, default: '' },
//     dateAdded: { type: Date, default: Date.now },
//     password: { type: String, default: '' }
//   }
// ]

/**
 * Updates the room specific actions for this user
 */
// TODO: come back to this at some point, will need to update the actions when user is voted, curated, etc.. for now let's just keep the dateAdded on a per-room basis
// the rest of the user actions can come out of the spin entries
// UserSchema.methods.updateActions = function updateActions(action) {
//   var self = this;
//   this.constructor.update(
//     {
//       _id: this._id,
//       'action.id': action.id
//     },
//     {
//       $set: {
//         'action.$.lastActivity': action.lastActivity,
//         'action.$.permission': action.permission
//       }
//     },
//     {},
//     function(err, item) {
//       if (item === 0) {
//         self.action.push(action);
//         self.save();
//       }
//     }
//   );
// };

export const UserModel = mongoose.model('User', UserSchema);
