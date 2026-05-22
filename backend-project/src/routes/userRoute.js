const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/userController');
const { requireLogin, requireUser } = require('../middleware/authMiddleware');

router.post('/register', requireLogin, ctrl.Register)
router.delete('/delete/:id', requireLogin, ctrl.deleteUser)
router.post('/login', ctrl.login)
router.post('/logout', requireUser, ctrl.logout)
router.get('/me', requireUser, ctrl.me)

module.exports = router;
