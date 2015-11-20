import Globals from '../globals';
import Syncano from 'syncano';

exports.command = (callback) => {
  const accountKey = Globals.tempAccountKey;
  const baseUrl = 'https://api.syncano.rocks';

  const data = {
    username: 'user',
    password: 'password'
  };


  new Syncano({accountKey, baseUrl})
    .instance(Globals.tempInstanceName)
    .user()
    .add(data)
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
