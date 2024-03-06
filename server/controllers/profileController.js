// controllers/profileController.js
const User = require('../models/User');

const profileController = {
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

  // Update user profile by ID
  updateProfileById: async (req, res) => {
    try {
      const userId = req.params.userId;
      const { profileData } = req.body; // Assuming you send the updated profile data in the request body

      // Update the user profile in the database
      const updatedUser = await User.findByIdAndUpdate(userId, { profile: profileData }, { new: true });

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Send the updated user profile as a response
      res.status(200).json({ updatedProfile: updatedUser.profile }); // Modify this according to your User model structure
    } catch (error) {
      console.error('Error updating user profile by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Add more controller methods as needed
};

module.exports = profileController;
