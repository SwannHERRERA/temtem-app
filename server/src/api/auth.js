const express = require('express');

const router = express.Router();

const { authenticate, register } = require('../controllers/auth');

router.post('/login', authenticate);
router.post('/register', register);

module.exports = router;
