const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, minlength: 3, maxlength: 20, trim: true },
  password: { type: String, required: true, minlength: 6 }, // Add password complexity as needed
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }, // Basic email format validation
  profilePicture: { type: String },
  age: { type: Number, min: 18, max: 99 }, // Example: age should be between 18 and 99
  height: { type: Number },
  weight: { type: Number },
  userId: { type: String, required: true, unique: true },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;