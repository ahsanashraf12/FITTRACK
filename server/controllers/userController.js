// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // Import jwt
const { v4: uuidv4 } = require('uuid'); // Import uuid


const userController = {
  // Register a new user
  register: async (req, res) => {
    try {
      const { username, password, name, email } = req.body;

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ errors: [{ msg: 'Invalid email format' }] });
      }

      // Validate username length
      if (username.length < 4 || username.length > 20) {
        return res.status(400).json({ errors: [{ msg: 'Username should be between 4 and 20 characters long' }] });
      }

      // Validate password length
      if (password.length < 6) {
        return res.status(400).json({ errors: [{ msg: 'Password should be at least 6 characters long' }] });
      }


      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ errors: [{ msg: 'Username or email already exists' }] });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const userId = uuidv4();

      const newUser = new User({
        userId,
        username,
        password: hashedPassword,
        name,
        email,
      });

      await newUser.save();

      res.status(201).json({ message: 'User registered successfully', userId });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
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

      // If passwords match, generate a JWT token
      if (passwordMatch) {
        const token = jwt.sign(
          { userId: user.userId, username: user.username }, // Change to use userId
          'THEFITTRACK',  // Replace with your own secret key
          { expiresIn: '1h' }
        );

        res.status(200).json({ token, message: 'Login successful' });
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

      // Fetch the user from the database by userId
      const user = await User.findOne({ userId }); // Change to use userId

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
