"use strict";

const requestPromise = require("request-promise");
const deferred = require("deferred");

const serverUrl = "http://localhost:7000";

const ServerBridge = (function() {
  function pollJob(jobUrl, jobKey, future) {
    if (!future) {
      future = deferred();
    }

    let requestOptions = {
      method: "GET",
      uri: jobUrl,
      json: true,
      qs: {
        jobKey: jobKey
      }
    };

    var promise = requestPromise(requestOptions);
    promise.then(function(job) {
      future.resolve(job);
    }).catch(function() {
      setTimeout(function() {
        pollJob(jobUrl, jobKey, future);
      }, 500);
    });

    return future.promise;
  }

  function requestJob(requestOptions, jobUrl) {
    var future = deferred();

    var promise = requestPromise(requestOptions);
    promise.then(function(job) {
      var jobPromise = pollJob(jobUrl, job.key);
      future.resolve(jobPromise);
    });

    return future.promise;
  }

  var bridge = {};
  bridge.pollJob = pollJob;
  bridge.requestJob = requestJob;

  return bridge;
})();

var CategoryBridge = (function() {
  function saveCategories(categories) {
    let requestUrl = serverUrl + "/categories"

    let requestOptions = {
      method: "POST",
      uri: requestUrl,
      body: categories,
      json: true
    };

    let jobUrl = requestUrl + "/job";

    var promise = ServerBridge.requestJob(requestOptions, jobUrl);
    return promise;
  }

  var bridge = {};
  bridge.saveCategories = saveCategories;

  return bridge;
})();

var ProductBridge = (function() {
  function saveProducts(products) {
    let requestUrl = serverUrl + "/products"

    let requestOptions = {
      method: "POST",
      uri: requestUrl,
      body: products,
      json: true
    };

    let jobUrl = requestUrl + "/job";

    var promise = ServerBridge.requestJob(requestOptions, jobUrl);
    return promise;
  }

  var bridge = {};
  bridge.saveProducts = saveProducts;

  return bridge;
})();

var categories = [{
  identifier: "category-3",
  shopKey: 1,
  name: "milchprodukte"
}, {
  identifier: "category-2",
  shopKey: 1,
  name: "bananenprodukte"
}];

var categoriesPromise = CategoryBridge.saveCategories(categories);
categoriesPromise.then(function(categories) {
  console.log(categories);

  var products = [{
    identifier: "product-3",
    shopKey: 1,
    name: "milch",
    categoryIdentifiers: ["category-3"],
    price: 100
  }, {
    identifier: "product-2",
    shopKey: 1,
    name: "banane",
    categoryIdentifiers: ["category-2"],
    price: 100,
    salePrice: 50
  }];

  var productsPromise = ProductBridge.saveProducts(products);
  productsPromise.then(function(products) {
    console.log(products);
  });
});
