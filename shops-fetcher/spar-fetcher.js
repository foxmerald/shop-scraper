"use strict";

const SHOP_DATA_KEY = 4;

const Request = require("request");
const Deferred = require("deferred");
const Promise = require("bluebird");
const Moment = require("moment");
const Cheerio = require('cheerio')

const TagTranslator = require("../bridges/tag-bridge")();
const ProductBridge = require("../bridges/product-bridge");
const Logger = require("../bridges/log-bridge");
const TestDataBridge = require("../bridges/test-data-bridge");

function fetchData() {
  var future = Deferred();
  var testDataPromise = TestDataBridge.loadFile(SHOP_DATA_KEY);

  testDataPromise.then((data) => {
    let testData = preprocessTestData(data);

    future.resolve(testData);
  }).catch(error => {
    if (error.code === "ENOENT") {
      Logger.log("No Spar Test-Data-File found. Fetching new data.");

      let newDataPromise = fetchNewData();
      newDataPromise.then(future.resolve)
        .catch(future.reject);
    } else {
      Logger.error(`Error: ${error}`);
      future.reject(error);
    }
  });

  return future.promise;
}

function fetchNewData() {
  let categoriesPromise = fetchCategories();
}

function fetchCategories() {
  const CATEGORY_LEVELS = 3;

  let future = Deferred();
  let frontPageHtmlPromise = fetchSparFrontPage();

  frontPageHtmlPromise.then(body => {
    let categories = {};
    let $ = Cheerio.load(body);

    for (let levelNr = 1; levelNr <= CATEGORY_LEVELS; levelNr++) {
      let categoryWrappers = $(`.level${levelNr}`);
      preprocessCategories($, categories, categoryWrappers);
    }

    debugger;

    future.resolve(categories);
  }).catch(future.reject);

  return future.promise;
}

function preprocessCategories($, categories = {}, categoryWrappers) {
  for (let i = 0; i < categoryWrappers.length; i++) {
    let categoryWrapper = $(categoryWrappers[i]);
    let parentId = categoryWrapper.attr("data-category-parent-id");
    let categoryElements = categoryWrapper.find("> li");

    for (let j = 0; j < categoryElements.length; j++) {
      let categoryElement = $(categoryElements[j]);
      let categoryId = categoryElement.attr("data-category-id");
      let categoryName = categoryElement.attr("data-category-name");
      let categoryUrl = categoryElement.attr("data-category-link");

      if (!categoryId || !categoryName) {
        continue;
      }

      categories[categoryId] = {
        identifier: categoryId,
        title: categoryName,
        slug: getSlugFromUrl(categoryUrl),
        childIdentifiers: [],
        parentIdentifier: parentId,
      }

      if (categories[parentId]) {
        categories[parentId].childIdentifiers.push(categoryId);
      }
    }
  }
}

function getSlugFromUrl(url) {
  let elements = url.split("/");
  return elements[elements.length - 3];
}

function fetchSparFrontPage() {
  let future = Deferred();
  let options = {
    url: "https://www.interspar.at/shop/lebensmittel/",
  };

  let promise = Request(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      future.resolve(body);
    } else {
      Logger.error("Couldn't load Spar Front Page");
      future.reject(error);
    }
  });

  return future.promise;
}

module.exports = {
  fetchData: fetchData,
};

// fetch topcategories
// F1 bis F12
// https://sp1004e38b.guided.lon5.atomz.com/?callback=parseResponse&sp_cs=UTF-8&category=F2&callback=parseResponse&_=1476975014238
// https://sp1004e38b.guided.lon5.atomz.com/?callback=parseResponse&sp_cs=UTF-8&category=${currentCategory}&page=${currentPage}&callback=parseResponse&_=${currentTimestamp}

// go trough all pages

// save productIds to Array

// crawl product detail pages:

// Product Detail Page
// `https://www.interspar.at/shop/lebensmittel/p/${productId}`
// e.g. https://www.interspar.at/shop/lebensmittel/p/5023660
