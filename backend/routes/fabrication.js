const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  getFabrication,
  getFabricationItem,
  upsertFabrication,
  deleteStat,
  deleteItem,
  deleteQaFeature,
} = require('../controllers/fabricationController');

router.get('/', auth, getFabrication);
router.get('/:type/:id', auth, getFabricationItem);
router.put('/', auth, upload.any(), upsertFabrication);
router.delete('/stats/:id', auth, deleteStat);
router.delete('/items/:id', auth, deleteItem);
router.delete('/qa-features/:id', auth, deleteQaFeature);

module.exports = router;
