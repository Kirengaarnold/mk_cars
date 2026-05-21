const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/userController');
const { requireLogin } = require('../middleware/authMiddleware');

router.use(requireLogin)

router.post('/register', ctrl.Register)
router.delete('/delete/:id', ctrl.deleteUser)

module.exports = router;
