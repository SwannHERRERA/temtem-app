const express = require('express');

const { authenticateJWT } = require('../middlewares/auth_middleware')

const router = express.Router();

router.get('/', authenticateJWT, (req, res) => {
  res.json(['😀', '😳', '🙄']);
});

module.exports = router;
