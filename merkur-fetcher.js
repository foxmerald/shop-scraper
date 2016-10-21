"use strict";

const request = require("request");
const util = require("util");
const rp = require('request-promise');
const deferred = require("deferred");
const moment = require("moment");

const tagsTranslator = require("./tags-translator")();

var Promise = require("bluebird");
var ProductBridge = require("./product-bridge");
var Logger = require("./log-bridge");
var TestDataBridge = require("./test-data-bridge");

function fetchData() {
  var future = deferred();
  var testDataPromise = TestDataBridge.loadFile("merkur");

  testDataPromise.then((data) => {
    let testData = preprocessTestData(data);

    future.resolve(testData);
  }).catch(error => {
    if (error.code === "ENOENT") {
      Logger.log("No Test-Data-File found. Fetching new data.");

      let newDataPromise = fetchNewData();
      newDataPromise.then(data => {
        future.resolve(data);
      }).catch(e => {
        Logger.error(`Error: ${e}`);
        future.reject(e);
      })
    } else {
      Logger.error(`Error: ${error}`);
      future.reject(error);
    }
  });

  return future.promise;
}

function preprocessTestData(testData) {
  let categories = preprocessCategories(testData.categories);
  let products = preprocessProducts(testData.products);

  let categoriesList = [];
  for (var category in categories) {
    categoriesList.push(categories[category]);
  }

  let data = {
    categories: categoriesList,
    products: products,
  };

  return data;
}

function fetchNewData() {
  var future = deferred();
  var categoriesPromise = fetchCategories();

  categoriesPromise.then((categoriesData) => {
    let categories = preprocessCategories(categoriesData);
    let urls = [];

    for (let category in categories) {
      urls.push(categories[category].url);
    }

    // append further categories like e.g. store brand or vegan
    urls = appendAdditionalCategories(urls);

    let productsPromise = fetchProducts(urls);
    productsPromise.then(result => {
      saveTestData(categoriesData, result);

      let products = preprocessProducts(result);
      let categoriesList = [];

      for (var category in categories) {
        categoriesList.push(categories[category]);
      }

      let data = {
        categories: categoriesList,
        products: products,
      };

      future.resolve(data);
    }).catch(error => {
      Logger.error(`Error: ${error}`);
      future.reject(error);
    });
  }).catch(error => {
    Logger.error(`Error: ${error}`);
    future.reject(error);
  });

  return future.promise;
}

function saveTestData(categories, products) {
  let rawData = {
    categories: categories,
    products: products,
  };

  TestDataBridge.saveFile("merkur", rawData);
}

function appendAdditionalCategories(urls) {
  const additionalCategories = ["immer-gut-tiere", "merkurimmergut", "laktosefrei-category", "milchalternativen", "clever-category", "clever-milchprodukte", "alnatura-baby", "alnatura-category", "vegane-produkte", "vega-vita"];

  for (let i = 0; i < additionalCategories.length; i++) {
    let additionalCategory = additionalCategories[i];
    let additionalUrl = `https://www.merkurmarkt.at/api/shop/articles/category/${additionalCategory}`;

    if (!urls.includes(additionalUrl)) {
      urls.push(additionalUrl);
    }
  }

  return urls;
}

function preprocessProducts(result) {
  let productsDataRaw = preprocessProductsDataRaw(result);
  let productsData = filterOutDuplicates(productsDataRaw);
  let products = preprocessProductsData(productsData);

  return products;
}

function preprocessProductsData(productsData) {
  let products = [];

  for (let element in productsData) {
    let tile = productsData[element];
    let product = preprocessProduct(tile);
    products.push(product);
  }

  return products;
}

function preprocessProduct(tile) {
  let price = getProductPrice(tile);
  let pricePerUnit = getPricePerUnit(tile, price);

  let product = new ProductBridge.Product();

  product.identifier = tile.sku;
  product.title = tile.name;
  product.slug = tile.slug;
  product.categoryIdentifiers = tile.categoryIds;
  product.brand = tile.brand;
  product.amount = tile.pieceDescription;

  product.normalPrice.price = price;
  product.normalPrice.pricePerUnit = pricePerUnit.price;
  product.normalPrice.amount = pricePerUnit.amount;
  product.normalPrice.unit = pricePerUnit.unit;
  product.normalPrice.packaging = pricePerUnit.packaging;

  product.sales = getProductSales(product, tile);

  product.tags = getProductTags(tile);

  product.details.description = tile.descriptionShort;
  product.details.descriptionDetail = tile.descriptionLong;
  product.details.imageUrl = tile.image;
  product.details.weightPerPiece = tile.weightPerPiece;
  product.details.vatCode = tile.vatCode;
  product.details.origin = tile.origin;

  product.checkFormat(product);

  return product;
}

function getProductTags(tile) {
  let tagsData = {};
  let sealsOfQuality = tile.sealOfQuality;
  let personalPreferences = tile.personalPreferences;

  if (sealsOfQuality) {
    for (let i = 0; i < sealsOfQuality.length; i++) {
      let sealOfQuality = sealsOfQuality[i];
      let tag = tagsTranslator[sealOfQuality.key];

      if (!tag) {
        continue;
      }

      tagsData[tag.key] = tag.label;
    }
  }

  if (personalPreferences) {
    for (let i = 0; i < personalPreferences.length; i++) {
      let personalPreference = personalPreferences[i];
      let tag = tagsTranslator[personalPreference.key];

      if (!tag) {
        continue;
      }

      tagsData[tag.key] = tag.label;
    }
  }

  if (tile.foodCounterId) {
    let tag = tagsTranslator[tile.foodCounterId];
    tagsData[tag.key] = tag.label;
  }

  if (tile.vacuumPackagingAvailable) {
    let tag = tagsTranslator.vacuumPackagingAvailable;
    tagsData[tag.key] = tag.label;
  }

  if (tile.weightArticle || tile.weightPieceArticle) {
    let tag = tagsTranslator.weightArticle;
    tagsData[tag.key] = tag.label;
  }

  return tagsData;
}

function getProductPrice(tile) {
  let crossed = tile.price.crossed;

  if (crossed) {
    return crossed;
  } else {
    return tile.price.amount;
  }
}

function getProductSales(product, tile) {
  let price = tile.price;
  let sales = [];

  if (!price.discount) {
    return sales;
  }

  let discount = price.discount;
  let salePrice = price.amount;
  let pricePerUnit = getPricePerUnit(tile, salePrice);

  let sale = product.salesTemplate();

  sale.price.price = salePrice;

  sale.price.pricePerUnit = pricePerUnit.price;
  sale.price.amount = pricePerUnit.amount;
  sale.price.unit = pricePerUnit.unit;
  sale.price.packaging = pricePerUnit.packaging;

  sale.type = discount.text;
  sale.condition = discount.condition;

  sales.push(sale);

  return sales;
}

function getPricePerUnit(tile, price) {
  let pricePerUnitInfo = {};

  if (!tile.pieceDescription) {
    return pricePerUnitInfo;
  }

  let referenceAmount = 1;
  let pieceDescriptionSplit = tile.pieceDescription.split(" ");
  let amount;
  let unit;
  let packaging;

  if (pieceDescriptionSplit.length <= 3) {
    amount = parseFloat(pieceDescriptionSplit[0]);
    unit = pieceDescriptionSplit[1];
    packaging = pieceDescriptionSplit[2];
  } else {
    amount = parseFloat(pieceDescriptionSplit[3]);
    unit = pieceDescriptionSplit[4];
  }

  switch (unit) {
    case "Milliliter":
      amount = amount / 1000;
      unit = "Liter";
      break;
    case "Gramm":
      amount = amount / 1000;
      unit = "Kilogramm";
      break;
    case "Kubiczentimeter":
      amount = amount / 1000;
      unit = "Liter";
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

  if (unit === packaging) {
    packaging = null;
  }

  pricePerUnitInfo.amount = referenceAmount;
  pricePerUnitInfo.unit = unit;
  pricePerUnitInfo.packaging = packaging;
  pricePerUnitInfo.price = Math.round(pricePerUnit);

  return pricePerUnitInfo;
}

function filterOutDuplicates(productsDataRaw) {
  let productsData = {};

  for (let i = 0; i < productsDataRaw.length; i++) {
    let product = productsDataRaw[i];
    let productId = product.sku;

    if (!productsData[productId]) {
      product.categoryIds = [];
      product.categoryIds.push(product.categoryId);
      productsData[productId] = product;

      continue;
    }

    let categoryIds = productsData[productId].categoryIds;
    let categoryId = product.categoryId;

    if (categoryId && !categoryIds.includes(categoryId)) {
      categoryIds.push(categoryId);
    }

    Object.assign(productsData[productId], product);
  }

  return productsData;
}

function preprocessProductsDataRaw(result) {
  let productsData = [];

  for (let i = 0; i < result.length; i++) {
    let categoryData = result[i];
    let categoryId = categoryData.category.externalId;
    let products = categoryData.products;

    for (let j = 0; j < products.length; j++) {
      let product = products[j];
      product.categoryId = categoryId;

      productsData.push(product);
    }
  }

  return productsData;
}

function preprocessCategories(data) {
  let dataGroups = data.children;
  let categoriesData;
  let categories = {};

  for (let i = 0; i < dataGroups.length; i++) {
    let dataGroup = dataGroups[i];

    if (dataGroup.slug === "/shop/") {
      categoriesData = dataGroup.children;
      break;
    }
  }

  for (let i = 0; i < categoriesData.length; i++) {
    let category = categoriesData[i];
    traverseCategories(categories, category);
  }

  return categories;
}

function traverseCategories(categories = {}, category, topcategoryId = null) {
  let categoryId = category.externalId;
  let subcategoryData = category.children;
  let slug = getSlugFromUrl(category.slug);

  if (!categoryId) {
    categoryId = slug;
  }

  categories[categoryId] = {
    identifier: categoryId,
    title: category.name,
    slug: slug,
    url: getCategoryUrl(category.slug, slug),
    childIdentifiers: [],
    parentIdentifier: topcategoryId,
  };

  if (subcategoryData && subcategoryData.length) {
    for (let i = 0; i < subcategoryData.length; i++) {
      let subcategory = subcategoryData[i];
      let subcategoryId = subcategory.externalId || getSlugFromUrl(subcategory.slug);
      categories[categoryId].childIdentifiers.push(subcategoryId);

      traverseCategories(categories, subcategory, categoryId);
    }
  } else {
    return categories;
  }
}

function getSlugFromUrl(string) {
  let segments = string.split("/");
  let slug = segments[segments.length - 1];

  if (!slug) {
    slug = segments[segments.length - 2];
  }

  return slug;
}

function getCategoryUrl(categorySlug, slug) {
  let categoryUrl;
  let translator = {
    "merkur-immer-gut": "merkurimmergut",
    "vegan": "vegane-produkte",
  };

  if (Object.keys(translator).includes(slug)) {
    categoryUrl = `https://www.merkurmarkt.at/api/shop/articles/category/${translator[slug]}`;
  } else if (categorySlug.includes("aktion-und-promotion")) {
    categoryUrl = `https://www.merkurmarkt.at/api/shop/articles/category/${slug}-category`;
  } else {
    categoryUrl = `https://www.merkurmarkt.at/api/shop/product-overview/${slug}`;
  }

  return categoryUrl;
}

function fetchProducts(categoryUrls, results = [], pageNr = 0) {
  if (!categoryUrls.length /*|| results.length > 20*/ ) { //TODO: remove results.length
    return results;
  }

  let categoryUrl = categoryUrls.shift();
  let nowTimestamp = moment().unix() * 1000;

  let url = `${categoryUrl}?pageSize=500&page=${pageNr}&timestamp=${nowTimestamp}`;
  let options = {
    url: url,
    json: true
  };

  // show status/progress log
  let insges = results.length + categoryUrls.length + 1;
  let current = results.length;
  Logger.log(`${Math.floor(current/insges*100)}% ${current}/${insges} - ${url}`);

  let promise = new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        Logger.log(`Success: ${categoryUrl} (Page ${pageNr}, ${body.count} products)`);
        results.push(body);

        let hasSeveralProductPages = body.total !== body.count + body.offset;
        let isArticlesPage = url.includes("/articles/");

        if (hasSeveralProductPages && !isArticlesPage) {
          categoryUrls.unshift(categoryUrl);
          resolve(fetchProducts(categoryUrls, results, pageNr + 1));
          return;
        }
      } else {
        Logger.error("Error - " + categoryUrl + ": " + error);
      }

      resolve(fetchProducts(categoryUrls, results));
    });
  });

  return promise;
}

function fetchCategories() {
  let future = deferred();
  let nowTimestamp = moment().unix() * 1000;

  let options = {
    url: `https://www.merkurmarkt.at/api/nav/${nowTimestamp}/anon`,
    json: true
  };

  let promise = request(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      future.resolve(body);
    } else {
      Logger.error("Error: " + error);
      future.reject(error);
    }
  });

  return future.promise;
}

module.exports = {
  fetchData: fetchData,
};
