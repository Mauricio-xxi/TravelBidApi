const mongoose = require('mongoose');

const { Schema } = mongoose;

const { ObjectId } = Schema.Types;

const { String } = Schema.Types;

const roomSchema = new Schema({
  userID: {
    type: ObjectId,
    ref: 'User',
  },
  location: {
    type: {
      type: String,
    },
    coordinates: [Number],
  },
  facilities: [
  {privateRoom: { type: String }},
  {sharedRoom: { type: String }},
  {entireProperty: { type: String }},
  {tv: { type: String }},
  {wifi: { type: String }},
  {air: { type: String }},
  {garage: { type: String }},
  {termo: { type: String }},
  {whaser: { type: String }},
  {pool: { type: String }},
  {privateBathroom: { type: String }},
  {wheelchair: { type: String }},
  {smoke: { type: String }},
  {pet: { type: String }},
  {accomodationDescription: { type: String }},
  {accomodationImage: { type: String }},
  ] ,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

roomSchema.index({ location: '2dsphere' });

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
