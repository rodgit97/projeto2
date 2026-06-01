var express = require("express");
var router = express.Router();
const tweetController = require("../controllers/tweetController");
const authMiddleware = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");
const likeController = require("../controllers/likeController");
const commentController = require("../controllers/commentController");

router.get("/", tweetController.getAllTweets);
router.get("/:id", tweetController.getTweetById);
router.post("/", authMiddleware, tweetController.createTweet);
router.put("/:id", authMiddleware, tweetController.updateTweet);
router.delete("/:id", authMiddleware, tweetController.deleteTweet);

router.post("/:id/comments", authMiddleware, commentController.createComment);
router.get(
  "/:id/comments",
  authMiddleware,
  commentController.getCommentsByTweetId,
);
router.delete("/:id", authMiddleware, commentController.deleteComment);



router.post("/:id/like", authMiddleware, likeController.likeTweet);
router.delete("/:id/like", authMiddleware, likeController.unlikeTweet);

// router.delete("/tweet/:id", function (req, res, next) {

//   res.send("tweet eliminado");
// });

module.exports = router;
