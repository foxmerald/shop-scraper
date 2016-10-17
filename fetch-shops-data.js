"use strict";

const request = require('request');
const requestPromise = require("request-promise");
const deferred = require("deferred");

var ProductImporter = require("./product-importer");
var CategoryBridge = ProductImporter.CategoryBridge;
var ProductBridge = ProductImporter.ProductBridge;
var ServerBridge = ProductImporter.ServerBridge;

var Logger = require("./log-bridge");

const shopDataKeys = {
  billa: 1,
  merkur: 2,
}

Logger.log("start fetching data");

// BILLA
var billaFetcher = require("./billa-fetcher");
var billaPromise = billaFetcher.fetchData();

billaPromise.then(data => {
  Logger.log("send billa data");

  var categoriesPromise = sendCategoriesData(shopDataKeys.billa, data.categories);
  categoriesPromise.then(function() {
    var productsPromise = sendProductsData(shopDataKeys.billa, data.products);
    productsPromise.catch(Logger.error);
  }).catch(Logger.error);
}).catch(Logger.error);

// MERKUR
var merkurFetcher = require("./merkur-fetcher");
var merkurPromise = merkurFetcher.fetchData();

merkurPromise.then(data => {
  debugger;
  Logger.log("send merkur data");

  var categoriesPromise = sendCategoriesData(shopDataKeys.merkur, data.categories);
  categoriesPromise.then(function() {
    debugger;
    var productsPromise = sendProductsData(shopDataKeys.merkur, data.products);
    productsPromise.catch(Logger.error);
  }).catch(Logger.error);
}).catch(Logger.error);

function sendProductsData(shopDataKey, products) {
  var future = deferred();

  Logger.log("products start import");

  ProductBridge.startImport(shopDataKey).then(job => {
    Logger.log("products import started");
    var jobKey = job.key;

    ProductBridge.saveProducts(shopDataKey, products).then(result => {
      Logger.log("products sent");

      ProductBridge.finishImport(shopDataKey, jobKey).then(job => {
        Logger.log("products import finished");

        future.resolve();
      }).catch(future.reject);
    }).catch(future.reject);
  }).catch(future.reject);

  return future.promise;
}

function sendCategoriesData(shopDataKey, categories) {
  var future = deferred();

  Logger.log("categories start import");

  CategoryBridge.startImport(shopDataKey).then(job => {
    Logger.log("categories import started");

    var jobKey = job.key;

    CategoryBridge.saveCategories(shopDataKey, categories).then(result => {
      Logger.log("categories sent");

      CategoryBridge.finishImport(shopDataKey, jobKey).then(job => {
        Logger.log("categories import finished");

        future.resolve();
      }).catch(future.reject);
    }).catch(future.reject);
  }).catch(future.reject);

  return future.promise;
}
