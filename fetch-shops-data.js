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

  var categoriesPromise = sendCategoriesData(shopKeys.billa, data.categories);
  categoriesPromise.then(function() {
    var productsPromise = sendProductsData(shopKeys.billa, data.products);
    productsPromise.catch(Logger.error);
  }).catch(Logger.error);
}).catch(Logger.error);

function sendProductsData(shopKey, products) {
  var future = deferred();

  Logger.log("products start import");

  ServerBridge.startImport(shopKey).then(job => {
    Logger.log("products import started");
    var jobKey = job.key;

    ProductBridge.saveProducts(shopKey, products).then(result => {
      Logger.log("products sent");

      ServerBridge.finishImport(shopKey, jobKey).then(job => {
        Logger.log("products import finished");

        future.resolve();
      }).catch(future.reject);
    }).catch(future.reject);
  }).catch(future.reject);

  return future.promise;
}

function sendCategoriesData(shopKey, categories) {
  var future = deferred();

  Logger.log("categories start import");

  ServerBridge.startImport(shopKey).then(job => {
    Logger.log("categories import started");

    var jobKey = job.key;

    CategoryBridge.saveCategories(shopKey, categories).then(result => {
      Logger.log("categories sent");

      ServerBridge.finishImport(shopKey, jobKey).then(job => {
        Logger.log("categories import finished");

        future.resolve();
      }).catch(future.reject);
    }).catch(future.reject);
  }).catch(future.reject);

  return future.promise;
}
