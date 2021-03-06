/**
 * Created by zouyixiong on 14-9-9.
 */
var pWrapper = require('../lib/promiseWrapper');
var models = require('../lib/mongoModels');

/**
 * @class NewsFetcher
 * @constructor
 */
function NewsFetcher(){
    /**
     * 种子urls，每个url含：
     * href：实际的url字符串；
     * depth：本url相对于种子url的深度，种子url的 depth 为1，每深入一层 + 1
     * @property urls
     * @type {{href: string, depth: number}[]}
     */
    this.urls = [{
        href:'http://qq.com/',
        depth:1
    },{
        href:'http://baidu.com/',
        depth:1
    }];
    
    /**
     * 分类，新闻可能也有很多不同的类别
     */
    this.classify = "news";

    /**
     * 定义本爬虫的最大爬取深度
     * @property maxDepth
     * @type {number}
     */
    this.maxDepth = 5;
}

/**
 * 用于判定所获取到的页面内的 hyper link 是不是与我们本次爬取信息相关联的
 * @method isRelativeURL
 * @param{String}parentUrl
 * @param{String}newUrl
 * @return{Boolean}
 */
NewsFetcher.prototype.isRelativeURL = function(parentUrl,newUrl){
    return true;
}

/**
 * 用于解析本次爬取所获取到的文件，应在其中完成具体的解析操作及存储。
 * 考虑到不同爬取主题的文件，可能需要不同的解析方式及不同的存储结构，故解析部分通过注入实现。
 * @method parseCurlData
 * @param{String} url
 * @param{String} data
 */
NewsFetcher.prototype.parseCurlData = function(url, data){
    var fetcher = this;
    pWrapper.$parser(data).then(function($){
        var title = $('title').text(),
            desc = $('meta[name^="description"]').attr('content'),
            keywords = $('meta[name^="keywords"]').attr('content');
    
        var news = new models.News({classify:fetcher.classify ,href:url.href,
                    title:title, description:desc, keywords:keywords});
       /*
        news.psave().
        then(function(data){
            console.log('save data to mongodb success. '+data);
            },function(err){
                console.error('save data to mongodb error. ' + err.message);
            }); // .then() 暂不确定如何处理结果
        */
        news.save(function(err){
           if(err){
               console.log('save data to mongodb error. ' + err.message);
           }
        });
    });
}

module.exports = NewsFetcher;
