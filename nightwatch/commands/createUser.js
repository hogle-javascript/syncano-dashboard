import Globals from '../globals';
import Syncano from 'syncano';

exports.command = (callbackDone) => {
  let error = (err) => {
    console.log(err);
  };

  var options = {username: 'user', password: 'pass'};


  const syncano = new Syncano({accountKey: Globals.tempAccountKey,
    baseUrl: 'https://api.syncano.rocks'});

  syncano.instance(Globals.tempInstanceName).user().add(options).then((resp) => {
    Globals.tempUserId = resp.id;
    if (typeof callbackDone === 'function') {
      callbackDone();
    }
  }).catch(error);

  return this;
};
