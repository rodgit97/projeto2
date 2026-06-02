var express = require("express");
var router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const authCtrl = require("../controllers/authController");
const authController = require("../controllers/authController");

router.get("/", function (req, res, next) {
  res.render("index", { title: "PROJETO FINAL TWITTER CLONE" });
});

router.get("/home", function (req, res, next) {
  res.send("Bem-vindo à página inicial do Twitter Clone!");
});

router.post("/signup", authController.signup);

router.post("/signin", authController.login);

router.post("/me",authMiddleware, authController.me);

router.post("/logout",authMiddleware, authController.logout);

module.exports = router;
