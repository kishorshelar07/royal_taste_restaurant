const express = require('express');
const router = express.Router();
const { sendMessage, getMessages, markRead, deleteMessage } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

router.post('/',            sendMessage);           // public
router.get('/',   protect,  getMessages);           // admin
router.patch('/:id/read', protect, markRead);       // admin
router.delete('/:id', protect, deleteMessage);      // admin

module.exports = router;
