"use strict";

const util = require("util");
const schema = require("js-schema");
const validate = schema({
  "key": [Number, null],
  "shopDataKey": [Number, null],
  "identifier": String,
  "slug": String,
  "title": String,
  "categoryKeys": Array,
  "categoryIdentifiers": Array,
  "imageUrl": [String, null],
  "brand": [String, null],
  "normalPrice": {
    "price": Number,
    "pricePerUnit": Number,
    "amount": Number,
    "unit": String,
    "packaging": [String, null],
  },
  "sales": Array,
  "amount": String,
  "tags": {
    "generalTags": Array,
    "shopTags": Array,
  },
  "details": Object,
  "rawData": Object,
});

var Logger = require("./log-bridge");

module.exports = class Product {
  constructor() {
    this.key = null;
    this.shopDataKey = null;
    this.identifier = null;
    this.slug = null;
    this.title = null;
    this.categoryKeys = []; // array of our own categoryKeys
    this.categoryIdentifiers = []; // array of the shop's categoryIds
    this.imageUrl = null;
    this.brand = null;
    this.normalPrice = {
      price: null,
      pricePerUnit: null,
      amount: null,
      unit: null,
      packaging: null,
    };
    this.amount = null;
    this.sales = []; // array of objects: see salesTemplate
    this.tags = {
      generalTags: [], // array of strings e.g. frozen, bio, ...
      shopTags: [] // array of strings (own special tags used by shops e.g. Billa Tiefpreis)
    };
    this.details = {
      //eanCode: "",
      //description: "", // string
      //vatCode: null, // number
      //nutrition: "",
      //ingredients: "",
      //...
    };
    this.rawData = {};
  }

  checkFormat(product) {
    var validProduct = validate(product);

    if (!validProduct) {
      let validationErrors = util.inspect(validate.errors(product));
      Logger.error(`product format error: ${validationErrors}`);
    }

    return validProduct;
  }

  getSalesTemplate() {
    let saleTemplate = {
      price: {
        price: null,
        pricePerUnit: null,
        amount: null,
        unit: null,
        packaging: null,
      },
      type: null,
      condition: null,
      information: null,
      fromTimestamp: null,
      toTimestamp: null,
    }

    return saleTemplate;
  }
};
