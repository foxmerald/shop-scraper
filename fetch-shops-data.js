"use strict";

const request = require('request');

var billaFetcher = require("./billa-fetcher");
var merkurFetcher = require("./merkur-fetcher");

var billaPromise = billaFetcher.fetchData();
//var merkurPromise = merkurFetcher.fetchData();

billaPromise.then(data => {
  debugger;
  //... do something with data
  // schick daten an localhost:7000

  sendData(data.products, "products", 1);
  sendData(data.categories, "categories", 1);
}).catch(e => {
  console.error(e);
});

/*
merkurPromise.then(data => {
  debugger;
  //... do something with data
}).catch(e => {
  console.error(e);
});
*/

function sendData(data, type, shopKey) {
  let options = {
    url: `http://localhost:7000/${type}?shopKey=${shopKey}`,
    method: "POST",
    json: true,
    body: data
  }

  request(options, (error, response, body) => {
    console.log(response);
  });
}
