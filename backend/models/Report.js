const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  dogCount: {
    type: Number,
    default: 1,
    min: 1,
    max: 50
  },
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high', 'emergency'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['reported', 'under_review', 'resolved'],
    default: 'reported'
  },
  imageUrl: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update updatedAt before saving - SIMPLIFIED VERSION
reportSchema.pre('save', function() {
  this.updatedAt = new Date();
});

module.exports = mongoose.model('Report', reportSchema);