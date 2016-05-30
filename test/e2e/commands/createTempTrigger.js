import Globals from '../globals';
import Syncano from 'syncano';

exports.command = (callback) => {
  const accountKey = Globals.tempAccountKey;
  const baseUrl = 'https://api.syncano.rocks';
  const connection = Syncano({
    baseUrl,
    accountKey,
    defaults: {
      instanceName: Globals.tempInstanceName
    }
  });
  const data = {
    label: 'trigger',
    signal: 'post_create',
    class: 'user_profile',
    script: Globals.tempScriptId
  };

  connection
    .Trigger
    .please()
    .create(data)
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
