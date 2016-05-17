import Globals from '../globals';
import Syncano from 'syncano';
import utils from '../utils'

exports.command = (callback) => {
  const accountKey = Globals.tempAccountKey;
  const baseUrl = Globals.apiBaseUrl;
  const label = 'ios_' + Date.now();
  const registration_id = utils.randomString(64);
  const data = {
    label,
    registration_id
  };
  const connection = Syncano({
    baseUrl,
    accountKey,
    defaults: {
      instanceName: Globals.tempInstanceName
    }
  });

  connection
    .APNSDevice
    .please()
    .create(data)
    .then((response) => {
      if (typeof callback === 'function') {
        callback.call(this);
      }
    })
    .catch((error) => {
      if (error) throw error;
    });
  return this;
};
