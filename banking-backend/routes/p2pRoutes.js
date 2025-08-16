// routes/p2pRoutes.js
const express = require('express');
const router = express.Router();
const { User, Transaction } = require('../models');
const authenticate = require('../middleware/authenticate');

router.post('/send', authenticate, async (req, res) => {
  try {
    const { recipientAccountNumber, amount, description } = req.body;
    const senderId = req.userId;

    const sender = await User.findByPk(senderId);
    const recipient = await User.findOne({ where: { accountNumber: recipientAccountNumber } });

    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    if (sender.accountBalance < parseFloat(amount)) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }

    sender.accountBalance -= parseFloat(amount);
    recipient.accountBalance += parseFloat(amount);

    await sender.save();
    await recipient.save();

    await Transaction.create({
      userId: senderId,
      type: 'Transfer',
      amount: parseFloat(amount),
      description: description || `P2P to ${recipient.accountNumber}`,
      recipientAccountNumber,
    });

    await Transaction.create({
      userId: recipient.id,
      type: 'Credit',
      amount: parseFloat(amount),
      description: `P2P from ${sender.accountNumber}`,
      recipientAccountNumber: sender.accountNumber,
    });

    res.json({ message: 'P2P transfer successful' });

  } catch (error) {
    console.error('P2P Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;