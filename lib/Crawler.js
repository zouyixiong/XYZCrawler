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
var pathForFetchedURL = 'fetched';
if(!shell.test('-e',pathForFetchedURL)){
    shell.mkdir(pathForFetchedURL);
}

function fetchURL(urls){
    for(var i in urls){
        (function(i){
            shell.exec('curl '+urls[i],{silent:true},function(code,output){
                output.to(pathForFetchedURL + '/' + i + '.html');
            });
        })(i);
    }
}

exports.fetchURL = fetchURL;
