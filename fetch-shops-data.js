"use strict";

const request = require('request');

var ProductImporter = require("./product-importer");
var CategoryBridge = ProductImporter.CategoryBridge;
var ProductBridge = ProductImporter.ProductBridge;
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
  sendData(shopKeys.billa, data);
}).catch(e => {
  Logger.error(e);
});

function sendData(shopKey, data) {
  //TODO schick in päckchen von hundert

  var products = data.products.slice(0, 99); //TODO remove

  var categoryPromise = CategoryBridge.saveCategories(shopKey, data.categories);
  var productPromise = ProductBridge.saveProducts(shopKey, products);

  categoryPromise.then(result => {
    Logger.log("billa category-data sent");
    Logger.log(result);
  }).catch(error => {
    Logger.error("billa category-data error: " + error);
  });

  productPromise.then(result => {
    Logger.log("billa products-data sent");
    Logger.log(result);
  }).catch(error => {
    Logger.error("billa products-data error: " + error);
  });
}

/*
merkurPromise.then(data => {
var categoryPromise = CategoryBridge.saveCategories(2, data.categories);
var productPromise = ProductBridge.saveProducts(2, data.products);

categoryPromise.then(result => {
  console.log(result);
}).catch(error => {console.error(error);};

productPromise.then(result => {
  console.log(result);
}).catch(error => {console.error(error);};
}).catch(e => {
  console.error(e);
});
*/
