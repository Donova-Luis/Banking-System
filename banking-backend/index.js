const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

console.log('typeof userRoutes:', typeof userRoutes); // Should be 'function'
console.log('userRoutes is:', userRoutes); // Should be a function with a stack

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

    /**sequelize.sync({ force: false })  // Use `force: true` to drop and recreate the tables (for development ONLY)
      .then(() => {
        app.listen(port, () => {
          console.log(`Server is running on port ${port}`);
        });
      })
      .catch((err) => {
        console.error('Unable to connect to the database:', err);
      });**/
