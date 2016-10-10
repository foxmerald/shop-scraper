"use strict";

const request = require("request");
const util = require("util");
const rp = require('request-promise');
const deferred = require("deferred");

var Promise = require("bluebird");
var Product = require("./product-class");
var Logger = require("./log-bridge");

function fetchData() {
  Logger.log("fetch billa data");

  var categoriesUrl = "https://shop.billa.at/api/navigation";
  var productsUrl = "https://shop.billa.at/api/search/full?category=B2&pageSize=9175&isFirstPage=true&isLastPage=true";

  var categoriesPromise = fetchDataFromUrl(categoriesUrl);
  var productPromise = fetchDataFromUrl(productsUrl);

  return Promise.all([categoriesPromise, productPromise]).then(([categories, products]) => {
    Logger.log("preprocess billa data");
    let preprocessedData = preprocessData(categories, products);

    return preprocessedData;
  }).catch((e) => {
    Logger.error(e);
  });
}

function preprocessData(categoriesData, productsData) {
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

  let product = new Product();

  product.identifier = data.articleId;
  product.title = data.name;
  product.slug = data.slug;
  product.categoryIdentifiers = articleGroupIds;
  product.brand = data.brand;
  product.imageUrl = getImageUrl(data);
  product.amount = data.grammage;

  product.normalPrice.price = price;
  product.normalPrice.pricePerUnit = pricePerUnit.price;
  product.normalPrice.amount = pricePerUnit.amount;
  product.normalPrice.unit = pricePerUnit.unit;
  product.normalPrice.packaging = pricePerUnit.packaging;

  product.sales = getProductSales(data, price, product);

  product.tags = getProductTags(data);
  product.details.recommendedProductIds = data.recommendationArticleIds;
  product.description = data.description;

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

  let sale = product.getSalesTemplate();

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
  const translator = {
    "s_bio": "organic",
    "s_marke": "brand",
    "s_gekuehlt": "cooled",
    "s_tiefgek": "frozen",
    "s_guetesie": "seal of quality",
    "s_spezern": "special diet",
    "s_herkunft": "country of origin",
    "s_hkland": "country of origin",
    "s_regio": "regional",
    "s_new": "new",
    "mengemin": "varying weight",
  };

  var attributes = data.attributes;
  var priceTypes = data.vtcPrice.defaultPriceTypes;
  var normalPrice = data.price.normal;
  var salePrice = data.price.sale;
  var generalTags = [];
  var shopTags = [];

  // add tags like "cooled" or "organic"
  if (attributes) {
    for (let i = 0; i < attributes.length; i++) {
      let attribute = attributes[i];
      let tag = translator[attribute];

      if (tag) {
        generalTags.push(tag);
      } else {
        shopTags.push(attribute);
      }
    }
  }

  // add tags like "dauertiefpreis" or "satterrabatt"
  if (priceTypes) {
    for (let i = 0; i < priceTypes.length; i++) {
      let priceType = priceTypes[i];
      let tag = translator[priceType];

      if (tag) {
        generalTags.push(tag);
      } else {
        shopTags.push(priceType);
      }
    }
  }

  // check if online-shop only
  if (data.vtcOnly) {
    shopTags.push("vorteilscard only");
  }

  // check if on sale
  if (normalPrice !== salePrice) {
    generalTags.push("sale");
  }

  let tagsData = {
    generalTags: generalTags,
    shopTags: shopTags,
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

function traverseCategories(categories = {}, category) {
  let categoryId = category.articleGroupId;
  let subcategoryData = category.children;

  categories[categoryId] = {
    identifier: categoryId,
    title: category.title,
    slug: getSlugFromUrl(category.url),
    subcategoryIdentifiers: [],
  }

  if (subcategoryData && subcategoryData.length) {
    for (let i = 0; i < subcategoryData.length; i++) {
      let subcategory = subcategoryData[i];
      categories[categoryId].subcategoryIdentifiers.push(subcategory.articleGroupId);

      traverseCategories(categories, subcategory);
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
  var future = deferred();

  let options = {
    url: url,
    json: true,
    "rejectUnauthorized": false,
    "headers": {
      "Content-Type": "application/json",
    },
  };

  let promise = request(options, (error, response, body) => {
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
