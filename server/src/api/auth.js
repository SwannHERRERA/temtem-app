const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth');

router.post('/login', authController.authenticate);
router.post('/register', authController.register);

module.exports = router;
