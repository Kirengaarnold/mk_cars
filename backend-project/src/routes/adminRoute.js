const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/adminController');

router.post('/register', ctrl.Register)
router.post('/login', ctrl.login)

module.exports = router;