const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, commentController.createComment);
router.get("/:id", commentController.getCommentsByTweetId);
router.delete("/:id", authMiddleware, commentController.deleteComment);
router.get("/", commentController.getAllComments);
router.put("/:id", authMiddleware, commentController.updateComment);

module.exports = router;
