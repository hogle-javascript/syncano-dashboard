'use strict';
var Syncano = require('syncano');

function createAPNSSocket(tempAccount) {
  function randomString(length) {
    const possible = 'ABCDEFabcdef0123456789';
    let apiKey = '';

    for (let i = 0; i < length; i++) {
      apiKey += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return apiKey;
  }

  return tempAccount.connection
    .APNSConfig
    .please()
    .update({}, {
      development_certificate: Syncano.file('./cert.p12'),
      development_certificate_name: randomString(10),
      development_bundle_identifier: randomString(5)
    })
    .then(() => {
      tempAccount.tempAPNSSocket = true;
      return tempAccount;
    });
}

module.exports = createAPNSSocket;
