const mongoose = require('mongoose');

const { Schema } = mongoose;

const { ObjectId } = Schema.Types;

const bidSchema = new Schema({

  userID: {
    type: ObjectId,
    ref: 'User',
  },
  offerID: {
    type: ObjectId,
    ref: 'Offer',
  },
  roomID: {
    type: ObjectId,
    ref: 'Room',
  },
  value: {
    type: Number,
  },
  description: {
    type: String,
  },
  Status: {
    type: Number,
    default: 0,
  },
  accomodationImage: {
    type: String,
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

const Bid = mongoose.model('Bid', bidSchema);

module.exports = Bid;
