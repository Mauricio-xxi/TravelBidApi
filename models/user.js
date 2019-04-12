const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, default: '', required: true },
  age: { type: Number, default: '' },
  gender: { type: String, default: '' },
  description: { type: String, default: '' },
  userImage: { type: String },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
   },
  });

const User = mongoose.model('User', userSchema);

module.exports = User;