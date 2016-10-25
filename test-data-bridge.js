const Deferred = require("deferred");
const FileSystem = require("fs");
const Logger = require("./log-bridge");

function saveFile(shopKey, data) {
  let fileName = `${shopKey}-test-data.txt`;
  let dataString = JSON.stringify(data);

  FileSystem.writeFile(fileName, dataString, (error) => {
    if (!error) {
      Logger.log(`The file ${fileName} was saved!`);
    } else {
      Logger.error(error);
    }
  });
}

function loadFile(shopKey) {
  let future = Deferred();
  let fileName = `${shopKey}-test-data.txt`;

  FileSystem.readFile(fileName, (error, data) => {
    if (!error) {
      let dataJSON = JSON.parse(data);
      future.resolve(dataJSON);
    } else {
      Logger.log(error);
      future.reject(error);
    }
  });

  return future.promise;
}

module.exports = {
  saveFile: saveFile,
  loadFile: loadFile,
};
