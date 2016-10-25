const Moment = require("moment");

let logger = {
  log: function(log) {
    console.log(`${Moment().format("HH:mm:ss")} ${log}`)
  },
  error: function(log) {
    console.error(`${Moment().format("HH:mm:ss")} ${log}`)
  },
};

module.exports = logger;
