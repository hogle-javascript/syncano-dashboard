import Globals from '../globals';
import Syncano from 'syncano';

exports.command = (callbackDone) => {
  console.log('temp class');
  let error = (err) => {
    console.log(err);
  };

  const classOptions = {
    name: 'class',
    schema: [
      {type: 'string', name: 'name'}
    ]
  };

  const syncano = new Syncano({accountKey: Globals.tempAccountKey,
    baseUrl: 'https://api.syncano.rocks'});

  syncano.instance(Globals.tempInstanceName).class().add(classOptions).then((resp) => {
    Globals.tempClassName = resp.name;
    if (typeof callbackDone === 'function') {
      callbackDone();
    }
  }).catch(error);

  return this;
};
