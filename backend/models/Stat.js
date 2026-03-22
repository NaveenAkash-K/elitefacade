const mongoose = require('mongoose');

const statSchema = new mongoose.Schema(
  {
    projectsCompleted: String,
    clients: String,
    yearsOfExcellence: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Stat', statSchema);
