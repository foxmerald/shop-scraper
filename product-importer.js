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

    function retryPolling() {
      setTimeout(function() {
        pollJob(jobUrl, jobKey, future);
      }, 500);
    }

    var promise = requestPromise(requestOptions);
    promise.then(function(job) {
      if (job.closedTimestamp > 0) {
        future.resolve(job);
      } else {
        retryPolling();
      }
    }).catch(retryPolling);

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
  function saveCategories(shopKey, categories) {
    let requestUrl = serverUrl + "/categories"

    let requestOptions = {
      method: "POST",
      uri: requestUrl,
      body: categories,
      json: true,
      qs: {
        shopKey: shopKey
      }
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
  function saveProducts(shopKey, products) {
    let requestUrl = serverUrl + "/products"

    let requestOptions = {
      method: "POST",
      uri: requestUrl,
      body: products,
      json: true,
      qs: {
        shopKey: shopKey
      }
    };

    let jobUrl = requestUrl + "/job";

    var promise = ServerBridge.requestJob(requestOptions, jobUrl);
    return promise;
  }

  var bridge = {};
  bridge.saveProducts = saveProducts;

  return bridge;
})();

var shopKey = 1;

var categories = [{
  identifier: "category-3",
  name: "milchprodukte"
}, {
  identifier: "category-2",
  name: "bananenprodukte"
}];

var categoriesPromise = CategoryBridge.saveCategories(shopKey, categories);
categoriesPromise.then(function(job) {
  console.log("categories:");
  console.log(JSON.parse(job.payload));

  var products = [{
    identifier: "product-3",
    name: "milch",
    categoryIdentifiers: ["category-3"],
    price: 100
  }, {
    identifier: "product-2",
    name: "banane",
    categoryIdentifiers: ["category-2"],
    price: 100,
    salePrice: 50
  }];

  var productsPromise = ProductBridge.saveProducts(shopKey, products);
  productsPromise.then(function(products) {
    console.log("products:");
    console.log(JSON.parse(job.payload));

    console.log("done marie :)");
  });
});
