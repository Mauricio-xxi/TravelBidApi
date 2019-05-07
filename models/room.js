const mongoose = require('mongoose');

const { Schema } = mongoose;

const { ObjectId } = Schema.Types;

const { String } = Schema.Types;

const roomSchema = new Schema({
  userID: {
    type: ObjectId,
    ref: 'User',
  },
  roomImage : String,
  description:{ type: String, default: '' },
  location: {
    type: {
      type: String,
    },
    coordinates: [Number],
  },
  facilities: {
  privateRoom:  String ,
  sharedRoom:  String ,
  entireProperty:  String ,
  tv: String ,
  wifi:  String ,
  air:  String ,
  garage:  String ,
  termo:  String ,
  whaser:  String ,
  pool:  String ,
  privateBathroom:  String ,
  wheelchair:  String ,
  smoke:  String ,
  pet:  String ,
  accomodationDescription:  String ,
  accomodationImage:  String ,
   } ,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

roomSchema.index({ location: '2dsphere' });

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
