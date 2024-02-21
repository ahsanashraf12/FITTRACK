// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');


const userController = {
  // Register a new user
  register: async (req, res) => {
    try {
      // Extract user information from the request body
      const { username, password, name, email } = req.body;

      // Check if the username or email already exists in the database
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ error: 'Username or email already exists' });
      }

      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user instance
      const newUser = new User({
        username,
        password: hashedPassword,
        name,
        email,
      });

      // Save the user to the database
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Login a user
  login: async (req, res) => {
    try {
      // Extract login credentials from the request body
      const { username, password } = req.body;

      // Find the user in the database by username
      const user = await User.findOne({ username });

      // If the user is not found, return an error
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);

      // If passwords match, generate a token or perform the necessary authentication logic
      if (passwordMatch) {
        // In a real application, you might generate and send a JWT token here
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Invalid username or password' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Get user by ID
  getUserById: async (req, res) => {
    try {
      const userId = req.params.userId;

      // Check if userId is a valid ObjectId
      if (!mongoose.isValidObjectId(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }

      // Fetch the user from the database by ID
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Send the user data as a response
      res.status(200).json({ user });
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Add more controller methods as needed
};

module.exports = userController;