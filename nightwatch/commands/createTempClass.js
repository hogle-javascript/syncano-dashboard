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

  new Syncano({accountKey, baseUrl})
    .instance(Globals.tempInstanceName)
    .class()
    .add(data)
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
