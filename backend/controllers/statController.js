const Stat = require('../models/Stat');

exports.getStats = async (req, res) => {
  try {
    const stats = await Stat.findOne();
    res.json(stats || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.upsertStats = async (req, res) => {
  try {
    const { projectsCompleted, clients, yearsOfExcellence } = req.body;

    const stats = await Stat.findOneAndUpdate(
      {},
      { projectsCompleted, clients, yearsOfExcellence },
      { new: true, upsert: true }
    );

    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
