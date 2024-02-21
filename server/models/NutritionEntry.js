// models/NutritionEntry.js
const mongoose = require('mongoose');

const nutritionEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mealType: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'snack'], required: true },
  foodItems: [{ type: String }],
  quantities: [{ type: Number }],
  nutritionalDetails: {
    calories: { type: Number },
    proteins: { type: Number },
    carbs: { type: Number },
    fats: { type: Number },
  },
}, { timestamps: true });

const NutritionEntry = mongoose.model('NutritionEntry', nutritionEntrySchema);

module.exports = NutritionEntry;