const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
require('dotenv').config();
const app = express();

const WebSocket = require('ws');
const { Server } = require("socket.io");

// Routes
const transactionRoutes = require('./routes/transactionRoutes');
const authRoutes = require('./routes/authRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Route mounting
app.use('/api/transactions', transactionRoutes);
app.use('/api/auth', authRoutes);

//404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Create and start the HTTP + WebSocket server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server, path: "/ws" });

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const chatRoute = require('./routes/chat');
app.use('/api', chatRoute);

// Start listening
const PORT = process.env.PORT || 5001;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`HTTP & WebSocket server running on port ${PORT}`);
});
