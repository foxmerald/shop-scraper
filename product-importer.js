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

    request(requestOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        future.resolve(body);
      } else {
        retryPolling();
      }
    });

    return future.promise;
  }

  function requestJob(requestOptions, jobUrl) {
    var future = deferred();

    request(requestOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        var job = body;

        var jobPromise = pollJob(jobUrl, job.key);
        future.resolve(jobPromise);
      } else {
        Logger.error(`error from ${url}: ${error}`);
        future.reject(error);
      }
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

    request(options, (error, response, body) => {
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

    request(options, (error, response, body) => {
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

    request(options, (error, response, body) => {
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

    request(options, (error, response, body) => {
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

module.exports = {
  ProductBridge: ProductBridge,
  CategoryBridge: CategoryBridge,
  ServerBridge: ServerBridge,
}
