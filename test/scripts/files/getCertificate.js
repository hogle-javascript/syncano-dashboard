'use strict';
var Syncano = require('syncano');
var fs = require ('fs');
var https = require ('https');

function getCertFile() {
  const accountKey = process.env.NIGHTWATCH_ACCOUNT_KEY;
  const baseUrl = 'https://api.syncano.rocks';
  const certName = 'cert.p12';
  const credentials = {
    email: process.env.NIGHTWATCH_EMAIL,
    password: process.env.NIGHTWATCH_PASSWORD
  };
  let connection = Syncano({
    baseUrl,
    defaults: {
      instanceName: 'long-frost-7585',
      className: 'apns_cert'
    }
  });

  connection
    .Account
    .login(credentials)
    .then((accountDetails) => {
      connection.accountKey = accountDetails.account_key;

      return connection
        .DataObject
        .please()
        .get({id: 3163});
    })
    .then((dataObject) => {
      let certFile = fs.createWriteStream(certName);

      https.get(dataObject.cert.value, (resp) => {
        resp.on('data', (data) => {
          certFile.write(data);
        });

        resp.on('end', () => {
          return console.log(`Dowloaded: ./${certName}`);
        });
      });
    });
  return;
}

module.exports = getCertFile;
