/**
 * Created by zouyixiong on 14-8-17.
 */
var express = require('express');
var router = express.Router();
var models = require('../lib/mongoModels');
var News = models.News;

/* GET news page. */
router.get('/:classify', function(req, res) {
    var classify = req.params.classify;
    News.pFind({classify:classify}).then(function(docs){
        res.render('news',{news:docs});
    });
});

module.exports = router;
