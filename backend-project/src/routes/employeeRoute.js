const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/employeesController');
const { requireLogin } = require('../middleware/authMiddleware');

router.use(requireLogin)

router.post('/register', ctrl.addUser)
router.get('/', ctrl.listEmployees)
router.put('/:id', ctrl.updateEmployee)
router.delete('/:id', ctrl.deleteEmployee)

module.exports = router;