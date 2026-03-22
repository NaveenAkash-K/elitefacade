const Client = require('../models/Client');
const { uploadFile, deleteFile } = require('../utils/storage');

const BUCKET = 'clients';

exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.json(client);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createClients = async (req, res) => {
  try {
    const items = JSON.parse(req.body.items || '[]');
    const fileMap = {};
    (req.files || []).forEach((f) => { fileMap[f.fieldname] = f; });

    const docs = [];
    for (let i = 0; i < items.length; i++) {
      const { name, alt, showInHomePage } = items[i];
      let imageUrl = '';
      if (fileMap[`image_${i}`]) {
        imageUrl = await uploadFile(BUCKET, fileMap[`image_${i}`]);
      }
      docs.push({ name, alt, showInHomePage: showInHomePage ?? false, imageUrl });
    }

    const created = await Client.insertMany(docs);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });

    const { name, alt, showInHomePage } = req.body;

    let imageUrl = client.imageUrl;
    if (req.file) {
      await deleteFile(BUCKET, client.imageUrl);
      imageUrl = await uploadFile(BUCKET, req.file);
    }

    const updated = await Client.findByIdAndUpdate(
      req.params.id,
      {
        name,
        alt,
        showInHomePage: showInHomePage !== undefined ? showInHomePage === 'true' || showInHomePage === true : client.showInHomePage,
        imageUrl,
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });

    await deleteFile(BUCKET, client.imageUrl);
    await client.deleteOne();

    res.json({ message: 'Client deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
