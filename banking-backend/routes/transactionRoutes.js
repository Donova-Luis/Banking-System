const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const { Transaction, User } = require('../models');
const sequelize = require('../config/database');

console.log('transactionRoutes loaded');

console.log("User:", User);
console.log("Transaction:", Transaction);

// Get Transaction History
router.get('/transactions', authenticate, async (req, res) => {
  try {
    const userId = req.userId;
    const transactions = await Transaction.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']]
    });
    res.json(transactions);
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    res.status(500).json({ message: "Failed to fetch transaction history" });
  }
});

// Transfer Funds
router.post('/transfer', authenticate, async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { recipientAccountNumber, amount, description } = req.body;
    const senderId = req.userId;

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      await t.rollback();
      return res.status(400).json({ message: "Invalid transfer amount" });
    }

    const sender = await User.findByPk(senderId, { transaction: t });
    const recipient = await User.findOne({
      where: { accountNumber: recipientAccountNumber },
      transaction: t
    });

    if (!sender || !recipient) {
      await t.rollback();
      return res.status(400).json({ message: "Invalid sender or recipient account" });
    }

    const senderBalance = parseFloat(sender.accountBalance);
    if (isNaN(senderBalance) || senderBalance < parsedAmount) {
      await t.rollback();
      return res.status(400).json({ message: "Insufficient funds" });
    }

    // Adjust balances
    sender.accountBalance = senderBalance - parsedAmount;
    recipient.accountBalance = parseFloat(recipient.accountBalance) + parsedAmount;

    await sender.save({ transaction: t });
    await recipient.save({ transaction: t });

    // Create transaction records
    await Transaction.create({
      userId: senderId,
      type: "Transfer",
      amount: parsedAmount,
      description: `Transfer to ${recipientAccountNumber}: ${description || ''}`,
      recipientAccountNumber: recipientAccountNumber,
    }, { transaction: t });

    await Transaction.create({
      userId: recipient.id,
      type: "Credit",
      amount: parsedAmount,
      description: `Transfer from ${sender.accountNumber}: ${description || ''}`,
      recipientAccountNumber: sender.accountNumber,
    }, { transaction: t });

    await t.commit();

    res.json({ message: "Funds transferred successfully" });
  } catch (error) {
    await t.rollback();
    console.error("Error during transfer:", error);
    res.status(500).json({ message: "Failed to transfer funds" });
  }
});

// Deposit Funds (Simulated)
router.post('/deposit', authenticate, async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.userId;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.accountBalance += parseFloat(amount);
    await user.save();

    await Transaction.create({
      userId: userId,
      type: "Deposit",
      amount: parseFloat(amount),
      description: "Simulated deposit",
    });

    res.json({ message: "Funds deposited successfully" });
  } catch (error) {
    console.error("Error during deposit:", error);
    res.status(500).json({ message: "Failed to deposit funds" });
  }
});

// P2P Transfer
router.post('/p2p-transfer', authenticate, async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { recipientAccountNumber, amount, note } = req.body;
    const senderId = req.userId;

    const sender = await User.findByPk(senderId, { transaction: t });
    const recipient = await User.findOne({ where: { accountNumber: recipientAccountNumber }, transaction: t });

    if (!recipient || !sender) {
      await t.rollback();
      return res.status(404).json({ message: "Sender or recipient not found" });
    }

    if (sender.accountBalance < amount) {
      await t.rollback();
      return res.status(400).json({ message: "Insufficient funds" });
    }

    // Adjust balances
    sender.accountBalance -= amount;
    recipient.accountBalance += amount;

    await sender.save({ transaction: t });
    await recipient.save({ transaction: t });

    // Create transaction logs
    await Transaction.create({
      userId: senderId,
      type: "P2P Transfer - Sent",
      amount,
      description: note || `Sent to ${recipient.accountNumber}`,
      recipientAccountNumber
    }, { transaction: t });

    await Transaction.create({
      userId: recipient.id,
      type: "P2P Transfer - Received",
      amount,
      description: note || `Received from ${sender.accountNumber}`,
      recipientAccountNumber: sender.accountNumber
    }, { transaction: t });

    await t.commit();
    res.status(200).json({ message: "Transfer successful" });

  } catch (err) {
    await t.rollback();
    console.error("P2P Error:", err);
    res.status(500).json({ message: "Transfer failed" });
  }
});

module.exports = router;
