const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const feedController = require("../controllers/feedController");

router.get("/", authMiddleware, feedController.getFeed);

router.get("/likes", authMiddleware, feedController.getLikedTweets);

router.get("/comments", authMiddleware, feedController.getCommentedTweets);

router.post("/likes/:tweetId", authMiddleware, feedController.getTweetLikes);

router.delete("/comments/:tweetId", authMiddleware, feedController.getTweetComments);

module.exports = router;