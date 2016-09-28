"use strict";

const schema = require("js-schema");
const validate = schema({
  "key": [Number, null],
  "shopKey": [Number, null],
  "identifier": String,
  "slug": String,
  "title": String,
  "categoryKeys": Array,
  "categoryIdentifiers": Array,
  "imageUrl": [String, null],
  "brand": [String, null],
  "price": Number,
  "salePrice": [Number, null],
  "pricePerUnit": {
    "amount": Number,
    "unit": String,
    "packageType": [String, null],
    "price": Number,
  },
  "salePricePerUnit": [{
    "amount": Number,
    "unit": String,
    "packageType": [String, null],
    "price": Number,
  }, null],
  "amount": String,
  "discount": [{
    "types": Array,
    "conditions": Array,
    "additionalInfo": [String, null],
    "?fromTimestamp": Number,
    "?toTimestamp": Number,
  }, null],
  "tags": {
    "generalTags": Array,
    "shopTags": Array,
  },
  "description": [String, null],
  "eanCode": [String, null],
  "similarProducts": [Array, null],
  "details": Object,
});

var Logger = require("./log-bridge");

module.exports = class Product {
  /**
   * @param {object} product An object containing infos of a product
   * @param {number} key
   * @param {number} shopKey
   * @param {string} identifier
   * @param {string} slug
   * @param {string} title
   * @param {array of numbers} categoryKeys
   * @param {array of strings} categoryIdentifiers
   * @param {string} imageUrl
   * @param {string} brand
   * @param {number} price
   * @param {number} salePrice
   * @param {object} pricePerUnit
   * @param {object} salePricePerUnit
   * @param {string} amount
   * @param {object} discount
   * @param {string} description
   * @param {object} tags
   * @param {string} eanCode
   * @param {array of strings} similarProducts
   * @param {object} details
   **/

  constructor() {
    this.key = null;
    this.shopKey = null;
    this.identifier = null;
    this.slug = null;
    this.title = null;
    this.categoryKeys = []; // array of our own categoryKeys
    this.categoryIdentifiers = []; // array of the shop's categoryIds
    this.imageUrl = null;
    this.brand = null;
    this.price = null; // long
    this.salePrice = null; // long
    this.pricePerUnit = {};
    this.salePricePerUnit = {};
    this.amount = null;
    this.discount = []; // array of objects with type e.g. "Aktion" and condition e.g. "Multipack, ab 2 Stück"
    /*{
      type: null,
      condition: null,
      fromTimestamp: null,
      toTimestamp: null
    }*/
    this.description = null; // string
    this.tags = {
      generalTags: [], // array of strings e.g. frozen, bio, ...
      shopTags: [] // array of strings (own special tags used by shops e.g. Billa Tiefpreis)
    };
    this.eanCode = null;
    this.similarProducts = []; // array of strings, containing productIds
    this.details = {}; // object for future details e.g. color or fabric for clothes?
    /*{
    nutrition: "",
    ingredients: "",
  }*/
  }

  checkFormat(product) {
    var validProduct = validate(product);

    if (!validProduct) {
      Logger.error("product format error:");
      validate.errors(product);
    }

    return validProduct;
  }
};
