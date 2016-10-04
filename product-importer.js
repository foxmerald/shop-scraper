"use strict";

const requestPromise = require("request-promise");
const deferred = require("deferred");
const Logger = require("./log-bridge");

const serverUrl = "https://zuper-preise-backend.appspot.com";

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
  function saveCategories(shopDataKey, categories) {
    let requestUrl = serverUrl + "/import/categories"

    let requestOptions = {
      method: "POST",
      uri: requestUrl,
      body: {
        shopDataKey: shopDataKey,
        categories: categories
      },
      json: true,
      qs: {
        shopDataKey: shopDataKey
      }
    };

    let jobUrl = serverUrl + "/import/job";

    var promise = ServerBridge.requestJob(requestOptions, jobUrl);
    return promise;
  }

  function startImport(shopDataKey) {
    let future = deferred();

    let url = serverUrl + "/import/categories/start";
    let options = {
      method: "POST",
      url: url,
      body: {
        shopDataKey: shopDataKey
      },
      json: true,
      qs: {
        shopDataKey: shopDataKey
      }
    };

    let promise = requestPromise(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        Logger.log(`import started - data fetched from ${url}: ${body}`);
        future.resolve(body);
      } else {
        Logger.error(`error from ${url}: ${error}`);
        future.reject(error);
      }
    });

    return future.promise;
  }

  function finishImport(shopDataKey, jobKey) {
    let future = deferred();

    let url = serverUrl + "/import/categories/finish";
    let options = {
      method: "POST",
      url: url,
      body: {
        shopDataKey: shopDataKey,
        jobKey: jobKey
      },
      json: true,
      qs: {
        shopDataKey: shopDataKey
      }
    };

    let promise = requestPromise(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        Logger.log(`import finished - data fetched from ${url}: ${body}`);
        future.resolve(body);
      } else {
        Logger.error(`error from ${url}: ${error}`);
        future.reject(error);
      }
    });

    return future.promise;
  }

  var bridge = {};
  bridge.saveCategories = saveCategories;
  bridge.startImport = startImport;
  bridge.finishImport = finishImport;

  return bridge;
})();

var ProductBridge = (function() {
  function saveProductBatch(shopDataKey, products) {
    let requestUrl = serverUrl + "/import/products";

    let requestOptions = {
      method: "POST",
      uri: requestUrl,
      body: {
        shopDataKey: shopDataKey,
        products: products
      },
      json: true,
      qs: {
        shopDataKey: shopDataKey
      }
    };

    let jobUrl = serverUrl + "/import/job";

    var promise = ServerBridge.requestJob(requestOptions, jobUrl);
    return promise;
  }

  function saveProducts(shopDataKey, products) {
    var future = deferred();
    var productsPromises = [];

    while (products.length) {
      let productsStack = products.splice(0, 1000);
      let promise = saveProductBatch(shopDataKey, productsStack);

      productsPromises.push(promise);
    }

    Promise.all(productsPromises).then(result => {
      future.resolve(result);
    }).catch(e => {
      Logger.error(e);
      future.reject();
    })

    return future.promise;
  }

  function startImport(shopDataKey) {
    let future = deferred();

    let url = serverUrl + "/import/products/start";
    let options = {
      method: "POST",
      url: url,
      body: {
        shopDataKey: shopDataKey
      },
      json: true,
      qs: {
        shopDataKey: shopDataKey
      }
    };

    let promise = requestPromise(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        Logger.log(`import started - data fetched from ${url}: ${body}`);
        future.resolve(body);
      } else {
        Logger.error(`error from ${url}: ${error}`);
        future.reject(error);
      }
    });

    return future.promise;
  }

  function finishImport(shopDataKey, jobKey) {
    let future = deferred();

    let url = serverUrl + "/import/products/finish";
    let options = {
      method: "POST",
      url: url,
      body: {
        shopDataKey: shopDataKey,
        jobKey: jobKey
      },
      json: true,
      qs: {
        shopDataKey: shopDataKey
      }
    };

    let promise = requestPromise(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        Logger.log(`import finished - data fetched from ${url}: ${body}`);
        future.resolve(body);
      } else {
        Logger.error(`error from ${url}: ${error}`);
        future.reject(error);
      }
    });

    return future.promise;
  }

  var bridge = {};
  bridge.saveProducts = saveProducts;
  bridge.startImport = startImport;
  bridge.finishImport = finishImport;

  return bridge;
})();

/*
var shopDataKey = 1;

var categories = [{
  identifier: "category-3",
  name: "milchprodukte"
}, {
  identifier: "category-2",
  name: "bananenprodukte",
  subcategoryIdentifiers: ["category-3"]
}];

var categoriesPromise = CategoryBridge.saveCategories(shopDataKey, categories);
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

  var productsPromise = ProductBridge.saveProducts(shopDataKey, products);
  productsPromise.then(function(products) {
    console.log("products:");
    console.log(JSON.parse(job.payload));

    console.log("done marie :)");
  });
});
*/

module.exports = {
  ProductBridge: ProductBridge,
  CategoryBridge: CategoryBridge,
  ServerBridge: ServerBridge,
}
