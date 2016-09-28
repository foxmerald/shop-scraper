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
    return preprocessData(categories, products);
  }).catch((e) => {
    Logger.error(e);
  });
}

function preprocessData(categoriesData, productsData) {
  let categories = preprocessCategories(categoriesData);
  let products = preprocessProducts(productsData);

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

function preprocessProducts(productsData) {
  let products = [];
  let tiles = productsData.tiles;

  for (let i = 0; i < tiles.length; i++) {
    let tile = tiles[i];
    let product = preprocessProduct(tile);

    products.push(product);
  }

  debugger;

  return products;
}

function preprocessProduct(tile) {
  let data = tile.data;
  let price = Math.floor(data.price.normal * 100);
  let salePrice = Math.floor(data.price.sale * 100);

  let product = {
    identifier: data.articleId,
    title: data.name,
    slug: data.slug,
    categoryIdentifiers: data.articleGroupIds,
    brand: data.brand,
    imageUrl: getImageUrl(data),
    amount: data.grammage,
    price: price,
    salePrice: salePrice,
    pricePerUnit: getPricePerUnit(data, price),
    salePricePerUnit: getPricePerUnit(data, salePrice),
    discount: getProductDiscount(data),
    available: true,
    tags: getProductTags(data),
    details: {
      recommendedProductIds: data.recommendationArticleIds,
    },
    description: [data.description],
  };

  let finalProduct = new Product(product);

  debugger;

  return finalProduct;
}

function getPricePerUnit(data, price) {
  const referenceAmount = 1;

  let grammageSplit = data.grammage.split(" ");
  let amount = parseFloat(grammageSplit[0]);
  let unit = grammageSplit[1];
  let packageType = grammageSplit[2];

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

  let pricePerUnit = {
    amount: referenceAmount,
    unit: unit,
    packageType: packageType,
    price: Math.round(price * unitMultiplicator),
  };

  return pricePerUnit;
}

function getProductDiscount(data) {
  let defaultPriceTypes = data.price.defaultPriceTypes;
  let bulkDiscountPriceTypes = data.price.bulkDiscountPriceTypes;

  if (!defaultPriceTypes.length && !bulkDiscountPriceTypes.length) {
    return null;
  }

  if (!defaultPriceTypes.length) {
    defaultPriceTypes.push("AKTION");
  }

  let discount = {
    types: defaultPriceTypes,
    conditions: bulkDiscountPriceTypes,
    additionalInfo: data.price.priceAdditionalInfo.vptxt,
  };

  return discount;
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
    generalTags.push("online-shop only");
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
    let categoryId = category.articleGroupId;
    let subcategoryData = category.children;

    categories[categoryId] = {
      identifier: categoryId,
      title: category.title,
      slug: getSegmentFromUrl(category.url, 1),
      subcategoryIdentifiers: [],
    }

    for (let j = 0; j < subcategoryData.length; j++) {
      let subcategory = subcategoryData[j];
      let subcategoryId = subcategory.articleGroupId;
      let subsubcategoryData = subcategory.children;

      categories[subcategoryId] = {
        identifier: subcategoryId,
        title: subcategory.title,
        slug: getSegmentFromUrl(subcategory.url, 2),
        subcategoryIdentifiers: [],
      }

      categories[categoryId].subcategoryIdentifiers.push(subcategoryId);

      for (let k = 0; k < subsubcategoryData.length; k++) {
        let subsubcategory = subsubcategoryData[k];
        let subsubcategoryId = subsubcategory.articleGroupId;

        categories[subsubcategoryId] = {
          identifier: subsubcategoryId,
          title: subsubcategory.title,
          slug: getSegmentFromUrl(subsubcategory.url, 3),
          subcategoryIdentifiers: [],
        }

        categories[subcategoryId].subcategoryIdentifiers.push(subsubcategoryId);
      }
    }
  }

  return categories;
}

function getSegmentFromUrl(string, segment) {
  return string.split("/")[segment];
}

function fetchDataFromUrl(url) {
  var future = deferred();

  let options = {
    url: url,
    json: true
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
