var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("index", { admin: false});
});
router.get('/index/About', function(req, res, next) {
  res.send('index');
});

module.exports = router;
