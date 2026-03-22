const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  getClients,
  getClient,
  createClients,
  updateClient,
  deleteClient,
} = require('../controllers/clientController');

router.get('/', auth, getClients);
router.get('/:id', auth, getClient);
router.post('/', auth, upload.any(), createClients);
router.patch('/:id', auth, upload.single('image'), updateClient);
router.delete('/:id', auth, deleteClient);

module.exports = router;
