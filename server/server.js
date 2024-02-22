// server.js
const express = require('express');
const connectToDatabase = require('./utils/db'); // Adjust the path if needed
const userRouter = require('./routers/userRouter');
// const profileRouter = require('./routers/profileRouter');
// const authRouter = require('./routers/authRouter');
// const workoutRouter = require('./routers/workoutRouter');
// const nutritionRouter = require('./routers/nutritionRouter');
// const progressRouter = require('./routers/progressRouter');
const authRouter = require('./routers/authRouter');

const port = process.env.PORT || 3000;
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectToDatabase();

// Use routers
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter); 
// app.use('/api/profile', profileRouter);
// app.use('/api/auth', authRouter);
// app.use('/api/workout', workoutRouter);
// app.use('/api/nutrition', nutritionRouter);
// app.use('/api/progress', progressRouter);

// App listening on port
app.listen(port, () => {
  console.log(`Server listening port: ${port}`);
});