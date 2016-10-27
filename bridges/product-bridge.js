"use strict";

const Util = require("util");
const Schema = require("js-schema");
const Logger = require("./log-bridge");

const VALIDATE_PRODUCT = Schema({
  "shopDataKey": [Number, null],
  "identifier": String,
  "slug": String,
  "title": String,
  "categoryIdentifiers": Array,
  "brand": [String, null],
  "normalPrice": {
    "price": Number,
    "pricePerUnit": [Number, null],
    "amount": [Number, null],
    "unit": [String, null],
    "packaging": [String, null],
  },
  "sales": Array,
  "amount": [String, null],
  "tags": Object,
  "details": Object
});

class Product {
  constructor() {
    this.shopDataKey = null;
    this.identifier = null;
    this.slug = null;
    this.title = null;
    this.categoryIdentifiers = [];
    this.brand = null;
    this.normalPrice = new Price();
    this.amount = null;
    this.sales = []; // array of objects: see salesTemplate
    this.tags = {}; // object (e.g. "organic": "Bioprodukt", see tags-translator.js)
    this.details = {
      //imageUrl: "",
      //eanCode: "",
      //description: "",
      //descriptionDetail: "",
      //vatCode: null,
      //nutrition: "",
      //ingredients: "",
      //...
    }
  }

  checkFormat() {
    let productValid = VALIDATE_PRODUCT(this);

    if (!productValid) {
      let validationErrors = Util.inspect(VALIDATE_PRODUCT.errors(this));
      Logger.error(`product format error: ${validationErrors}`);
    }

    return productValid;
  }
}

class Price {
  constructor() {
    this.price = null;
    this.pricePerUnit = null;
    this.amount = null;
    this.unit = null;
    this.packaging = null;
  }
}

class Sale {
  constructor() {
    this.price = new Price();
    this.type = null;
    this.condition = null;
    this.information = null;
    this.fromTimestamp = null;
    this.toTimestamp = null;
  }
}

function getDataSchema(products) {
  var tilesSchemata = [];
  var productSchema = {};

  for (let i = 0; i < products.length; i++) {
    let singleSchema = traverse(products[i]);
    tilesSchemata.push(singleSchema);
  }

  for (let i = 0; i < tilesSchemata.length; i++) {
    productSchema = Object.assign(productSchema, tilesSchemata[i]);
  }

  Logger.log(productSchema);
}

function traverse(object) {
  for (let prop in object) {
    if (isNotEmptyObject(object[prop])) {
      traverse(object[prop]);
    } else {
      object[prop] = getTypeOf(object[prop]);
    }
  }

  return object;
}

function isNotEmptyObject(operand) {
  return operand && typeof(operand) === "object" && !(operand instanceof Array) && Object.keys(operand).length;
}

function getTypeOf(operand) {
  let type = typeof(operand);

  if (!operand && operand !== 0) {
    return null;
  }

  if (operand instanceof Array) {
    return [];
  }

  if (type === "object") {
    return {};
  }

  return type;
}

function validateRawProduct(price) {
  return !!price;
}

module.exports = {
  Product: Product,
  Price: Price,
  Sale: Sale,
  getDataSchema: getDataSchema,
  validateRawProduct: validateRawProduct,
};
