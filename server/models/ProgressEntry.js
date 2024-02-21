// models/ProgressEntry.js
const mongoose = require('mongoose');

const progressEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  weight: { type: Number },
  bodyMeasurements: {
    chest: { type: Number },
    waist: { type: Number },
    hips: { type: Number },
  },
  performanceMetrics: {
    runTime: { type: Number },
    liftingWeights: { type: Number },
  },
}, { timestamps: true });

const ProgressEntry = mongoose.model('ProgressEntry', progressEntrySchema);

module.exports = ProgressEntry;
