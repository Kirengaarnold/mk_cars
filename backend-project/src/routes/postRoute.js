const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/postController');
const { requireLogin } = require('../middleware/authMiddleware');

router.use(requireLogin)

router.post('/register', ctrl.addPost);

module.exports = router;