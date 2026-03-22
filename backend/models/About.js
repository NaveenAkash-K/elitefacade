const mongoose = require('mongoose');

const coreValueSchema = new mongoose.Schema({
  icon: String,
  title: String,
  description: String,
});

const certificationSchema = new mongoose.Schema({
  icon: String,
  label: String,
});

const aboutSchema = new mongoose.Schema(
  {
    storyText1: String,
    storyText2: String,
    coreValues: [coreValueSchema],
    certifications: [certificationSchema],
    heroImageUrl: String,
    storyImageUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('About', aboutSchema);
