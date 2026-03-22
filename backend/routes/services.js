const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  getServices,
  getServiceItem,
  upsertServices,
  deleteRegion,
  deletePhase,
  deleteStep,
  deleteWhyUs,
} = require('../controllers/serviceController');

router.get('/', auth, getServices);
router.get('/:type/:id', auth, getServiceItem);
router.put('/', auth, upload.any(), upsertServices);
router.delete('/regions/:id', auth, deleteRegion);
router.delete('/phases/:id', auth, deletePhase);
router.delete('/steps/:id', auth, deleteStep);
router.delete('/why-us/:id', auth, deleteWhyUs);

module.exports = router;
