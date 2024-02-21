// models/Auth.js
const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  token: { type: String, required: true },
}, { timestamps: true });

const Auth = mongoose.model('Auth', authSchema);

module.exports = Auth;