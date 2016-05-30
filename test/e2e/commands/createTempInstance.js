import Globals from '../globals';
import Syncano from 'syncano';

exports.command = (callback) => {
  const accountKey = Globals.tempAccountKey;
  const baseUrl = 'https://api.syncano.rocks';
  const connection = Syncano({baseUrl, accountKey});

  const instanceName = 'a' + Date.now();

  connection
    .Instance
    .please()
    .create({name: instanceName})
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
