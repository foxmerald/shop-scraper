"use strict";

module.exports = class Product {
  /**
   * @param {object} product An object containing infos of a product
   * @param {string} id String
   * @param {string} shopHandle String
   */

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
    this.pricePerUnit = null;
    this.salePricePerUnit = null;
    this.amount = {
      weight: null,
      units: null
    };
    this.discount = { // array of objects with type e.g. "Aktion" and condition e.g. "Multipack, ab 2 Stück"
      //type: null,
      //condition: null,
      //fromTimestamp: null,
      //toTimestamp: null
    };
    this.available = null; // boolean
    this.description = []; // array of strings e.g. "description", "more detailed description"
    this.tags = {
      generalTags: [], // array of strings e.g. frozen, bio, ...
      shopTags: [] // array of strings (own special tags used by shops e.g. Billa Tiefpreis)
    };
    this.eanCode = null;
    this.similarProducts = []; // array of strings, containing productIds
    this.details = { // object for future details e.g. color or fabric for clothes?
      //nutrition: "",
      //ingredients: ""
    }
  }
};
