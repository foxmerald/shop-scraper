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
    future.resolve(preprocessData(data.categories, data.products));
  }).catch(error => {
    if (error.code === "ENOENT") {
      Logger.log("No Spar Test-Data-File found. Fetching new data.");

      fetchNewData()
        .then(future.resolve)
        .catch(future.reject);
    } else {
      rejectAndLogError(future);
    }
  });

  return future.promise;
}

function preprocessData(rawCategoriesData, rawProductsData) {
  let categories = getCategoriesData(rawCategoriesData);

  let rawProducts = preprocessRawProducts(rawProductsData);
  let products = preprocessProducts(rawProducts);

  return {
    categories: categories,
    products: products
  }
}

function fetchNewData() {
  let future = Deferred();
  let rawCategoriesDataPromise = fetchSparFrontPage();

  rawCategoriesDataPromise.then(rawCategoriesData => {
    let categories = getCategoriesData(rawCategoriesData);
    let urls = getUrls(categories);
    let rawProductsDataPromise = fetchRawProductsData(urls);

    rawProductsDataPromise.then(rawProductsData => {
      TestDataBridge.saveTestData(SHOP_DATA_KEY, rawCategoriesData, rawProductsData);
      future.resolve(preprocessData(rawCategoriesData, rawProductsData))
    }).catch(rejectAndLogError(future));
  }).catch(rejectAndLogError(future));
}

function preprocessRawProducts(result) {
  let products = {};

  for (let i = 0; i < result.length; i++) {
    let resultStack = result[i];
    let productsList = resultStack.products;

    for (let j = 0; j < productsList.length; j++) {
      let product = productsList[j];
      let id = product.code;

      if (!products[id]) {
        product.categoryStrings = [resultStack.category];
        products[id] = product;
      }

      products[id].categoryStrings.push(product["product-categories"]);
    }
  }

  return products;
}

function preprocessProducts(rawProducts) {
  let products = [];

  for (let id in rawProducts) {
    let product = preprocessProduct(rawProducts[id]);
    products.push(product);
  }

  return products;
}

function preprocessProduct(data) {
  let product = new ProductBridge.Product();

  product.identifier = data.code;
  product.categoryIdentifiers = getProductCategories(data);

  product.tags = getProductTags(data);
  product.details.imageUrl = data["product-image"];

  product.brand = data["title"];
  product.title = data["product-short-description-2"];
  product.amount = data["product-short-description-3"];
  product.details.description = data["product-long-description"];

  product.sales = getProductSales(data);

  //TODO calculate price & price per unit
  /*
  product.normalPrice.price = "";
  product.normalPrice.pricePerUnit = "";
  product.normalPrice.amount = "";
  product.normalPrice.unit = "";
  product.normalPrice.packaging = "";

  product.checkFormat(product);
  */

  return product;
}

function getProductSales(data) {
  //TODO
  /*
  product-promo-bestprice
  product-promo-bestname
  product-sales-per-unit
  product-is-on-promotion
  product-promo-names
  */
}

function getProductCategories(data) {
  let categories = [];
  let categoryStrings = data.categoryStrings;

  for (let i = 0; i < categoryStrings.length; i++) {
    let categoriesList = categoryStrings[i].split(/:|\|/);

    for (let j = 0; j < categoriesList.length; j++) {
      let categoryId = categoriesList[j].split("_")[0];
      let isValidCategoryFormat = validateCategoryFormat(categoryId);

      if (!categoryId || !isValidCategoryFormat || categories.includes(categoryId)) {
        continue;
      }

      categories.push(categoryId);
    }
  }

  return categories;
}

function validateCategoryFormat(categoryId) {
  let validCategoryFormat = /^F(([0-9]+(-[0-9])*))+$/;
  return validCategoryFormat.test(categoryId);
}

function getProductTags(data) {
  //tags:
  //data["product-is-new"]
  //data["product-is-on-promotion"]
}

function fetchRawProductsData(urls, results = [], pageNr = 1) {
  if (!urls.length || results.length >= 5) {
    return results;
  }

  let future = Deferred();
  let categoryUrl = urls[0];
  let nowTimestamp = Moment().unix() * 1000;
  let url = `${categoryUrl}&_=${nowTimestamp}&page=${pageNr}`;

  let options = {
    url: url,
  };

  Request(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      let rawData = preprocessBody(body);
      results.push(rawData);

      logProgress(url, rawData);

      if (rawData.pageCurrent < rawData.pageTotal) {
        future.resolve(fetchRawProductsData(urls, results, pageNr + 1));
        return;
      }
    } else {
      Logger.error(`Error - ${url}: ${error}`);
    }

    urls.shift();
    future.resolve(fetchRawProductsData(urls, results));
  });

  return future.promise;
}

function logProgress(url, rawData) {
  Logger.log(`Success: ${url} (Page ${rawData.pageCurrent}/${rawData.pageTotal}, ${rawData.products.length} products)`);
}

function preprocessBody(body) {
  const STRINGS = {
    results: "\"results\" :",
    searchSuggestions: ",\"searchSuggestions\"",
    category: "\"queryCategory\" :",
    links: ",\n\"links\"",
    resultCount: "\"resultcount\" :",
    priceRange: ",\n\"price_range\"",
    currentPage: "\"current-page\" :",
    next: ",\n\"next\"",
    pageTotal: "\"page-total\":",
    pages: ",\n\"pages\"",
  };

  let productsString = getStringBetween(body, STRINGS.results, STRINGS.searchSuggestions);
  let categoryString = getStringBetween(body, STRINGS.category, STRINGS.links);
  let resultCount = getStringBetween(body, STRINGS.resultCount, STRINGS.priceRange);
  let pageCurrentString = getStringBetween(body, STRINGS.currentPage, STRINGS.next);
  let pageTotalString = getStringBetween(body, STRINGS.pageTotal, STRINGS.pages);

  let category = removeQuotes(categoryString);
  let pageCurrent = removeQuotes(pageCurrentString);
  let pageTotal = removeQuotes(pageTotalString);

  let rawProductsData = {
    products: JSON.parse(productsString),
    category: category,
    resultCount: JSON.parse(resultCount),
    pageCurrent: parseInt(pageCurrent),
    pageTotal: parseInt(pageTotal),
  }

  return rawProductsData;
}

function getStringBetween(string, start, end) {
  if (!start || !end) {
    return null;
  }

  return string.substring(string.indexOf(start) + start.length, string.indexOf(end));
}

function removeQuotes(string) {
  let firstQuote = string.indexOf("\"") + 1;
  let lastQuote = string.lastIndexOf("\"");

  return string.substring(firstQuote, lastQuote);
}

function getUrls(categories) {
  let urls = [];

  for (let cat in categories) {

    if (cat.includes("-")) {
      continue;
    }

    let categoryId = categories[cat].identifier;
    let url = `https://sp1004e38b.guided.lon5.atomz.com/?callback=parseResponse&sp_cs=UTF-8&category=${categoryId}`;

    urls.push(url);
  }

  return urls;
}

function getCategoriesData(body) {
  const CATEGORY_LEVELS = 3;

  let categories = {};
  let $ = Cheerio.load(body);

  for (let levelNr = 1; levelNr <= CATEGORY_LEVELS; levelNr++) {
    let categoryWrappers = $(`.level${levelNr}`);
    preprocessCategories($, categories, categoryWrappers);
  }

  return categories;
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
  Logger.log("Spar: Start fetching Front Page Html");

  let future = Deferred();
  let options = {
    url: "https://www.interspar.at/shop/lebensmittel/",
  };

  let promise = Request(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      future.resolve(body);
    } else {
      rejectAndLogError(future);
    }
  });

  return future.promise;
}

function rejectAndLogError(future) {
  return function(error) {
    Logger.error(`Error: ${error}`);
    Logger.error(`Error: ${error.stack}`); // TODO remove
    future.reject(error);
  };
}

module.exports = {
  fetchData: fetchData,
};
