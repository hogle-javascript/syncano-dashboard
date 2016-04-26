import Globals from '../globals';
import Syncano from 'syncano';

exports.command = (callback) => {
  const accountKey = Globals.tempAccountKey;
  const baseUrl = 'https://api.syncano.rocks';
  const name = 'script' + Date.now();
  const data = {
    label: name,
    source: 'print "foo"',
    runtime_name: 'python'
  };

  new Syncano({accountKey, baseUrl})
    .instance(Globals.tempInstanceName)
    .codebox()
    .add(data)
    .then((response) => {
      Globals.tempScriptId = response.id;
      if (typeof callback === 'function') {
        callback.call(this);
      }
    })
    .catch((error) => {
      if (error) throw error;
    });
  return this;
};
