const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getStats, upsertStats } = require('../controllers/statController');

router.get('/', auth, getStats);
router.patch('/', auth, upsertStats);

module.exports = router;
