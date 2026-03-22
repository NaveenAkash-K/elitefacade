const Service = require('../models/Service');
const { uploadFile } = require('../utils/storage');

const BUCKET = 'services';

exports.getServices = async (req, res) => {
  try {
    const service = await Service.findOne();
    res.json(service || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getServiceItem = async (req, res) => {
  try {
    const { type, id } = req.params;
    const allowed = ['regions', 'phases', 'steps', 'whyUs'];
    if (!allowed.includes(type)) return res.status(400).json({ message: 'Invalid type' });

    const service = await Service.findOne();
    if (!service) return res.status(404).json({ message: 'Services not found' });

    const item = service[type].id(id);
    if (!item) return res.status(404).json({ message: `${type} item not found` });

    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.upsertServices = async (req, res) => {
  try {
    const regions = JSON.parse(req.body.regions || '[]');
    const phases = JSON.parse(req.body.phases || '[]');
    const steps = JSON.parse(req.body.steps || '[]');
    const whyUs = JSON.parse(req.body.whyUs || '[]');

    const fileMap = {};
    (req.files || []).forEach((f) => { fileMap[f.fieldname] = f; });

    for (let i = 0; i < phases.length; i++) {
      if (fileMap[`image_${i}`]) {
        phases[i].imageUrl = await uploadFile(BUCKET, fileMap[`image_${i}`]);
      }
    }

    const service = await Service.findOneAndUpdate(
      {},
      { regions, phases, steps, whyUs },
      { new: true, upsert: true }
    );

    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteRegion = async (req, res) => {
  try {
    const service = await Service.findOneAndUpdate(
      {},
      { $pull: { regions: { _id: req.params.id } } },
      { new: true }
    );
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deletePhase = async (req, res) => {
  try {
    const service = await Service.findOneAndUpdate(
      {},
      { $pull: { phases: { _id: req.params.id } } },
      { new: true }
    );
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteStep = async (req, res) => {
  try {
    const service = await Service.findOneAndUpdate(
      {},
      { $pull: { steps: { _id: req.params.id } } },
      { new: true }
    );
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteWhyUs = async (req, res) => {
  try {
    const service = await Service.findOneAndUpdate(
      {},
      { $pull: { whyUs: { _id: req.params.id } } },
      { new: true }
    );
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
