"use strict";

const SHOP_DATA_KEY = 2;

const Request = require("request");
const Deferred = require("deferred");
const Promise = require("bluebird");

const TagTranslator = require("../bridges/tag-bridge")();
const ProductBridge = require("../bridges/product-bridge");
const Logger = require("../bridges/log-bridge");
const TestDataBridge = require("../bridges/test-data-bridge");

function fetchData() {
  var future = Deferred();
  let testDataPromise = TestDataBridge.loadFile(SHOP_DATA_KEY);

  testDataPromise.then(testData => {
    let preprocessedData = preprocessData(testData.categories, testData.products);

    future.resolve(preprocessedData);
  }).catch(error => {
    if (error.code === "ENOENT") {
      Logger.log("No Billa Test-Data-File found. Fetching new data.");

      let newDataPromise = fetchNewData();

      newDataPromise.then(future.resolve)
        .catch(future.reject);
    } else {
      future.reject(error);
    }
  });

  return future.promise;
}

function fetchNewData() {
  Logger.log("fetch billa data");

  let future = Deferred();

  let categoriesUrl = "https://shop.billa.at/api/navigation";
  let productsUrl = "https://shop.billa.at/api/search/full?category=B2&pageSize=9175&isFirstPage=true&isLastPage=true";

  let categoriesPromise = fetchDataFromUrl(categoriesUrl);
  let productPromise = fetchDataFromUrl(productsUrl);

  Promise.all([categoriesPromise, productPromise]).then(([categories, products]) => {
    let preprocessedData = preprocessData(categories, products);

    TestDataBridge.saveTestData(SHOP_DATA_KEY, categories, products);

    future.resolve(preprocessedData);
  }).catch(future.reject);

  return future.promise;
}

function preprocessData(categoriesData, productsData) {
  Logger.log("preprocess billa data");

  let categories = preprocessCategories(categoriesData);
  let products = preprocessProducts(productsData, categories);

  let categoriesList = [];
  for (var category in categories) {
    categoriesList.push(categories[category]);
  }

  let data = {
    categories: categoriesList,
    products: products
  };

  return data;
}

function preprocessProducts(productsData, categories) {
  let products = [];
  let tiles = productsData.tiles;

  for (let i = 0; i < tiles.length; i++) {
    let tile = tiles[i];

    let isValidRawProduct = ProductBridge.validateRawProduct(tile.data.price.final);
    if (!isValidRawProduct) {
      continue;
    }

    let product = preprocessProduct(tile, categories);
    products.push(product);
  }

  return products;
}

function preprocessProduct(tile, categories) {
  let data = tile.data;
  let price = Math.floor(data.price.normal * 100);
  let articleGroupIds = data.articleGroupIds;
  let pricePerUnit = getPricePerUnit(data, price);

  let product = new ProductBridge.Product();

  product.identifier = data.articleId;
  product.title = data.name;
  product.slug = data.slug;
  product.categoryIdentifiers = articleGroupIds;
  product.brand = data.brand;
  product.amount = data.grammage;

  product.normalPrice.price = price;
  product.normalPrice.pricePerUnit = pricePerUnit.price;
  product.normalPrice.amount = pricePerUnit.amount;
  product.normalPrice.unit = pricePerUnit.unit;
  product.normalPrice.packaging = pricePerUnit.packaging;

  product.sales = getProductSales(data, price, product);

  product.tags = getProductTags(data);
  product.details.recommendedProductIds = data.recommendationArticleIds;
  product.details.imageUrl = getImageUrl(data);
  product.details.description = data.description;

  checkCategories(articleGroupIds, categories);

  product.checkFormat(product);

  return product;
}

function checkCategories(articleGroupIds, categories) {
  for (let i = 0; i < articleGroupIds.length; i++) {
    let id = articleGroupIds[i];
    let cat = categories[id];

    if (!cat) {
      Logger.error(`Product-Category not found: ${id}`);
    }
  }
}

function getProductSales(data, normalPrice, product) {
  let salePrice = Math.floor(data.price.sale * 100);
  let sales = [];

  if (salePrice === normalPrice) {
    return sales;
  }

  let bulkDiscountPriceTypes = data.price.bulkDiscountPriceTypes;
  let defaultPriceTypes = data.price.defaultPriceTypes;

  let pricePerUnit = getPricePerUnit(data, salePrice);
  let discount = getProductDiscount(data);

  let sale = new ProductBridge.Sale();

  sale.price.price = salePrice;

  sale.price.pricePerUnit = pricePerUnit.price;
  sale.price.amount = pricePerUnit.amount;
  sale.price.unit = pricePerUnit.unit;
  sale.price.packaging = pricePerUnit.packaging;

  if (Object.keys(discount).length) {
    sale.type = discount.type;
    sale.condition = discount.condition;
    sale.information = discount.information;
  } else {
    sale.type = "sale";
  }

  sales.push(sale);

  return sales;
}

function getProductDiscount(data) {
  let discount = {};
  let defaultPriceTypes = data.price.defaultPriceTypes;
  let bulkDiscountPriceTypes = data.price.bulkDiscountPriceTypes;

  if (!defaultPriceTypes.length && !bulkDiscountPriceTypes.length) {
    return discount;
  } else if (defaultPriceTypes.length > 1 && !bulkDiscountPriceTypes.length) {
    discount.type = defaultPriceTypes[1];
    discount.condition = defaultPriceTypes[0];
  } else {
    discount.type = defaultPriceTypes[0];
    discount.condition = bulkDiscountPriceTypes[0];
  }

  discount.information = data.price.priceAdditionalInfo.vptxt;

  return discount;
}

function getPricePerUnit(data, price) {
  let grammageSplit = data.grammage.split(" ");
  let amount = parseFloat(grammageSplit[0]);
  let unit = grammageSplit[1];
  let packageType = grammageSplit[2];
  let referenceAmount = 1;

  switch (unit) {
    case "Milliliter":
      amount = amount / 1000;
      unit = "Liter";
      break;
    case "Gramm":
      amount = amount / 1000;
      unit = "Kilogramm";
      break;
    case "Zentimeter":
      amount = amount / 100;
      unit = "Meter";
      break;
    default:
      break;
  }

  let unitMultiplicator = referenceAmount / amount;
  let pricePerUnit = price * unitMultiplicator;

  // if pricePerUnit is below 1 cent, multiply price & amount by 10
  while (pricePerUnit < 1) {
    pricePerUnit = pricePerUnit * 10;
    referenceAmount = referenceAmount * 10;
  }

  let pricePerUnitInfo = {
    amount: referenceAmount,
    unit: unit,
    packaging: packageType,
    price: Math.round(pricePerUnit),
  };

  return pricePerUnitInfo;
}

function getImageUrl(data) {
  let productId = data.articleId;
  return `https://files.billa.at/files/artikel/${productId}_01__600x600.jpg`;
}

function getProductTags(data) {
  let tagsData = {};
  let attributes = data.attributes;
  let priceTypes = data.vtcPrice.defaultPriceTypes;
  let normalPrice = data.price.normal;
  let salePrice = data.price.sale;

  // add tags like "cooled" or "organic"
  if (attributes) {
    for (let i = 0; i < attributes.length; i++) {
      let attribute = attributes[i];
      let tag = TagTranslator[attribute];

      if (!tag) {
        continue;
      }

      tagsData[tag.key] = tag.label;
    }
  }

  // add tags like "dauertiefpreis" or "satterrabatt"
  if (priceTypes) {
    for (let i = 0; i < priceTypes.length; i++) {
      let priceType = priceTypes[i];
      let tag = TagTranslator[priceType];

      if (!tag) {
        continue;
      }

      tagsData[tag.key] = tag.label;
    }
  }

  // check if vorteilscard-owners only
  if (data.vtcOnly) {
    tagsData.vtcOnly = "Vorteilscard only";
  }

  // check if on sale
  if (normalPrice !== salePrice) {
    let saleTag = TagTranslator.sale;
    tagsData[saleTag.key] = saleTag.label;
  }

  return tagsData;
}

function preprocessCategories(categoryData) {
  var categories = {};

  for (let i = 0; i < categoryData.length; i++) {
    let category = categoryData[i];
    traverseCategories(categories, category);
  }

  return categories;
}

function traverseCategories(categories = {}, category, topcategoryId = null) {
  let categoryId = category.articleGroupId;
  let subcategoryData = category.children;

  categories[categoryId] = {
    identifier: categoryId,
    title: category.title,
    slug: getSlugFromUrl(category.url),
    childIdentifiers: [],
    parentIdentifier: topcategoryId,
  }

  if (subcategoryData && subcategoryData.length) {
    for (let i = 0; i < subcategoryData.length; i++) {
      let subcategory = subcategoryData[i];
      categories[categoryId].childIdentifiers.push(subcategory.articleGroupId);

      traverseCategories(categories, subcategory, categoryId);
    }
  } else {
    return categories;
  }
}

function getSlugFromUrl(string) {
  let segments = string.split("/");
  let secondLast = segments.length - 2;

  return segments[secondLast];
}

function fetchDataFromUrl(url) {
  var future = Deferred();

  let options = {
    url: url,
    json: true,
    "rejectUnauthorized": false,
    "headers": {
      "Content-Type": "application/json",
    },
  };

  let promise = Request(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      Logger.log("raw billa data fetched from " + url);
      future.resolve(body);
    } else {
      Logger.error("billa raw data error from " + url + ": " + error);
      future.reject(error);
    }
  });

  return future.promise;
}

module.exports = {
  fetchData: fetchData,
};
