import Globals from '../globals';
import Syncano from 'syncano';
import utils from '../utils';

exports.command = (callback) => {
  const accountKey = Globals.tempAccountKey;
  const baseUrl = Globals.apiBaseUrl;
  const data = {
    production_api_key: utils.randomString(32),
    development_api_key: utils.randomString(32)
  };
  const connection = Syncano({
    baseUrl,
    accountKey,
    defaults: {
      instanceName: Globals.tempInstanceName
    }
  });

  connection
    .GCMConfig
    .please()
    .update({}, data)
    .then(() => {
      if (typeof callback === 'function') {
        callback.call(this);
      }
    })
    .catch((error) => {
      if (error) throw error;
    });
  return this;
};
