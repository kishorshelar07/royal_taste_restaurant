const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Generate JWT
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '8h',
  });

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Find admin with password field
    const admin = await Admin.findOne({ username }).select('+password');
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = signToken(admin._id);

    res.json({
      token,
      admin: { id: admin._id, username: admin.username, email: admin.email, role: admin.role },
      message: 'Login successful',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/auth/register (one-time setup, disable after first admin)
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const exists = await Admin.findOne({ $or: [{ username }, { email }] });
    if (exists) {
      return res.status(409).json({ error: 'Admin with this username or email already exists' });
    }

    const admin = await Admin.create({ username, email, password });
    const token = signToken(admin._id);

    res.status(201).json({
      token,
      admin: { id: admin._id, username: admin.username, email: admin.email },
      message: 'Admin registered successfully',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/auth/me
const getMe = async (req, res) => {
  res.json({ admin: req.admin });
};

module.exports = { login, register, getMe };
