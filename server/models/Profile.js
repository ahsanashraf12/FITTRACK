// models/Profile.js
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bio: { type: String },
  interests: [{ type: String }],
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;