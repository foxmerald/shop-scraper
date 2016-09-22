"use strict";

const request = require("request");
const util = require("util");
const rp = require('request-promise');

var Promise = require("bluebird");
var Product = require("./product-class");

module.exports = {
	fetchData: () => {
		var testData = require("./billa-test-data");

		var categoriesUrl = "https://shop.billa.at/api/navigation";
		var productsUrl = "https://shop.billa.at/api/search/full?category=B2&pageSize=9175&isFirstPage=true&isLastPage=true";

		//TODO remove
		//preprocessData(testData.categories, testData.products);

		var categoriesPromise = fetchDataFromUrl(request, categoriesUrl);
		var productPromise = fetchDataFromUrl(request, productsUrl);

		return Promise.all([categoriesPromise, productPromise]).then(([categories, products]) => {
			var preprocessedData = preprocessData(categories, products);

			return preprocessedData;
		}).catch((e) => {
			console.error(e);
		});
	}
};

function preprocessData(categoriesData, productsData) {
	let categories = preprocessCategories(categoriesData);
	let products = preprocessProducts(categories, productsData);

	let data = {
		categories: categories,
		products: products
	};

	return data;
}

function preprocessProducts(categories, productsData) {
	let products = [];
	let tiles = productsData.tiles;


	for (let i = 0; i < tiles.length; i++) {
		let tile = tiles[i];
		let product = preprocessProduct(tile);

		products.push(product);
	}

	return products;
}

function preprocessProduct(tile) {
	let data = tile.data;
	let product = new Product();


	product.key = null;
	product.shopKey = null;
	product.identifier = data.articleId;
	product.title = data.name;
	product.name = data.slug;
	product.imageUrl = getProductUrl(tile);
	product.brand = data.brand;
	product.categoryKeys = getProductCategories(tile);
	product.amount = {
		weight: null,
		units: null
	};
	product.price = {
		original: data.price.normal * 100, // TODO write global method for this case
		pricePerUnit: data.unit // TODO implement own calculation
	};
	product.sale = {
		original: data.price.sale * 100, // TODO write global method for this case
		pricePerUnit: data.unit // TODO implement own calculation
	};
	product.discounts = []; // TODO add discounts
	product.available = null;
	product.description.push(data.description);
	product.tags = getProductTags(data);
	product.similarProducts = [];
	product.details = {}


	return product;
}

function getProductUrl(data) {
	let productId = data.articleId;
	return `https://files.billa.at/files/artikel/${productId}_01__600x600.jpg`;
}

function getProductTags(data) {
	/*
	var attributes = data.attributes;
	var priceTypes = data.vtcPrice.defaultPriceTypes;
	var tags = [];

	var translator = {
		"s_bio": "organic",
		"s_marke": "brand-name product",
		"s_gekuehlt": "cooled",
		"s_tiefgek": "frozen",
		"s_guetesie": "seal of quality",
		"s_spezern": "special diet",
		"s_herkunft": "country of origin",
		"s_hkland": "country of origin",
		"s_regio": "regional",
		"DAUERTIEFPREIS": "dauertiefpreis",
		"AKTION": "aktion",
		"SATTERRABATT": "satterrabatt",
	};

	//TODO wenn nicht translatbar dann original drinnen lassen

	for (let i = 0; i < attributes.length; i++) {
		let attribute = attributes[i];
		let tag = translator[attribute];
		tags.push(tag);
	}

	if (data.vtcOnly) {
		tags.push("online-shop only");
	}

	if (priceTypes.length) {
		for (let i = 0; i < priceTypes.length; i++) {
			let priceType = priceTypes[i];
			let tag = translator[priceType];
			tags.push(tag);
		}
	}

	return tags;
	*/
}

function getProductCategories(product, categories) {
	/*
	let articleGroupIds = product.articleGroupIds;
	let productCategories = {
	  topcategories: [],
	  subcategories: [],
	  subsubcategories: []
	};

	for (let i = 0; i < articleGroupIds.length; i++) {
	  let id = articleGroupIds[i];

	  //add categories
	}
	*/
}

function preprocessCategories(categoryData) {
	var categories = {};

	for (let i = 0; i < categoryData.length; i++) {
		let category = categoryData[i];
		let id = category.articleGroupId;

		categories[id] = {
			title: category.title,
			name: getSegmentFromUrl(category.url, 1)
		}

		let subcategoryData = category.children;

		for (let j = 0; j < subcategoryData.length; j++) {
			let subcategory = subcategoryData[j];
			let id = subcategory.articleGroupId;

			categories[id] = {
				title: subcategory.title,
				name: getSegmentFromUrl(subcategory.url, 2)
			}

			let subsubcategoryData = subcategory.children;

			for (let k = 0; k < subsubcategoryData.length; k++) {
				let subsubcategory = subsubcategoryData[k];
				let id = subsubcategory.articleGroupId;

				categories[id] = {
					title: subsubcategory.title,
					name: getSegmentFromUrl(subsubcategory.url, 3)
				}
			}
		}
	}

	return categories;
}

function getSegmentFromUrl(string, segment) {
	return string.split("/")[segment];
}

function fetchDataFromUrl(request, url) {
	let options = {
		url: url,
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
