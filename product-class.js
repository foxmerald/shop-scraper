"use strict";

module.exports = class Product {
  /**
   * @param {object} product An object containing infos of a product
   * @param {string} id String
   * @param {string} shopHandle String
   */

  constructor() {
    this.key = null;
    this.identifier = null;
    this.shopKey = null;
    this.title = null;
    this.name = null;
    this.imageUrl = null;
    this.brand = null;
    this.categoryKeys = []; // array of categoryKeys e.g. ["Obst&Gemüse", "Obst", "Zitrusfrüchte", "Orangen"]
    this.price = {
      original: null,
      pricePerUnit: null
    };
    this.sale = {
      original: null,
      pricePerUnit: null
    };
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
    this.tags = []; // array of strings or object of booleans? e.g. frozen, bio, ...
    this.similarProducts = []; // array of strings, containing productIds
    this.details = { // object for future details e.g. color or fabric for clothes?
      //nutrition: "",
      //ingredients: ""
    }
  }
};
