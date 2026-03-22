const mongoose = require('mongoose');

const fabStatSchema = new mongoose.Schema({
  icon: String,
  label: String,
  value: String,
});

const fabricationItemSchema = new mongoose.Schema({
  title: String,
  alt: String,
  imageUrl: String,
});

const qaFeatureSchema = new mongoose.Schema({
  icon: String,
  title: String,
  description: String,
});

const fabricationSchema = new mongoose.Schema(
  {
    stats: [fabStatSchema],
    items: [fabricationItemSchema],
    qaFeatures: [qaFeatureSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Fabrication', fabricationSchema);
