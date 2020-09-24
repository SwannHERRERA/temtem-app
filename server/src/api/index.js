const express = require('express');

const emojis = require('./emojis');
const auth = require('./auth');
const temtem = require('./temtem');
const group = require('./group');
const map = require('./map');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);

router.use('/auth', auth);

router.use('/temtem', temtem);
router.use('/group', group);
router.use('/map', map);

module.exports = router;
