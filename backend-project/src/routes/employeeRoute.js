const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/employeesController');

router.post('/register', ctrl.addUser)
router.get('/', ctrl.listEmployees)
router.put('/:id', ctrl.updateEmployee)
router.delete('/:id', ctrl.deleteEmployee)

module.exports = router;