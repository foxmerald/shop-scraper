"use strict";

const request = require('request');
const requestPromise = require("request-promise");
const deferred = require("deferred");

var ProductImporter = require("./product-importer");
var CategoryBridge = ProductImporter.CategoryBridge;
var ProductBridge = ProductImporter.ProductBridge;
var ServerBridge = ProductImporter.ServerBridge;

var Logger = require("./log-bridge");

const shopKeys = {
  billa: 1,
  merkur: 2,
}

Logger.log("start fetching data");

var billaFetcher = require("./billa-fetcher");
//var merkurFetcher = require("./merkur-fetcher");

var billaPromise = billaFetcher.fetchData();
//var merkurPromise = merkurFetcher.fetchData();

billaPromise.then(data => {
  Logger.log("send billa data");

  sendCategoriesData(shopKeys.billa, data.categories);
  sendProductsData(shopKeys.billa, data.products);
}).catch(e => {
  Logger.error(e);
});

function sendProductsData(shopKey, products) {
  Logger.log("products start import");

  ServerBridge.startImport(shopKey).then(job => {
    Logger.log("products import started");
    var jobKey = job.key;

    ProductBridge.sendProducts(shopKey, products).then(result => {
      Logger.log("products sent");

      ServerBridge.finishImport(shopKey, jobKey).then(job => {
        Logger.log("products import finished");
      }).catch(e => Logger.error(e));
    }).catch(e => Logger.error(e));
  }).catch(e => Logger.error(e));
}

function sendCategoriesData(shopKey, categories) {
  Logger.log("categories start import");

  ServerBridge.startImport(shopKey).then(job => {
    Logger.log("categories import started");

    var jobKey = job.key;

    CategoryBridge.saveCategories(shopKey, categories).then(result => {
      Logger.log("categories sent");

      ServerBridge.finishImport(shopKey, jobKey).then(job => {
        Logger.log("categories import finished");
      }).catch(e => Logger.error(e));
    }).catch(e => Logger.error(e));
  }).catch(e => Logger.error(e));
}
