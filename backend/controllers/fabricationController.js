const Fabrication = require('../models/Fabrication');
const { uploadFile } = require('../utils/storage');

const BUCKET = 'fabrication';

exports.getFabrication = async (req, res) => {
  try {
    const fabrication = await Fabrication.findOne();
    res.json(fabrication || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getFabricationItem = async (req, res) => {
  try {
    const { type, id } = req.params;
    const allowed = ['stats', 'items', 'qaFeatures'];
    if (!allowed.includes(type)) return res.status(400).json({ message: 'Invalid type' });

    const fabrication = await Fabrication.findOne();
    if (!fabrication) return res.status(404).json({ message: 'Fabrication not found' });

    const item = fabrication[type].id(id);
    if (!item) return res.status(404).json({ message: `${type} item not found` });

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.upsertFabrication = async (req, res) => {
  try {
    const stats = JSON.parse(req.body.stats || '[]');
    const items = JSON.parse(req.body.items || '[]');
    const qaFeatures = JSON.parse(req.body.qaFeatures || '[]');

    const fileMap = {};
    (req.files || []).forEach((f) => { fileMap[f.fieldname] = f; });

    for (let i = 0; i < items.length; i++) {
      if (fileMap[`image_${i}`]) {
        items[i].imageUrl = await uploadFile(BUCKET, fileMap[`image_${i}`]);
      }
    }

    const fabrication = await Fabrication.findOneAndUpdate(
      {},
      { stats, items, qaFeatures },
      { new: true, upsert: true }
    );

    res.json(fabrication);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteStat = async (req, res) => {
  try {
    const fabrication = await Fabrication.findOneAndUpdate(
      {},
      { $pull: { stats: { _id: req.params.id } } },
      { new: true }
    );
    res.json(fabrication);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const fabrication = await Fabrication.findOneAndUpdate(
      {},
      { $pull: { items: { _id: req.params.id } } },
      { new: true }
    );
    res.json(fabrication);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteQaFeature = async (req, res) => {
  try {
    const fabrication = await Fabrication.findOneAndUpdate(
      {},
      { $pull: { qaFeatures: { _id: req.params.id } } },
      { new: true }
    );
    res.json(fabrication);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
