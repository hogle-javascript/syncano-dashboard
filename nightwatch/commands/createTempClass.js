import Globals from '../globals';
import Syncano from 'syncano';

exports.command = (callback) => {
  const accountKey = Globals.tempAccountKey;
  const baseUrl = 'https://api.syncano.rocks';
  const name = 'class' + Date.now();
  const data = {
    name,
    schema: [
      {type: 'string', name}
    ]
  };
  const connection = Syncano({
    baseUrl,
    accountKey,
    defaults: {
      instanceName: Globals.tempInstanceName
    }
  });

  connection
    .Class
    .please()
    .create(data)
    .then((response) => {
      Globals.tempClassName = response.name;
      if (typeof callback === 'function') {
        callback.call(this);
      }
    })
    .catch((error) => {
      if (error) throw error;
    });
  return this;
};
