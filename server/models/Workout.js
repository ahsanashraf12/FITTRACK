// models/Workout.js
const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  exerciseName: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: Number, required: true },
  weights: { type: Number },
  notes: { type: String },
  category: { type: String, enum: ['strength', 'cardio'], required: true },
  tags: [{ type: String }],
}, { timestamps: true });

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;