import Globals from '../globals';
import Syncano from 'syncano';

exports.command = (callback) => {
  const accountKey = Globals.tempAccountKey;
  const baseUrl = 'https://api.syncano.rocks';
  const connection = Syncano({baseUrl, accountKey});
  const label = 'script' + Date.now();
  const data = {
    label,
    source: 'print "foo"',
    runtime_name: 'python'
  };

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
