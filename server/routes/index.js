var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/connect', function(req, res, next) {
  res.json({
    data: 'hello!'
  });
});

router.get('/send', function(req, res, next) {

});

router.get('/get', function(req, res, next) {

});

module.exports = router;
