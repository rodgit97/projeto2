var express = require("express");
var router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.post("/me", authMiddleware, authController.me);

router.post("/logout", authController.logout);

module.exports = router;
