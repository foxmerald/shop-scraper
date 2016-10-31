"use strict";

const SHOP_DATA_KEY = 3;

const Request = require("request");
const Deferred = require("deferred");
const Promise = require("bluebird");
const Moment = require("moment");

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
      Logger.log("No Merkur Test-Data-File found. Fetching new data.");

      let newDataPromise = fetchNewData();
      newDataPromise.then(data => {
        future.resolve(data);
      }).catch(error => {
        Logger.error(`Error: ${error}`);
        future.reject(error);
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
  let data = createImportData(categories, products);

  return data;
}

function fetchNewData() {
  var future = Deferred();
  var categoriesPromise = fetchCategories();

  categoriesPromise.then((categoriesData) => {
    let categories = preprocessCategories(categoriesData);
    let urls = [];

    for (let category in categories) {
      urls.push(categories[category].url);
    }

    // append further categories like e.g. "store brand" or "vegan"
    appendAdditionalCategories(urls);

    let productsPromise = fetchProducts(urls);
    productsPromise.then(result => {
      saveTestData(categoriesData, result);

      let products = preprocessProducts(result);
      let data = createImportData(categories, products);

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

function createImportData(categories, products) {
  let categoriesList = [];
  for (var category in categories) {
    categoriesList.push(categories[category]);
  }

  return {
    categories: categoriesList,
    products: products,
  };
}

function saveTestData(categories, products) {
  let rawData = {
    categories: categories,
    products: products,
  };

  TestDataBridge.saveFile(SHOP_DATA_KEY, rawData);
}

function appendAdditionalCategories(urls) {
  const ADDITIONAL_CATEGORIES = ["immer-gut-tiere", "merkurimmergut", "laktosefrei-category", "milchalternativen", "clever-category", "clever-milchprodukte", "alnatura-baby", "alnatura-category", "vegane-produkte", "vega-vita"];

  for (let i = 0; i < ADDITIONAL_CATEGORIES.length; i++) {
    let additionalCategory = ADDITIONAL_CATEGORIES[i];
    let additionalUrl = `https://www.merkurmarkt.at/api/shop/articles/category/${additionalCategory}`;

    if (!urls.includes(additionalUrl)) {
      urls.push(additionalUrl);
    }
  }
}

function preprocessProducts(result) {
  let rawProductsData = preprocessRawProductsData(result);
  let productsData = filterOutDuplicates(rawProductsData);
  let products = preprocessProductsData(productsData);

  return products;
}

function preprocessProductsData(productsData) {
  let products = [];

  for (let element in productsData) {
    let tile = productsData[element];

    let isValidRawProduct = ProductBridge.validateRawProduct(tile.price.amount);
    if (!isValidRawProduct) {
      continue;
    }

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
      let tag = TagTranslator[sealOfQuality.key];

      if (!tag) {
        continue;
      }

      tagsData[tag.key] = tag.label;
    }
  }

  if (personalPreferences) {
    for (let i = 0; i < personalPreferences.length; i++) {
      let personalPreference = personalPreferences[i];
      let tag = TagTranslator[personalPreference.key];

      if (!tag) {
        continue;
      }

      tagsData[tag.key] = tag.label;
    }
  }

  if (tile.foodCounterId) {
    let tag = TagTranslator[tile.foodCounterId];
    tagsData[tag.key] = tag.label;
  }

  if (tile.vacuumPackagingAvailable) {
    let tag = TagTranslator.vacuumPackagingAvailable;
    tagsData[tag.key] = tag.label;
  }

  if (tile.weightArticle || tile.weightPieceArticle) {
    let tag = TagTranslator.weightArticle;
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

  let sale = new ProductBridge.Sale();

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

function filterOutDuplicates(rawProductsData) {
  let productsData = {};

  for (let i = 0; i < rawProductsData.length; i++) {
    let product = rawProductsData[i];
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

function preprocessRawProductsData(result) {
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

  if (translator[slug]) {
    categoryUrl = `https://www.merkurmarkt.at/api/shop/articles/category/${translator[slug]}`;
  } else if (categorySlug.includes("aktion-und-promotion")) {
    categoryUrl = `https://www.merkurmarkt.at/api/shop/articles/category/${slug}-category`;
  } else {
    categoryUrl = `https://www.merkurmarkt.at/api/shop/product-overview/${slug}`;
  }

  return categoryUrl;
}

function fetchProducts(categoryUrls, results = [], pageNr = 0) {
  if (!categoryUrls.length) {
    return results;
  }

  let future = Deferred();
  let categoryUrl = categoryUrls.shift();
  let nowTimestamp = Moment().unix() * 1000;
  let url = `${categoryUrl}?pageSize=500&page=${pageNr}&timestamp=${nowTimestamp}`;
  let options = {
    url: url,
    json: true
  };

  logProgress(categoryUrls, results, url);

  Request(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      Logger.log(`Success: ${categoryUrl} (Page ${pageNr}, ${body.count} products)`);
      results.push(body);

      let hasSeveralProductPages = body.total !== body.count + body.offset;
      let isArticlesPage = url.includes("/articles/");

      if (hasSeveralProductPages && !isArticlesPage) {
        categoryUrls.unshift(categoryUrl);

        future.resolve(fetchProducts(categoryUrls, results, pageNr + 1));
        return;
      }
    } else {
      Logger.error(`Error - ${categoryUrl}: ${error}`);
    }

    future.resolve(fetchProducts(categoryUrls, results));
  });

  return future.promise;
}

function logProgress(categoryUrls, results, url) {
  let total = results.length + categoryUrls.length + 1;
  let current = results.length;

  Logger.log(`${Math.floor(current/total*100)}% ${current}/${total} - ${url}`);
}

function fetchCategories() {
  let future = Deferred();
  let nowTimestamp = Moment().unix() * 1000;

  let options = {
    url: `https://www.merkurmarkt.at/api/nav/${nowTimestamp}/anon`,
    json: true
  };

  let promise = Request(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      future.resolve(body);
    } else {
      Logger.error(`Error: ${error}`);
      future.reject(error);
    }
  });

  return future.promise;
}

module.exports = {
  fetchData: fetchData,
};
