/**
 * Created by zouyixiong on 14-9-8.
 *
 * 1 种子URL出发
 *
 * 2 广度优先、深度可配置，依次爬取URL
 * ## 判度URL是否已访问过，判断URL是否允许访问
 *
 * 3 处理返回的文件内容，获取所需信息，过滤下一级hyper links
 * ## 提取文件的主体新闻内容（利用注册函数来实现，为不同目的的信息提取提供灵活性）
 * ## 提取hyper links（每个URL设置一个depth属性，表示深度，种子URL为1）
 *
 * 4 存储所得信息（利用注册函数完成具体存储，以便适应不同的信息存储结构）
 *
 * 5 回到2
 */

var pWrapper = require('./lib/promiseWrapper');
var myUtil = require('./lib/Util');
/**
 *
 * @param fetcher an instance of fetcher
 * @constructor
 */
function Crawler(fetcher){
    this.urls = fetcher.urls;
    this.fetchedUrls = [];
    this.maxDepth = fetcher.maxDepth || 5;
    this.fetcher = fetcher;

    // 这样做，会使得isRelativeURL/parseCurlData函数内部的this指向了Crawler实例
    //this.isRelativeURL = fetcher.isRelativeURL || function(){return true};
    //this.parseCurlData = fetcher.parseCurlData || function(){};
}

/**
 *
 */
Crawler.prototype.start = function(){
    var url = this.urls.shift(), callee = arguments.callee, crawler = this;
    if(!url){
        return;
    }

    if(Crawler.isWelcome(url.href) && !this.isVisited(url.href)){
        this.fetchedUrls.push(url);
        this.curl(url).then(function(data){
            /* curl执行几个后，就出现卡住，无法再继续执行爬取文件，不知道是否是目标网站做了限制 */
            callee.call(crawler);
        });
    }
}
/**
 * 根据robots.txt 判断是否可以爬取该链接
 * @param href
 */
Crawler.isWelcome = function(href){
    // 此处假设所有都可以访问
    return true;
}

/**
 * 判断该链接是否已经访问过
 * @param href
 */
Crawler.prototype.isVisited = function(href){
    var i = 0, iLen = this.fetchedUrls.length;
    for(i = 0; i < iLen; i += 1){
        if(href === this.fetchedUrls[i].href){
            return true;
        }
    }
    return false;
}

Crawler.prototype.curl = function(url){
    var crawler = this;
   return pWrapper.shellExec('curl '+ url.href , {silent:true})
    .then(function(output){
        // curl 出来结果前面有段不知道从哪里来的，暂时不知道原因，先去掉，以免影响后续html parse
        var tmpOutput = output.toLowerCase(),
            documentStart = tmpOutput.indexOf('<!doctype ');
            documentStart = documentStart > 0 ? documentStart : tmpOutput.indexOf('<html ');
            documentStart = documentStart > 0 ? documentStart : 0;
        output = output.substring(documentStart);

        crawler.getChildrenUrl(url, output);
        crawler.fetcher.parseCurlData(url, output);
    },console.error);
}

/**
 * 首先判断爬取深度，未达到最大深度，则执行：
 * 扫描curl获取到的文件，获取其中的hyper link，判断是否与本次爬取的主题相关，相关则放入待爬取url列表中
 * @param currentUrl
 * @param htmlString
 */
Crawler.prototype.getChildrenUrl = function(currentUrl,htmlString){
    if(currentUrl.depth >= this.maxDepth){
        return;
    }
    var newHrefs = [] , i = 0, iLen = 0,
        reg = / href=["']([^"']+)/gim, regRes = [];
    // 正则过滤所有的 href="**"
    while((regRes = reg.exec(htmlString)) !== null){
        var newHref = regRes[1];
        //console.log(newHref);
        //console.log("\r\n");

        if(myUtil.isValidHyperLink(newHref)){
            if(myUtil.isCompleteLink(newHref)){
                newHrefs.push(newHref);
            }else{
                newHrefs.push(currentUrl.href + newHref);
            }
        }
    }

    for(i = 0, iLen = newHrefs.length; i < iLen; i += 1){
      if( this.fetcher.isRelativeURL(currentUrl, newHrefs[i]) ){
          this.urls.push({
              href:newHrefs[i],
              depth:currentUrl.depth + 1
          });
      }
    }
}

module.exports = Crawler;