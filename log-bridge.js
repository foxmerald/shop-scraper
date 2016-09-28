const moment = require("moment");

module.exports = {
  log: function(log) {
    console.log(`${moment().format("HH:mm:ss")} ${log}`)
  },
  error: function(log) {
    console.error(`${moment().format("HH:mm:ss")} ${log}`)
  },
};
