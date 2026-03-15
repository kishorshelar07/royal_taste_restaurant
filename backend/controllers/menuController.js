const Menu = require('../models/Menu');
const path = require('path');
const fs = require('fs');

// GET /api/menu — public
const getMenuItems = async (req, res) => {
  try {
    const { category, isSpecial } = req.query;
    const filter = { isAvailable: true };
    if (category && category !== 'all') filter.category = category;
    if (isSpecial === 'true') filter.isSpecial = true;

    const items = await Menu.find(filter).sort({ isSpecial: -1, createdAt: -1 });
    res.json({ count: items.length, items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/menu/all — admin (includes unavailable)
const getAllMenuItems = async (req, res) => {
  try {
    const items = await Menu.find().sort({ createdAt: -1 });
    res.json({ count: items.length, items });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/menu/:id
const getMenuItemById = async (req, res) => {
  try {
    const item = await Menu.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Menu item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/menu — admin
const createMenuItem = async (req, res) => {
  try {
    const { name, category, description, price, isVeg, isSpecial, spiceLevel, tags } = req.body;

    if (!name || !category || !description || !price) {
      return res.status(400).json({ error: 'Name, category, description, and price are required' });
    }

    const imageUrl = req.file
      ? `/uploads/${req.file.filename}`
      : req.body.image || '';

    const item = await Menu.create({
      name, category, description,
      price: parseFloat(price),
      image: imageUrl,
      isVeg: isVeg === 'true' || isVeg === true,
      isSpecial: isSpecial === 'true' || isSpecial === true,
      spiceLevel: spiceLevel || 'medium',
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim())) : [],
    });

    res.status(201).json({ message: 'Menu item created', item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/menu/:id — admin
const updateMenuItem = async (req, res) => {
  try {
    const existing = await Menu.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: 'Menu item not found' });

    const updates = { ...req.body };
    if (req.file) {
      // Delete old image if it's an upload
      if (existing.image && existing.image.startsWith('/uploads/')) {
        const oldPath = path.join(__dirname, '..', existing.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      updates.image = `/uploads/${req.file.filename}`;
    }
    if (updates.price) updates.price = parseFloat(updates.price);
    if (updates.tags && typeof updates.tags === 'string') {
      updates.tags = updates.tags.split(',').map(t => t.trim());
    }

    const item = await Menu.findByIdAndUpdate(req.params.id, updates, {
      new: true, runValidators: true,
    });

    res.json({ message: 'Menu item updated', item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/menu/:id — admin
const deleteMenuItem = async (req, res) => {
  try {
    const item = await Menu.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Menu item not found' });

    // Delete image file
    if (item.image && item.image.startsWith('/uploads/')) {
      const imgPath = path.join(__dirname, '..', item.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await item.deleteOne();
    res.json({ message: 'Menu item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getMenuItems, getAllMenuItems, getMenuItemById, createMenuItem, updateMenuItem, deleteMenuItem };
