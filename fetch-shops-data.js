"use strict";

const Deferred = require("deferred");
const ImportBridge = require("./bridges/import-bridge");
const Logger = require("./bridges/log-bridge");
const TestDataBridge = require("./bridges/test-data-bridge");

const SHOP_DATA_KEYS = {
  billa: 2,
  merkur: 3,
  spar: 4,
}

fetchAndSendData("billa");
fetchAndSendData("merkur");
//fetchAndSendData("spar");

function fetchAndSendData(shopName) {
  Logger.log(`start fetching ${shopName} data`);

  let fetcher = require(`./shops-fetcher/${shopName}-fetcher`);
  let promise = fetcher.fetchData();

  promise.then(data => {
    Logger.log(`send ${shopName} categories`);

    let shopDataKey = SHOP_DATA_KEYS[shopName];

    sendRawData(shopDataKey);

    let categoriesPromise = ImportBridge.sendCategoriesData(shopDataKey, data.categories);
    categoriesPromise.then(function() {
      Logger.log(`send ${shopName} products`);

      let productsPromise = ImportBridge.sendProductsData(shopDataKey, data.products);
      productsPromise.catch(Logger.error);
    }).catch(Logger.error);
  }).catch(Logger.error);
}

function sendRawData(shopDataKey) {
  Logger.log(`send raw data`);

  var dataPromise = TestDataBridge.loadFile(shopDataKey);
  dataPromise.then(function(data) {
    ImportBridge.saveRawData(shopDataKey, data);
  });
}
