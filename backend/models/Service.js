const mongoose = require('mongoose');

const regionSchema = new mongoose.Schema({
  icon: String,
  title: String,
  description: String,
});

const phaseSchema = new mongoose.Schema({
  title: String,
  description: String,
  features: [String],
  imageUrl: String,
});

const stepSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const whyUsSchema = new mongoose.Schema({
  icon: String,
  title: String,
  description: String,
});

const serviceSchema = new mongoose.Schema(
  {
    regions: [regionSchema],
    phases: [phaseSchema],
    steps: [stepSchema],
    whyUs: [whyUsSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Service', serviceSchema);
