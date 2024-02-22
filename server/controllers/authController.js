// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
  // Login a user and generate a JWT token
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
          { userId: user._id, username: user.username },
          'THEFITTRACK', // Replace with a strong and secure secret key
          { expiresIn: '1h' } // Token expiration time (e.g., 1 hour)
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

  // Middleware to verify JWT token
  authenticateToken: (req, res, next) => {
    // Get the token from the request header
    const token = req.header('Authorization');

    // If no token is provided, return an error
    if (!token) {
      return res.status(401).json({ error: 'Access denied. Token is missing.' });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, 'THEFITTRACK'); // Replace with your secret key

      // Attach the user information to the request for further processing
      req.user = decoded;

      // Continue to the next middleware or route handler
      next();
    } catch (error) {
      console.error('Error verifying token:', error);
      res.status(403).json({ error: 'Invalid token' });
    }
  },

  // Add more authentication-related controller methods as needed
};

module.exports = authController;