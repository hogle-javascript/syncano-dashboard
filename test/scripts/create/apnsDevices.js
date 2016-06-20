import utils from '../../e2e/utils';

export default function createAPNSDevices(tempAccount, apnsAmount) {
  const apnsDevices = [];
  const apnsDevicesNames = [];
  let i;

  for (i = 0; i < apnsAmount; i++) {
    const label = 'ios_' + Date.now() + i;
    apnsDevicesNames.push(label);
    apnsDevices.push(tempAccount.connection.APNSDevice({
      label,
      registration_id: utils.randomString(64)
    }));
  }

  return tempAccount.connection.APNSDevice
    .please()
    .bulkCreate(apnsDevices)
    .then(() => {
      tempAccount.tempAPNSDevicesNames = apnsDevicesNames;
      return tempAccount;
    })
    .catch((error) => console.log(error));
}
