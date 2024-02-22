// routers/userRouter.js
const express = require('express');
const router = express.Router();

// Import the user controller
const userController = require('../controllers/userController');

// Define routes
router.post('/register', userController.register);
router.get('/:userId', userController.getUserById);
// Add more routes as needed

module.exports = router;