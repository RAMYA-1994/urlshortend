const express = require('express');
const { createUrl, getUrls, getUrlCount } = require('../controllers/urls');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/', authMiddleware, createUrl);
router.get('/', authMiddleware, getUrls);
router.get('/count', authMiddleware, getUrlCount);

module.exports = router;
