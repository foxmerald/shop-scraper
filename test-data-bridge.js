const deferred = require("deferred");
const fs = require('fs');

var Logger = require("./log-bridge");

module.exports = {
  saveFile: function(shopName, data) {
    let fileName = `${shopName}-test-data.txt`;
    let dataString = JSON.stringify(data);

    fs.writeFile(fileName, dataString, (e) => {
      if (!e) {
        Logger.log(`The file ${fileName} was saved!`);
      } else {
        Logger.error(e);
        return;
      }

    });
  },
  loadFile: function(shopName) {
    let future = deferred();
    let fileName = `${shopName}-test-data.txt`;

    fs.readFile(fileName, (e, data) => {
      if (!e) {
        let dataJSON = JSON.parse(data);
        future.resolve(dataJSON);
      } else {
        Logger.log(e);
        future.reject(e);
      }
    });

    return future.promise;
  },
};
