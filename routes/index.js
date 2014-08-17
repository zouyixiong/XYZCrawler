var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    var classifies = [{
        name:'News',
        show:"新闻"
    },{
        name:'TechNews',
        show:"科技"
    },{
        name:'FinanceNews',
        show:"财经"
    }];
  res.render('index', { classifies: classifies });
});

module.exports = router;
