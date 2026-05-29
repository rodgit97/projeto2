var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/admin', function(req, res, next) {
  res.send('rota de admin');
});

router.post('/admin', function(req, res, next) {
  res.send('admin criado com sucesso');
});

router.delete('/admin/:id', function(req, res, next) {
  res.send('admin eliminado');
});



module.exports = router;