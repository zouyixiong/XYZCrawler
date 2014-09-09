/**
 * Created by zouyixiong on 14-9-9.
 */
var Crawler = require('./lib/Crawler');
var NewsFetcher = require('./fetchers/NewsFetcher');

var newsCrawler = new Crawler(new NewsFetcher());

newsCrawler.start();