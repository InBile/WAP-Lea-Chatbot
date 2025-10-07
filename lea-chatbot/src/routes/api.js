const express = require('express');
const router = express.Router();
const ChatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/auth');

const chatController = new ChatController();

router.post('/chat', authMiddleware, chatController.handleChat.bind(chatController));

module.exports = router;