const express = require('express');
const router = express.Router();
const askChatbot = require('../ai_model/chatbot_bridge'); // path to chatbot_bridge.js

router.post('/chat', async (req, res) => {
  const { message, user_id } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await askChatbot(message, user_id);
    res.json(response);
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ error: 'Internal chatbot error', details: error });
  }
});

module.exports = router;
