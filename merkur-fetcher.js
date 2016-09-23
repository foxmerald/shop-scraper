"use strict";

const request = require("request");
const util = require("util");

var Promise = require("bluebird");
var Product = require("./product-class");

module.exports = {
  fetchData: () => {
    var categoriesPromise = fetchCategories();

    categoriesPromise.then((categoriesData) => {
      var categories = preprocessCategories(categoriesData);
      var categoryIds = Object.keys(categories);
      var categoryUrls = urls;

      return fetchProducts(categoryIds).then(result => {
        var data = {
          products: result,
          categories: categories
        }

        debugger;

        return data;
      }).catch(error => {
        console.error("Error: " + error);
      });
    }).catch((error) => {
      console.error("Error: " + error);
    });
  }
};

function preprocessCategories(data) {
  var dataGroups = data.children;
  var categories = {};
  var urls = [];
  var mainCategories;

  for (let i = 0; i < dataGroups.length; i++) {
    let dataGroup = dataGroups[i];

    if (dataGroup.slug === "/shop/") {
      mainCategories = dataGroup.children;
      break;
    }
  }

  for (let i = 0; i < mainCategories.length; i++) {
    var cat = mainCategories[i];
    var catId = getCategoryId(cat.slug);
    var catUrl = getCategoryUrl(cat.slug, catId);
    var topcategories = cat.children;

    categories[catId] = {
      name: cat.name,
      id: cat.externalId,
      url: catUrl,
      subcategories: [], // TODO add children
    }

    urls.push(catUrl);

    if (!topcategories) {
      continue;
    }

    for (let j = 0; j < topcategories.length; j++) {
      var topcat = topcategories[j];
      var topcatId = getCategoryId(topcat.slug);
      var topcatUrl = getCategoryUrl(topcat.slug, topcatId);
      var subcategories = topcat.children;

      categories[topcatId] = {
        name: topcat.name,
        id: topcat.externalId,
        url: topcatUrl,
        subcategories: [], // TODO add children
      }

      urls.push(topcatUrl);

      if (!subcategories) {
        continue;
      }

      for (let k = 0; k < subcategories.length; k++) {
        var subcat = subcategories[k];
        var subcatId = getCategoryId(subcat.slug);
        var subcatUrl = getCategoryUrl(subcat.slug, subcatId);
        var subsubcategories = subcat.children;

        categories[subcatId] = {
          name: subcat.name,
          id: subcat.externalId,
          url: subcatUrl,
          subcategories: [], // TODO add children
        }

        urls.push(subcatUrl);

        if (!subsubcategories) {
          continue;
        }

        for (let l = 0; l < subsubcategories.length; l++) {
          var subsubcat = subsubcategories[l];
          var subsubcatId = getCategoryId(subsubcat.slug);
          var subsubcatUrl = getCategoryUrl(subsubcat.slug, subsubcatId);

          categories[subsubcatId] = {
            name: subsubcat.name,
            id: subsubcat.externalId,
            url: subsubcatUrl,
            subcategories: [],
          }

          urls.push(subsubcatUrl);
        }
      }
    }
  }

  var categoriesData = {
    categories: categories,
    urls: urls
  }

  debugger;

  return categories;
}

function getCategoryUrl(slug, id) {
  let categoryUrl;

  if (slug.indexOf("aktion-und-promotion") >= 0) {
    debugger;
    categoryUrl = `https://www.merkurmarkt.at/api/shop/articles/category/${id}`;
  } else {
    categoryUrl = `https://www.merkurmarkt.at/api/shop/product-overview/${id}`;
  }

  https: //www.merkurmarkt.at/api/shop/articles/category/zitronen-7707/08-833618?pageSize=35&timestamp=1474553606808

    return categoryUrl;
}

function getCategoryId(slug) {
  let segments = slug.split("/");

  let lastElement = segments[segments.length - 1];
  let secondLastElement = segments[segments.length - 2];
  let categoryId = lastElement || secondLastElement;

  return categoryId;
}

function fetchProducts(categoryIds, results = [], pageNr = 0) {
  if (!categoryIds.length || results.length > 50) { //TODO: remove results.length > 50
    debugger;
    return results;
  }

  var categoryId = categoryIds.shift();

  let url = `${categoryId}?pageSize=500&page=${pageNr}`;
  //let url = `https://www.merkurmarkt.at/api/shop/product-overview/${categoryId}?pageSize=500&page=${pageNr}`;
  //"https://www.merkurmarkt.at/api/shop/articles/category/grill-huhn?pageSize=500&page=0"
  //"https://www.merkurmarkt.at/api/shop/articles/category/grill-huhn?pageSize=500&timestamp=1474481151545"

  let options = {
    url: url,
    json: true
  };

  var insges = results.length + categoryIds.length + 1;
  var current = results.length;
  console.log(`${Math.floor(current/insges*100)}% ${current}/${insges} - ${categoryId}: `);

  let promise = new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {

        console.log(body);
        results.push(body);

        if (body.total !== body.count + body.offset) {
          categoryIds.unshift(categoryId);
          resolve(fetchProducts(categoryIds, results, pageNr + 1));
          return;
        }
      } else {
        debugger;
        console.error("Error - " + categoryId + ": " + error);
      }

      resolve(fetchProducts(categoryIds, results));
    });
  });

  return promise;
}

function fetchCategories() {
  let options = {
    url: "https://www.merkurmarkt.at/api/nav/1467103900346/anon",
    json: true
  };

  let promise = new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        resolve(body);
      } else {
        console.error("Error: " + error);
        reject(error);
      }
    });
  });

  return promise;
}
