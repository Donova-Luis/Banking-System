    const express = require('express');
    const bcrypt = require('bcrypt');
    const jwt = require('jsonwebtoken');
    const { v4: uuidv4 } = require('uuid'); // Import UUID for generating account numbers
    const { User } = require('../models'); // Import User model
    const authenticateUser = require('../middleware/authenticate');
    const router = express.Router();
    
  /** router.get('/admin/dashboard', authenticateUser, (req, res) => {
        res.json({ message: 'Welcome, Admin!' });
      });**/

    // Helper function to generate a unique account number
    const generateAccountNumber = () => {
        return uuidv4().replace(/-/g, '').substring(0, 12); // Generate a UUID, remove dashes, take the first 12 characters
    };

    // Register
    router.post('/register', async (req, res) => {
      console.log('Register request received:', req.body);
      try {
        //console.log('Incoming registration:', req.body);
        const { firstName, lastName, email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          console.log('User already exists');
          return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        //console.log('Hashed password in DB:', user.password);

        // Generate unique account number
        let accountNumber = generateAccountNumber();
        let isAccountNumberUnique = false;
        while (!isAccountNumberUnique) {
            const existingAccount = await User.findOne({ where: { accountNumber } });
            if (!existingAccount) {
                isAccountNumberUnique = true;
            } else {
                accountNumber = generateAccountNumber();  // Generate a new one if it's not unique
            }
        }

        // Create the user
        const newUser = await User.create({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          accountNumber: accountNumber,
        });

        console.log('User created:', newUser.email);
        res.status(201).json({ message: 'User created successfully' });
      } catch (error) {
        console.error('Registration failed:', error);
        res.status(500).json({ message: 'Registration failed' });
      }
    });

    // Login
    router.post('/login', async (req, res) => {
      try {
        const { email, password } = req.body;
        console.log("Login attempt for:", email);

        // Check if user exists
        const user = await User.findOne({ where: { email } });
        if (!user) {
          console.log("User not found");
          return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
           console.log("Password mismatch", passwordMatch);
          return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create and assign a token
        const token = jwt.sign({ userId: user.id, 
          email: user.email,
          isAdmin: user.isAdmin, }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log("Login successful, token created");

        res.json({
          token,
          user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            accountNumber: user.accountNumber,
            accountBalance: user.accountBalance,
            accountBalance: parseFloat(user.accountBalance),
          }
        });

      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Login failed' });
      }
    });

    /**me
    router.get('/me', authenticateUser, async (req, res) => {
  const user = await User.findByPk(req.userId, {
    attributes: { exclude: ['password'] }
  });
  res.json(user);
})**/

// routes/authRoutes.js
router.get('/me', authenticateUser, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email'] // Customize as needed
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;