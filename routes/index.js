var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Maze Solver' });
});

router.get('/v2', function(req, res, next) {
  res.render('index_backup', { title: 'Maze Solver' });
});

module.exports = router;
