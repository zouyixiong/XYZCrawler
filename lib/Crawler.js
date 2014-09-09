/**
 * Created by zouyixiong on 14-9-8.
 *
 * 1 种子URL出发
 *
 * 2 广度优先、深度可配置，依次爬取URL
 * ## 判度URL是否已访问过，判断URL是否允许访问
 * ## 判断返回的文件是否已获取过，生成MD5比较
 *
 * 3 处理返回的文件内容，获取所需信息，过滤下一级hyper links
 * ## 生成一个文件的MD5值
 * ## 提取文件的主体新闻内容（利用注册函数来实现，为不同目的的信息提取提供灵活性）
 * ## 提取hyper links（每个URL设置一个depth属性，表示深度，种子URL为1）
 *
 * 4 存储所得信息（利用注册函数完成具体存储，以便适应不同的信息存储结构）
 *
 * 5 回到2
 */

var shell = require('shelljs');


/**
 *
 * @param fetcher an instance of fetcher
 * @constructor
 */
function Crawler(fetcher){
    this.urls = fetcher.urls;
    this.fetchedUrls = [];
    this.maxDepth = fetcher.maxDepth || 5;
    this.isRelativeURL = fetcher.isRelativeURL || function(){};
    this.parseCurlData = fetcher.parseCurlData || function(){};
}

/**
 *
 */
Crawler.prototype.start = function(){
    var i = 0, iLen  = this.urls.length , url = {};
    for(i = 0; i < iLen; i += 1){
        url = this.urls[i];
        if(Crawler.isWelcome(url.href) && !this.isVisited(url.href)){
            this.curl(url);
        }
        this.fetchedUrls.push(url);
        iLen  = this.urls.length;
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
    shell.exec('curl '+url.href,{silent:true},function(code,output){
        // if(code...){
          // 判断命令执行成功与否

        crawler.getChildrenUrl(url,output);
        crawler.parseCurlData(code,output);
        //}
    });
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

    var newHrefs = [] , i = 0, iLen = newHrefs.length,
        reg = / href=["']([^"']+)/gim, regRes = [];
    // 正则过滤所有的 href="**"
    while((regRes = reg.exec(htmlString)) !== null){
        //console.log(regRes[1]);
        //console.log("\r\n");

        newHrefs.push(regRes[1]);
    }

    for(i = 0; i < iLen; i += 1){
      if( this.isRelativeURL(currentUrl, newHrefs[i]) ){
          this.urls.push({
              href:newHrefs,
              depth:currentUrl.depth + 1
          });
      }
    }
}

module.exports = Crawler;