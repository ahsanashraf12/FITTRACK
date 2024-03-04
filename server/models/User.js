// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profilePicture: { type: String },
  age: { type: Number },
  height: { type: Number },
  weight: { type: Number },
  userId: { type: String, required: true, unique: true }, // Add this line for userId
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;