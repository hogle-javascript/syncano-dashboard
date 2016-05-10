import Globals from '../globals';
import Syncano from 'syncano';

exports.command = (callback) => {
  const accountKey = Globals.tempAccountKey;
  const baseUrl = 'https://api.syncano.rocks';
  const label = 'script' + Date.now();
  const data = {
    label,
    source: 'print "foo"',
    runtime_name: 'python_library_v5.0'
  };
  const connection = Syncano({
    baseUrl,
    accountKey,
    defaults: {
      instanceName: Globals.tempInstanceName
    }
  });

  connection
    .Script
    .please()
    .create(data)
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
