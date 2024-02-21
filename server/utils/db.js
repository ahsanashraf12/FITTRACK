// utils/db.js
const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    const uri = 'mongodb+srv://FITTRACK:Khan123@cluster0.gfjjnkt.mongodb.net/THEFITTRACK?retryWrites=true&w=majority';
    await mongoose.connect(uri);
    console.log('Connected to the MongoDB Atlas cluster');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
};

module.exports = connectToDatabase;
