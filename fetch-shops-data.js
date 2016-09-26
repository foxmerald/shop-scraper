"use strict";

const request = require('request');

console.log("start fetching data");

var CategoryBridge = require("./product-importer").CategoryBridge;
var ProductBridge = require("./product-importer").ProductBridge;

var billaFetcher = require("./billa-fetcher");
//var merkurFetcher = require("./merkur-fetcher");

var billaPromise = billaFetcher.fetchData();
//var merkurPromise = merkurFetcher.fetchData();

billaPromise.then(data => {
  console.log("send billa data");
  sendData(1, data);
}).catch(e => {
  console.error(e);
});

function sendData(shopKey, data) {
  var products = data.products.slice(0, 99); //TODO remove

  var categoryPromise = CategoryBridge.saveCategories(shopKey, data.categories);
  var productPromise = ProductBridge.saveProducts(shopKey, products);

  categoryPromise.then(result => {
    console.log("billa category-data sent");
    console.log(result);
  }).catch(error => {
    console.error("billa category-data error: " + error);
  });

  productPromise.then(result => {
    console.log("billa products-data sent");
    console.log(result);
  }).catch(error => {
    console.error("billa products-data error: " + error);
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
