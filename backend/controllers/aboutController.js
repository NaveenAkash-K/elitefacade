const About = require('../models/About');
const { uploadFile, deleteFile } = require('../utils/storage');

const BUCKET = 'about';

exports.getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about || {});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.upsertAbout = async (req, res) => {
  try {
    const { storyText1, storyText2 } = req.body;
    const coreValues = JSON.parse(req.body.coreValues || '[]');
    const certifications = JSON.parse(req.body.certifications || '[]');

    const fileMap = {};
    (req.files || []).forEach((f) => { fileMap[f.fieldname] = f; });

    const existing = await About.findOne();

    let heroImageUrl = existing?.heroImageUrl || '';
    let storyImageUrl = existing?.storyImageUrl || '';

    if (fileMap['heroImageFile']) {
      if (existing?.heroImageUrl) await deleteFile(BUCKET, existing.heroImageUrl);
      heroImageUrl = await uploadFile(BUCKET, fileMap['heroImageFile']);
    }

    if (fileMap['storyImageFile']) {
      if (existing?.storyImageUrl) await deleteFile(BUCKET, existing.storyImageUrl);
      storyImageUrl = await uploadFile(BUCKET, fileMap['storyImageFile']);
    }

    const about = await About.findOneAndUpdate(
      {},
      { storyText1, storyText2, coreValues, certifications, heroImageUrl, storyImageUrl },
      { new: true, upsert: true }
    );

    res.json(about);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
