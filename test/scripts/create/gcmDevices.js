'use strict';

function createTestGCMDevices(tempAccount, gcmAmount) {
  let gcmDevices = [];
  let gcmDevicesNames = [];

  function randomString(length) {
    const possible = 'ABCDEFabcdef0123456789';
    let apiKey = '';

    for (let i = 0; i < length; i++) {
      apiKey += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return apiKey;
  }

  for (var i = 0; i < gcmAmount; i++) {
    const label = 'android_' + Date.now() + i;
    gcmDevicesNames.push(label);
    gcmDevices.push(tempAccount.connection.GCMDevice({
      label,
      registration_id: randomString(64)
    }));
  }

  return tempAccount.connection.GCMDevice
    .please()
    .bulkCreate(gcmDevices)
    .then((response) => {
      tempAccount.tempGCMDevicesNames = gcmDevicesNames;
      return tempAccount;
    })
    .catch((error) => console.log(error));
}

module.exports = createTestGCMDevices;
