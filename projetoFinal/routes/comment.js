const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/:id/comments", authMiddleware, commentController.createComment);
router.get(
  "/:id/comments",
  authMiddleware,
  commentController.getCommentsByTweetId,
);
router.delete(
  "/:id/comments/:commentId",
  authMiddleware,
  commentController.deleteComment,
);

router.get(
  "/tweets/:id/comments",
  authMiddleware,
  commentController.getCommentsByTweetId,
);
module.exports = router;
