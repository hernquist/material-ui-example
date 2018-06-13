var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Orange Method Curriculum Dashboard', version: process.env.npm_package_version });
});

router.get('/api/version', (req, res, next) => {
  res.status(200).json({ version: process.env.npm_package_version });
});

module.exports = router;
