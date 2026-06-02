const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const feedController = require("../controllers/feedController");

router.get("/", authMiddleware, feedController.getFeed);

router.get("/feedlikes", authMiddleware, feedController.getLikedTweets);

router.get("/feedcomments", authMiddleware, feedController.getCommentedTweets);

router.post("/feedlikes", feedController.getLikedTweets);
module.exports = router;
