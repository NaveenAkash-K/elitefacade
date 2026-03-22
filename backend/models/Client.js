const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    alt: String,
    showInHomePage: { type: Boolean, default: false },
    imageUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Client', clientSchema);
