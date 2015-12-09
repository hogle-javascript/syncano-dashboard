import Globals from '../globals';
import Syncano from 'syncano';

exports.command = (callback) => {
  const accountKey = Globals.tempAccountKey;
  const baseUrl = 'https://api.syncano.rocks';

  const data = {
    label: 'trigger',
    signal: 'post_create',
    class: 'user_profile',
    codebox: Globals.tempCodeBoxId
  };

  new Syncano({accountKey, baseUrl})
    .instance(Globals.tempInstanceName)
    .trigger()
    .add(data)
    .then((response) => {
      Globals.tempTriggerId = response.id;
      if (typeof callback === 'function') {
        callback.call(this);
      }
    })
    .catch((error) => {
      if (error) throw error;
    });

  return this;
};