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

			return fetchProductsNew(categoryIds);
			/*
			var productsPromises = [];
			for (let i = 0; i < categoryIds.length; i++) {
				var categoryId = categoryIds[i];
				var productPromise = fetchProducts(categoryId, 0);

				productsPromises.push(productPromise);
			}

			return Promise.all(productsPromises).then((result) => {
				debugger;
				console.log(result);
				var data = result;

				return data;
			}).catch((error) => {
				console.error("Error: " + error);
			});
			*/
		}).catch((error) => {
			console.error("Error: " + error);
		});
	}
};

function fetchProductsNew(categoryIds, results = [], pageNr = 0) {
	if (!categoryIds.length) {
		debugger;
		return results;
	}

	var categoryId = categoryIds.shift();

	let url = `https://www.merkurmarkt.at/api/shop/product-overview/${categoryId}?pageSize=500&page=${pageNr}`;
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
					resolve(fetchProductsNew(categoryIds, results, pageNr + 1));
					return;
				}
			} else {
				debugger;
				console.error("Error - " + categoryId + ": " + error);
				//reject(error);
			}

			resolve(fetchProductsNew(categoryIds, results));
		});
	});

	return promise;
}

function preprocessCategories(data) {
	var dataGroups = data.children;
	var categories = {};
	var categoriesData;

	for (let i = 0; i < dataGroups.length; i++) {
		let dataGroup = dataGroups[i];

		if (dataGroup.slug === "/shop/") {
			categoriesData = dataGroup.children;
			break;
		}
	}

	for (let i = 0; i < categoriesData.length; i++) {
		var cat = categoriesData[i];
		var catId = getCategoryId(cat.slug);
		var topcategories = cat.children;

		categories[catId] = {
			name: cat.name,
			path: [cat.name],
			pathIds: [catId],
			id: cat.externalId
		}

		if (!topcategories) {
			continue;
		}

		for (let j = 0; j < topcategories.length; j++) {
			var topcat = topcategories[j];
			var topcatId = getCategoryId(topcat.slug);
			var subcategories = topcat.children;

			categories[topcatId] = {
				name: topcat.name,
				path: [cat.name, topcat.name],
				pathIds: [catId, topcatId],
				id: topcat.externalId
			}

			if (!subcategories) {
				continue;
			}

			for (let k = 0; k < subcategories.length; k++) {
				var subcat = subcategories[k];
				var subcatId = getCategoryId(subcat.slug);
				var subsubcategories = subcat.children;

				categories[subcatId] = {
					name: subcat.name,
					path: [cat.name, topcat.name, subcat.name],
					pathIds: [catId, topcatId, subcatId],
					id: subcat.externalId
				}

				if (!subsubcategories) {
					continue;
				}

				for (let l = 0; l < subsubcategories.length; l++) {
					var subsubcat = subsubcategories[l];
					var subsubcatId = getCategoryId(subsubcat.slug);

					categories[subsubcatId] = {
						name: subsubcat.name,
						path: [cat.name, topcat.name, subcat.name, subsubcat.name],
						pathIds: [catId, topcatId, subcatId, subsubcatId],
						id: subsubcat.externalId
					}
				}
			}
		}
	}

	return categories;
}

function getCategoryId(path) {
	var segments = path.split("/");

	console.log(segments);

	return segments[segments.length - 1];
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
