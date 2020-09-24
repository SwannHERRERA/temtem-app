const express = require('express');

const { authenticateJWT } = require('../middlewares/auth_middleware')
const { add, update, remove, read, readAll } = require('../controllers/group')
const router = express.Router();

router.get('/', authenticateJWT, readAll);

router.post('/', authenticateJWT, add);
router.put('/:id', authenticateJWT, update);
router.delete('/:id', authenticateJWT, remove);
router.get('/:id', authenticateJWT, read);


module.exports = router;
