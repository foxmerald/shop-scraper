// Author: TomTasche
"use strict";

const request = require("request");
const deferred = require("deferred");
const Logger = require("./log-bridge");
const ServerBridge = require("./server-bridge");

var serverUrl;
var PRODUCTION = !!process.env.ZUPER_PRODUCTION;
if (PRODUCTION) {
  serverUrl = "https://zuper-preise-backend.appspot.com";
} else {
  serverUrl = "http://localhost:7000";
}

var apiKey = process.env.ZUPER_API_KEY;
// TODO: remove
apiKey = "G2sxb819q4J8Q5n878b4kvC7647la5Qh";

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
      json: true
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
      json: true
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
    }).catch(error => {
      Logger.error(error);
      future.reject();
    })

    return future.promise;
  }

  function finishProductsImport(shopDataKey, jobKey) {
    let url = serverUrl + "/import/products/finish";

    return finishImport(url, shopDataKey, jobKey);
  }

  function sendProductsData(shopDataKey, products) {
    var future = deferred();

    Logger.log("products start import");

    startProductsImport(shopDataKey).then(job => {
      Logger.log("products import started");
      var jobKey = job.key;

      saveProducts(shopDataKey, products).then(result => {
        Logger.log("products sent");

        finishProductsImport(shopDataKey, jobKey).then(job => {
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

    startCategoriesImport(shopDataKey).then(job => {
      Logger.log("categories import started");

      var jobKey = job.key;

      saveCategories(shopDataKey, categories).then(result => {
        Logger.log("categories sent");

        finishCategoriesImport(shopDataKey, jobKey).then(job => {
          Logger.log("categories import finished");

          future.resolve();
        }).catch(future.reject);
      }).catch(future.reject);
    }).catch(future.reject);

    return future.promise;
  }

  function saveRawData(shopDataKey, data) {
    let future = deferred();
    if (!PRODUCTION) {
      future.resolve();

      return future.promise;
    }

    let requestUrl = serverUrl + "/import/raw";

    let requestOptions = {
      method: "GET",
      uri: requestUrl,
      json: true,
      qs: {
        shopDataKey: shopDataKey
      }
    };

    let promise = ServerBridge.authenticateRequest(requestOptions);
    promise.then(function(body) {
      let uploadUrl = body.url;

      let requestOptions = {
        method: "PUT",
        uri: uploadUrl,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "image/jpeg"
        }
      };

      request(requestOptions, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          future.resolve();
        } else {
          future.reject(error);
        }
      });
    }).catch(future.reject);

    return future.promise;
  }

  var bridge = {};
  bridge.saveRawData = saveRawData;
  bridge.sendProductsData = sendProductsData;
  bridge.sendCategoriesData = sendCategoriesData;

  return bridge;
})();

module.exports = ImportBridge;
