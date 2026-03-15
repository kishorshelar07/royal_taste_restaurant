const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name:    { type: String, required: true, trim: true, maxlength: 100 },
  email:   { type: String, required: true, lowercase: true, trim: true },
  subject: { type: String, trim: true, maxlength: 200, default: 'General Enquiry' },
  message: { type: String, required: true, maxlength: 1000 },
  isRead:  { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Contact', contactSchema);
