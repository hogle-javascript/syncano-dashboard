import fs from 'fs';

export default function saveAccountsToFile(data) {
  const fileName = 'tempAccounts.js';
  const path = `${__dirname}/../../e2e/${fileName}`;
  const configFile = fs.createWriteStream(path);
  const json = JSON.stringify(data);
  const prefix = 'export default ';
  const suffix = ';';

  configFile.write(prefix + json + suffix);

  return console.log(`File saved at ${path}`);
}
