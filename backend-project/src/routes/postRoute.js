const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/postController');

router.post('/register', ctrl.addPost);

module.exports = router;