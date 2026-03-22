const Product = require('../models/Product');
const { uploadFile, deleteFile } = require('../utils/storage');

const BUCKET = 'products';

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProducts = async (req, res) => {
  try {
    const items = JSON.parse(req.body.items || '[]');
    const fileMap = {};
    (req.files || []).forEach((f) => { fileMap[f.fieldname] = f; });

    const docs = [];
    for (let i = 0; i < items.length; i++) {
      const { title, description, badge, specs } = items[i];
      let imageUrl = '';
      if (fileMap[`image_${i}`]) {
        imageUrl = await uploadFile(BUCKET, fileMap[`image_${i}`]);
      }
      docs.push({ title, description, badge, specs: specs || [], imageUrl });
    }

    const created = await Product.insertMany(docs);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const { title, description, badge } = req.body;
    const specs = req.body.specs ? JSON.parse(req.body.specs) : product.specs;

    let imageUrl = product.imageUrl;
    if (req.file) {
      await deleteFile(BUCKET, product.imageUrl);
      imageUrl = await uploadFile(BUCKET, req.file);
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { title, description, badge, specs, imageUrl },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    await deleteFile(BUCKET, product.imageUrl);
    await product.deleteOne();

    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
