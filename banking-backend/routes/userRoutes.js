    const express = require('express');
    const router = express.Router();
    const authenticate = require('../middleware/authenticate'); //Authentication middleware (JWT verification)
    const { User } = require('../models');

    //Get User Profile
    router.get('/profile', authenticate, async (req, res) => {
        try {
            const user = await User.findByPk(req.userId, {
                attributes: ['id', 'firstName', 'lastName', 'email', 'accountNumber', 'accountBalance']  // Only return these attributes
            });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json(user);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to fetch profile' });
        }
    });

    module.exports = router;
