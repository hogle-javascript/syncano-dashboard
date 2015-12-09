import Globals from '../globals';
import Syncano from 'syncano';

exports.command = (callbackDone) => {
  let error = (err) => {
    console.log(err);
  };

  const codeBoxOptions = {
    label: 'codebox',
    source: 'print "foo"',
    runtime_name: 'python'
  };

  const syncano = new Syncano({accountKey: Globals.tempAccountKey,
    baseUrl: 'https://api.syncano.rocks'});

  syncano.instance(Globals.tempInstanceName).codebox().add(codeBoxOptions).then((resp) => {
    Globals.tempCodeBoxId = resp.id;
    if (typeof callbackDone === 'function') {
      callbackDone();
    }
  }).catch(error);

  return this;
};
