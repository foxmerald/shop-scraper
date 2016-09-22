"use strict";

var billaFetcher = require("./billa-fetcher");
var merkurFetcher = require("./merkur-fetcher");

var promises = [];

var billaDataPromise = billaFetcher.fetchData();
var merkurDataPromise = merkurFetcher.fetchData();


promises.push(billaDataPromise);
promises.push(merkurDataPromise);


Promise.all(promises).then((result) => {
	debugger;
	var shopsData = {};
	//...
}).catch((e) => {
	console.error(e);
});
