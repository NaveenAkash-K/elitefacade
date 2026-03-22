const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const { getAbout, upsertAbout } = require('../controllers/aboutController');

router.get('/', auth, getAbout);
router.post('/', auth, upload.any(), upsertAbout);

module.exports = router;
