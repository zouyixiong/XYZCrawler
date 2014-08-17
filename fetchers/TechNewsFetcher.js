/**
 * Created by zouyixiong on 14-8-17.
 */

var util = require('util');
var NewsFetcher = require('./NewsFetcher');

function TechNewsFetcher(){
    /**
     * 种子urls，每个url含：
     * href：实际的url字符串；
     * depth：本url相对于种子url的深度，种子url的 depth 为1，每深入一层 + 1
     * @property urls
     * @type {{href: string, depth: number}[]}
     */
    this.urls = [{
        href:'http://tech.qq.com/',
        depth:1
    },{
        href:'http://tech.baidu.com/',
        depth:1
    }];

    /**
     * 分类，新闻可能也有很多不同的类别
     */
    this.classify = "TechNews";

    /**
     * 定义本爬虫的最大爬取深度
     * @property maxDepth
     * @type {number}
     */
    this.maxDepth = 4;
}

util.inherits(TechNewsFetcher, NewsFetcher);

module.exports = TechNewsFetcher;