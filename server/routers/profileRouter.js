// routers/profileRouter.js
const express = require('express');
const router = express.Router();

// Import the profile controller
const profileController = require('../controllers/profileController');

// Define routes
router.get('/:userId', profileController.getProfileById);
router.put('/:userId', profileController.updateProfileById);
// Add more routes as needed

module.exports = router;