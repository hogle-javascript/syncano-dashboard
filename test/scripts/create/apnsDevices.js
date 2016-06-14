'use strict';

function createTestAPNSDevices(tempAccount, apnsAmount) {
  let apnsDevices = [];
  let apnsDevicesNames = [];

  function randomString(length) {
    const possible = 'ABCDEFabcdef0123456789';
    let apiKey = '';

    for (let i = 0; i < length; i++) {
      apiKey += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return apiKey;
  }

  for (var i = 0; i < apnsAmount; i++) {
    const label = 'ios_' + Date.now() + i;
    apnsDevicesNames.push(label);
    apnsDevices.push(tempAccount.connection.APNSDevice({
      label,
      registration_id: randomString(64)
    }));
  }

  return tempAccount.connection.APNSDevice
    .please()
    .bulkCreate(apnsDevices)
    .then((response) => {
      tempAccount.tempAPNSDevicesNames = apnsDevicesNames;
      return tempAccount;
    })
    .catch((error) => console.log(error));
}

module.exports = createTestAPNSDevices;
