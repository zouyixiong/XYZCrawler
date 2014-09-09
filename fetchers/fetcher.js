/**
 * Created by zouyixiong on 14-9-9.
 */

/**
 * @class Fetcher
 * @constructor
 */
function Fetcher(){
    /**
     * 种子urls，每个url含：
     * href：实际的url字符串；
     * depth：本url相对于种子url的深度，种子url的 depth 为1，每深入一层 + 1
     * @property urls
     * @type {{href: string, depth: number}[]}
     */
    this.urls = [{
        href:'',
        depth:1
    },{
        href:'',
        depth:1
    },{
        href:'',
        depth:1
    },{
        href:'',
        depth:1
    },{
        href:'',
        depth:1
    },{
        href:'',
        depth:1
    }];

    /**
     * 定义本爬虫的最大爬取深度
     * @property maxDepth
     * @type {number}
     */
    this.maxDepth = 4;
}

/**
 * 用于判定所获取到的页面内的 hyper link 是不是与我们本次爬取信息相关联的
 * @method isRelativeURL
 * @param{String}parentUrl
 * @param{String}newUrl
 * @return{Boolean}
 */
Fetcher.prototype.isRelativeURL = function(parentUrl,newUrl){

}

/**
 * 用于解析本次爬取所获取到的文件，应在其中完成具体的解析操作及存储。
 * 考虑到不同爬取主题的文件，可能需要不同的解析方式及不同的存储结构，故解析部分通过注入实现。
 * @method parseCurlData
 * @param{Number} code
 * @param{String} data
 */
Fetcher.prototype.parseCurlData = function(code, data){

}