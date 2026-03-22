const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: {
      type: String,
      enum: ['Exterior Facade', 'Interior Systems', 'Commercial Glass', 'Specialized Engineering'],
    },
    location: String,
    alt: String,
    imageUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
