var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'PROJETO FINAL TWITTER CLONE' });
});

router.get('/home', function(req, res, next) {
  res.send('Bem-vindo à página inicial do Twitter Clone!');
});

module.exports = router;
