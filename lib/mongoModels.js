var Promise = require('promise');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/XYZCrawler');

var db = mongoose.connection;
db.on('error', console.log.bind(console, 'mongoose connection error:'));
db.once('open', function(){
  
});

var newsSchema = new Schema({
  classify : String,
  url : String,
  title : String,
  description : String,
  keywords : String,
  content : String,
  publicTime : {type : Date, default: Date.now}
}, { autoIndex: false });

/* 基于classify、publicTime建立索引，使得按分类、(相同分类上)按时间查询更快速 */
newsSchema.index({classify : 1, publicTime : -1});

/* promise version of save() and find() */
newsSchema.methods.pSave = Promise.denodeify(newsSchema.methods.save);
newsSchema.methods.pFind = Promise.denodeify(newsSchema.methods.find);

var News = mongoose.model('News', newsSchema);


exports.News = News;
