var express = require("express");
var router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");
const likeController = require("../controllers/likeController");
const commentController = require("../controllers/commentController");
// const adminMiddleware = require("../middleware/adminMiddleware");

router.post("/signup", authController.signup);

router.post("/signin", authController.login);

router.post("/me", authMiddleware, authController.me);

router.post("/logout", authController.logout);
//--------------------------------------------
router.get("/search", userController.index);

router.get("/:id", userController.show); //one user

router.get("/", userController.index); //more users

router.put("/:id", authMiddleware, userController.updateProfile);

router. delete("/:id", authMiddleware, userController.deleteUser)

//-----------------------------------------------
router.get("/getusertweets", userController.getUserTweets);
//---------------------------------------

router.post("/getuserlikes/:id", authMiddleware, userController.getUserLikes);
router.delete("/getuserlikes/:id", authMiddleware, userController.getUserLikes);
//---------------------------------------

router.put("/profile", authMiddleware, userController.updateProfile);

router.put("/profile/:id", authMiddleware, userController.updateProfile);
//-------------------------------------------

router.post("/follow/:id", authMiddleware, userController.follow);

router.delete("/follow/:id", authMiddleware, userController.unfollow);
//----------------------------------

router.post("/comments", authMiddleware, commentController.createComment);
router.get("/comments/:id", commentController.getCommentsByTweetId);
router.delete("/comments/:id", authMiddleware, commentController.deleteComment);
router.get("/comments", commentController.getAllComments);
router.put("/comments/:id", authMiddleware, commentController.updateComment);
// router.get("auth/", authMiddleware, authController.login);
// router.get("/:id", userController.show);
// router.post("/login", authMiddleware, authController.login);

router.post("/signup", authController.signup);
router.post("/signin", authController.login);

// router.post("/", userController.show);

// router.get("/users", userController.index);

// router.get("/", authMiddleware, adminMiddleware.adminMiddleware);

module.exports = router;
