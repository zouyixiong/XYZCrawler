var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/XYZCrawler');

var News = mongoose.model('News', {
  url : String,
  title : String,
  description : String,
  keywords : String
});

exports.News = News;
