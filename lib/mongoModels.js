var Promise = require('promise');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/XYZCrawler');

var db = mongoose.connection;
db.on('error', console.log.bind(console, 'mongoose connection error:'));
db.once('open', function(){
  
});


var News = mongoose.model('News', {
  classify : String,
  url : String,
  title : String,
  description : String,
  keywords : String
});

/* promise version of save() and find() */
News.prototype.pSave = Promise.denodeify(News.prototype.save);
News.prototype.pFind = Promise.denodeify(News.prototype.find);

exports.News = News;
