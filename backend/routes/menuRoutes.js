const express = require('express');
const router = express.Router();
const {
  getMenuItems, getAllMenuItems, getMenuItemById,
  createMenuItem, updateMenuItem, deleteMenuItem,
} = require('../controllers/menuController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public
router.get('/',        getMenuItems);
router.get('/:id',     getMenuItemById);

// Admin protected
router.get('/admin/all',       protect, getAllMenuItems);
router.post('/',               protect, upload.single('image'), createMenuItem);
router.put('/:id',             protect, upload.single('image'), updateMenuItem);
router.delete('/:id',          protect, deleteMenuItem);

module.exports = router;
