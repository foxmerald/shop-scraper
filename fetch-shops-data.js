"use strict";

const request = require('request');
const requestPromise = require("request-promise");
const deferred = require("deferred");

var ProductImporter = require("./product-importer");
var ImportBridge = ProductImporter.ImportBridge;
var ServerBridge = ProductImporter.ServerBridge;

var TestDataBridge = require("./test-data-bridge");
var Logger = require("./log-bridge");

const shopDataKeys = {
  billa: 1,
  merkur: 2
}

Logger.log("start fetching data");

// BILLA
var billaFetcher = require("./billa-fetcher");
var billaPromise = billaFetcher.fetchData();

billaPromise.then(data => {
  Logger.log("send billa data");

  let shopDataKey = shopDataKeys.billa;

  sendRawData(shopDataKey);

  var categoriesPromise = sendCategoriesData(shopDataKey, data.categories);
  categoriesPromise.then(function() {
    var productsPromise = sendProductsData(shopDataKey, data.products);
    productsPromise.catch(Logger.error);
  }).catch(Logger.error);
}).catch(Logger.error);

// MERKUR
var merkurFetcher = require("./merkur-fetcher");
var merkurPromise = merkurFetcher.fetchData();

merkurPromise.then(data => {
  Logger.log("send merkur data");

  let shopDataKey = shopDataKeys.merkur;

  sendRawData(shopDataKey);

  var categoriesPromise = sendCategoriesData(shopDataKey, data.categories);
  categoriesPromise.then(function() {
    var productsPromise = sendProductsData(shopDataKey, data.products);
    productsPromise.catch(Logger.error);
  }).catch(Logger.error);
}).catch(Logger.error);

function sendProductsData(shopDataKey, products) {
  var future = deferred();

  Logger.log("products start import");

  ImportBridge.startProductsImport(shopDataKey).then(job => {
    Logger.log("products import started");
    var jobKey = job.key;

    ImportBridge.saveProducts(shopDataKey, products).then(result => {
      Logger.log("products sent");

      ImportBridge.finishProductsImport(shopDataKey, jobKey).then(job => {
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

  ImportBridge.startCategoriesImport(shopDataKey).then(job => {
    Logger.log("categories import started");

    var jobKey = job.key;

    ImportBridge.saveCategories(shopDataKey, categories).then(result => {
      Logger.log("categories sent");

      ImportBridge.finishCategoriesImport(shopDataKey, jobKey).then(job => {
        Logger.log("categories import finished");

        future.resolve();
      }).catch(future.reject);
    }).catch(future.reject);
  }).catch(future.reject);

  return future.promise;
}

function sendRawData(shopDataKey) {
  var dataPromise = TestDataBridge.loadFile(shopDataKey);
  dataPromise.then(function(data) {
    ImportBridge.saveRawData(shopDataKey, data);
  });
}
