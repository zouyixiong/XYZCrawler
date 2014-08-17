/**
 * Created by zouyixiong on 14-9-9.
 */
var Crawler = require('./Crawler');
var TechNewsFetcher = require('./fetchers/TechNewsFetcher');
var Promise = require('promise');

var newsCrawler = new Crawler(new TechNewsFetcher());
newsCrawler.start();
