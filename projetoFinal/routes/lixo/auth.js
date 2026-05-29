var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/auth', function(req, res, next) {
  res.send('precisa de autenticação');
});

module.exports = router;
