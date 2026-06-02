const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const likeController = require('../controllers/likeController');

// Protegido: criar e remover like exige identidade validada
router.post('/', authMiddleware, likeController.likeTweet);
router.delete('/:id', authMiddleware, likeController.unlikeTweet);

module.exports = router;