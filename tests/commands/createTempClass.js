import Globals from '../globals';
import Syncano from 'syncano';

exports.command = (callback) => {
  const accountKey = Globals.tempAccountKey;
  const baseUrl = 'https://api.syncano.rocks';

  const data = {
    name: 'class',
    schema: [
      {type: 'string', name: 'name'}
    ]
  };

  new Syncano({accountKey, baseUrl})
    .instance(Globals.tempInstanceName)
    .class()
    .add(data)
    .then((response) => {
      Globals.tempClassName = response.name;
      if (typeof callback === 'function') {
        callback();
      }
    })
    .catch((error) => {
      if (error) throw error;
    });

  return this;
};
