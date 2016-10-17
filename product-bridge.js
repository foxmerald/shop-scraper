"use strict";

const util = require("util");
const schema = require("js-schema");
const validate = schema({
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
  "tags": {
    "generalTags": Array,
    "shopTags": Array,
  },
  "details": Object
});
const tagsTranslator = {
  /*
    "bio",
    "s_bio",
    "bio-austria",
    "eu-bio",
    "ama-bio": "organic",
    "s_marke": "brand",
    "s_gekuehlt": "cooled",
    "s_tiefgek": "frozen",
    "s_guetesie": "seal of quality",
    "s_spezern": "special diet",
    "s_herkunft",
    "s_hkland": "country of origin",
    "s_regio": "regional",
    "s_new": "new",
    "mengemin": "varying weight",
    "fairtrade": "fairtrade",
    "koffeinfrei": "decaffeinated",
    "laktosefrei": "lactose-free",
    "vegan",
    "veganblume": "vegan",
    "vegetarisch": "vegetarian",
    "alkoholfrei": "alcohol-free",
    "gentechnikfrei": "genetically unmodified",
    "fairtrade": "fairtrade",
  */
};

var Logger = require("./log-bridge");

class Product {
  constructor() {
    this.shopDataKey = null;
    this.identifier = null;
    this.slug = null;
    this.title = null;
    this.categoryIdentifiers = [];
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
      //imageUrl: null,
      //eanCode: "",
      //description: "", // string
      //vatCode: null, // number
      //nutrition: "",
      //ingredients: "",
      //...
    };
  }

  checkFormat() {
    var validProduct = validate(this);

    if (!validProduct) {
      let validationErrors = util.inspect(validate.errors(this));
      Logger.error(`product format error: ${validationErrors}`);
    }

    return validProduct;
  }

  salesTemplate() {
    return {
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
  }
}

function getDataSchema(products) {
  var tilesSchemata = [];
  var productSchema = {};

  for (let i = 0; i < products.length; i++) {
    let schema = traverse(products[i]);
    tilesSchemata.push(schema);
  }

  for (let i = 0; i < tilesSchemata.length; i++) {
    productSchema = Object.assign(productSchema, tilesSchemata[i]);
  }

  console.log(productSchema);
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
  return operand && typeof(operand) === "object" && Object.keys(operand).length;
}

function getTypeOf(operand) {
  let type = typeof(operand);

  if (!operand && operand !== 0) {
    return null;
  }

  if (type === "object") {
    return {};
  }

  return type;
}

module.exports = {
  Product: Product,
  getDataSchema: getDataSchema,
  tagsTranslator: tagsTranslator,
};
