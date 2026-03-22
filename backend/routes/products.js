const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  getProducts,
  getProduct,
  createProducts,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

router.get('/', auth, getProducts);
router.get('/:id', auth, getProduct);
router.post('/', auth, upload.any(), createProducts);
router.patch('/:id', auth, upload.single('image'), updateProduct);
router.delete('/:id', auth, deleteProduct);

module.exports = router;
