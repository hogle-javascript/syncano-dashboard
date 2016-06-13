'use strict';
var fs = require ('fs');

function saveAccountsToFile(data) {
  const fileName = 'tempAccounts.js';
  let path = `${__dirname}/../../e2e/${fileName}`;
  let configFile = fs.createWriteStream(path);
  let json = JSON.stringify(data);
  const prefix = 'export default ';
  const suffix = ';';

  configFile.write(prefix + json + suffix);

  return console.log(`File saved at ${path}`);
}

module.exports = saveAccountsToFile;
