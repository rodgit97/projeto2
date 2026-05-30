var express = require("express");
var router = express.Router();

router.get("/tweet", function (req, res, next) {

  res.send("precisa de autenticação");
});

router.post("/tweet", function (req, res, next) {
  res.send("tweet criado  com sucesso ");
});

router.delete("/tweet/:id", function (req, res, next) {

  res.send("tweet eliminado");
});



module.exports = router;
