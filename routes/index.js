var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("index", { admin: false});
});
router.get('/about', function (req, res, next) {
  res.render('index/About',  { admin: false});
});
router.get('/services', function (req, res, next) {
  res.render('index/Services',  { admin: false});
});


module.exports = router;
