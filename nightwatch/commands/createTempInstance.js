import Globals from '../globals';
import Syncano from 'syncano';

exports.command = (callback) => {
  const accountKey = Globals.tempAccountKey;
  const baseUrl = 'https://api.syncano.rocks';

  const instanceName = 'a' + Date.now();

  new Syncano({accountKey, baseUrl})
    .instance()
    .add({name: instanceName})
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