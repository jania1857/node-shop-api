const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');

router.post('/register', controller.register);

router.delete('/:userId', controller.deleteUser);

router.post('/login', controller.login);

module.exports = router;