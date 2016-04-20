import Globals from '../globals';
import Syncano from 'syncano';

exports.command = (callback) => {
  const accountKey = Globals.tempAccountKey;
  const baseUrl = 'https://api.syncano.rocks';

  const data = {
    label: 'script',
    source: 'print "foo"',
    runtime_name: 'python'
  };

  new Syncano({accountKey, baseUrl})
    .instance(Globals.tempInstanceName)
    .script()
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
