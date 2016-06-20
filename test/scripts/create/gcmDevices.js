import utils from '../../e2e/utils';

export default function createTestGCMDevices(tempAccount, gcmAmount) {
  const gcmDevices = [];
  const gcmDevicesNames = [];
  let i;

  for (i = 0; i < gcmAmount; i++) {
    const label = 'android_' + Date.now() + i;
    gcmDevicesNames.push(label);
    gcmDevices.push(tempAccount.connection.GCMDevice({
      label,
      registration_id: utils.randomString(64)
    }));
  }

  return tempAccount.connection.GCMDevice
    .please()
    .bulkCreate(gcmDevices)
    .then(() => {
      tempAccount.tempGCMDevicesNames = gcmDevicesNames;
      return tempAccount;
    })
    .catch((error) => console.log(error));
}
