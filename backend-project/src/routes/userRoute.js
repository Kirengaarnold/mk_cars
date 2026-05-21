const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/userController');

router.post('/register', ctrl.Register)
router.delete('/delete/:id', ctrl.deleteUser)

module.exports = router;
