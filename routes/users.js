var express = require('express');
var router = express.Router();
var fetcher = require('../lib/main');

/* GET users listing. */
router.get('/', function(req, res) {
    var urls = ["http://tech.qq.com/a/20140808/061411.htm",
                "http://tech.qq.com/a/20140808/011521.htm",
                "http://tech.qq.com/a/20140808/022101.htm"];
    fetcher.fetchURL(urls);

  res.send('respond with a resource');
});

module.exports = router;
