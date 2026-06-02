const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const likeController = require('../controllers/likeController');

// 🔐 Protegido: criar e remover like exige identidade validada
router.post('/tweets/:tweetId/like', authMiddleware, likeController.likeTweet);
router.delete('/tweets/:tweetId/like', authMiddleware, likeController.unlikeTweet);

module.exports = router;