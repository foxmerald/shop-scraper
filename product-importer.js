"use strict";

const request = require("request");
const deferred = require("deferred");
const Logger = require("./log-bridge");

var serverUrl;
if (process.env.ZUPER_PRODUCTION) {
  serverUrl = "https://zuper-preise-backend.appspot.com";
} else {
  serverUrl = "http://localhost:7000";
}

var apiKey = process.env.ZUPER_API_KEY;
// TODO: remove
apiKey = "G2sxb819q4J8Q5n878b4kvC7647la5Qh";

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

    var retryPolling = function() {
      setTimeout(function() {
        pollJob(jobUrl, jobKey, future);
      }, 500);
    };

    var promise = authenticateRequest(requestOptions);
    promise.then(function(body) {
      var job = body;

      if (job.closedTimestamp) {
        future.resolve(body);
      } else {
        retryPolling();
      }
    }).catch(retryPolling);

    return future.promise;
  }

  function requestJob(requestOptions, jobUrl) {
    var future = deferred();

    var promise = authenticateRequest(requestOptions);
    promise.then(function(body) {
      var job = body;

      var jobPromise = pollJob(jobUrl, job.key);
      future.resolve(jobPromise);
    }).catch(future.reject);

    return future.promise;
  }

  function authenticateRequest(requestOptions) {
    var future = deferred();

    requestOptions.headers = requestOptions.headers || {};
    requestOptions.headers["x-zuper-api-key"] = apiKey;

    request(requestOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        future.resolve(body);
      } else {
        future.reject(error);
      }
    });

    return future.promise;
  }

  var bridge = {};
  bridge.pollJob = pollJob;
  bridge.requestJob = requestJob;
  bridge.authenticateRequest = authenticateRequest;

  return bridge;
})();

const ImportBridge = (function() {
  function startImport(url, shopDataKey) {
    let requestOptions = {
      method: "POST",
      url: url,
      body: {
        shopDataKey: shopDataKey
      },
      json: true
    };

    var promise = ServerBridge.authenticateRequest(requestOptions);

    return promise;
  }

  function finishImport(url, shopDataKey, jobKey) {
    let requestOptions = {
      method: "POST",
      url: url,
      body: {
        shopDataKey: shopDataKey,
        jobKey: jobKey
      },
      json: true
    };

    let jobUrl = serverUrl + "/import/job";
    let promise = ServerBridge.requestJob(requestOptions, jobUrl);

    return promise;
  }

  function startCategoriesImport(shopDataKey) {
    let url = serverUrl + "/import/categories/start";

    return startImport(url, shopDataKey);
  }

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

  function finishCategoriesImport(shopDataKey, jobKey) {
    let url = serverUrl + "/import/categories/finish";

    return finishImport(url, shopDataKey, jobKey);
  }

  function startProductsImport(shopDataKey) {
    let url = serverUrl + "/import/products/start";

    return startImport(url, shopDataKey);
  }

  function saveProductBatch(previousPromise, shopDataKey, products) {
    if (previousPromise) {
      previousPromise.done(function() {
        saveProductBatch(null, shopDataKey, products);
      });

      return;
    }

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

    var previousPromise;
    while (products.length) {
      let productsStack = products.splice(0, 1000);
      let promise = saveProductBatch(previousPromise, shopDataKey, productsStack);

      productsPromises.push(promise);

      previousPromise = promise;
    }

    Promise.all(productsPromises).then(result => {
      future.resolve(result);
    }).catch(e => {
      Logger.error(e);
      future.reject();
    })

    return future.promise;
  }

  function finishProductsImport(shopDataKey, jobKey) {
    let url = serverUrl + "/import/products/finish";

    return finishImport(url, shopDataKey, jobKey);
  }

  function saveRawData(shopDataKey) {}

  var bridge = {};
  bridge.startCategoriesImport = startCategoriesImport;
  bridge.saveCategories = saveCategories;
  bridge.finishCategoriesImport = finishCategoriesImport;
  bridge.startProductsImport = startProductsImport;
  bridge.saveProducts = saveProducts;
  bridge.finishProductsImport = finishProductsImport;
  bridge.saveRawData = saveRawData;

  return bridge;
})();

module.exports = {
  ImportBridge: ImportBridge,
  ServerBridge: ServerBridge,
}
