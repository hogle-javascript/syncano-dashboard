'use strict';
var Syncano = require('syncano');

function createGCMSocket(tempAccount) {
  function randomString(length) {
    const possible = 'ABCDEFabcdef0123456789';
    let apiKey = '';

    for (let i = 0; i < length; i++) {
      apiKey += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return apiKey;
  }

  return tempAccount.connection
    .GCMConfig
    .please()
    .update({}, {
      production_api_key: randomString(32),
      development_api_key: randomString(32)
    })
    .then(() => {
      tempAccount.createGCMSocket = true;
      return tempAccount;
    });
}

module.exports = createGCMSocket;
