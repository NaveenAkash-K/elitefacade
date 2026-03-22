const Project = require('../models/Project');
const { uploadFile, deleteFile } = require('../utils/storage');

const BUCKET = 'projects';

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProjects = async (req, res) => {
  try {
    const items = JSON.parse(req.body.items || '[]');
    const fileMap = {};
    (req.files || []).forEach((f) => { fileMap[f.fieldname] = f; });

    const docs = [];
    for (let i = 0; i < items.length; i++) {
      const { title, category, location, alt } = items[i];
      let imageUrl = '';
      if (fileMap[`image_${i}`]) {
        imageUrl = await uploadFile(BUCKET, fileMap[`image_${i}`]);
      }
      docs.push({ title, category, location, alt, imageUrl });
    }

    const created = await Project.insertMany(docs);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const { title, category, location, alt } = req.body;

    let imageUrl = project.imageUrl;
    if (req.file) {
      await deleteFile(BUCKET, project.imageUrl);
      imageUrl = await uploadFile(BUCKET, req.file);
    }

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      { title, category, location, alt, imageUrl },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    await deleteFile(BUCKET, project.imageUrl);
    await project.deleteOne();

    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
