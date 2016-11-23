// Author: TomTasche
"use strict";

const request = require("request");
const deferred = require("deferred");
const Logger = require("./log-bridge");

var serverUrl;
if (process.env.ZUPER_PRODUCTION) {
  serverUrl = "https://zuper-preise-backend.appspot.com";
} else {
  serverUrl = "http://localhost:7000";
}

var apiKey = process.env.ZUPER_API_KEY;
// TODO: remove
apiKey = "G2sxb819q4J8Q5n878b4kvC7647la5Qh";

const ServerBridge = (function() {
  function pollJob(jobUrl, jobKey, future) {
    if (!future) {
      future = deferred();
    }

    let requestOptions = {
      method: "GET",
      uri: jobUrl,
      json: true,
      qs: {
        jobKey: jobKey
      }
    };

    var retryPolling = function() {
      setTimeout(function() {
        pollJob(jobUrl, jobKey, future);
      }, 500);
    };

    var promise = authenticateRequest(requestOptions);
    promise.then(function(body) {
      var job = body;

      if (job.closedTimestamp) {
        future.resolve(body);
      } else {
        retryPolling();
      }
    }).catch(retryPolling);

    return future.promise;
  }

  function requestJob(requestOptions, jobUrl) {
    var future = deferred();

    var promise = authenticateRequest(requestOptions);
    promise.then(function(body) {
      var job = body;

      var jobPromise = pollJob(jobUrl, job.key);
      future.resolve(jobPromise);
    }).catch(future.reject);

    return future.promise;
  }

  function authenticateRequest(requestOptions) {
    var future = deferred();

    requestOptions.headers = requestOptions.headers || {};
    requestOptions.headers["x-zuper-api-key"] = apiKey;

    request(requestOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        future.resolve(body);
      } else {
        future.reject(error);
      }
    });

    return future.promise;
  }

  var bridge = {};
  bridge.pollJob = pollJob;
  bridge.requestJob = requestJob;
  bridge.authenticateRequest = authenticateRequest;

  return bridge;
})();

module.exports = ServerBridge;
