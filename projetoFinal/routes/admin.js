var express = require("express");
var router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");
const tweetController = require("../controllers/tweetController");
// const adminMiddleware = require("../middleware/authMiddleware");
router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.post("/me", authMiddleware, authController.me);

router.post("/logout", authController.logout);

router.get("/", userController.index);
router.put("/:id", authMiddleware, userController.updateProfile);
router.delete("/:id", authMiddleware, userController.unfollow);

router.get("/", tweetController.getAllTweets);
router.put("/:id", tweetController.getAllTweets);
router.get("/:id", tweetController.getAllTweets);



// router.get("/", authMiddleware,adminMiddleware.adminMiddleware);

// /* GET users listing. */
// router.get('/admin', function(req, res, next) {
//   res.send('rota de admin');
// });

// router.post('/admin', function(req, res, next) {
//   res.send('admin criado com sucesso');
// });

// router.delete('/admin/:id', function(req, res, next) {
//   res.send('admin eliminado');
// });

module.exports = router;
