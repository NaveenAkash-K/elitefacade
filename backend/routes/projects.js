const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
  getProjects,
  getProject,
  createProjects,
  updateProject,
  deleteProject,
} = require('../controllers/projectController');

router.get('/', auth, getProjects);
router.get('/:id', auth, getProject);
router.post('/', auth, upload.any(), createProjects);
router.patch('/:id', auth, upload.single('image'), updateProject);
router.delete('/:id', auth, deleteProject);

module.exports = router;
