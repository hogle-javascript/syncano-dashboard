import Globals from '../globals';
import Syncano from 'syncano';
import async from 'async';

exports.command = (callback) => {
  const baseUrl = 'https://api.syncano.rocks';
  const connection = Syncano({baseUrl});

  Globals.tempPass = Date.now();
  Globals.tempInstanceName = 'a' + Globals.tempPass;
  Globals.tempEmail = 'syncano.bot+' + Globals.tempPass + '@syncano.com';

  async.waterfall([
    (cb) => {
      connection
        .Account
        .register({
          email: Globals.tempEmail,
          password: Globals.tempPass
        })
        .then((success) => {
          connection.setAccountKey(success.account_key);
          Globals.tempAccountKey = success.account_key;
          cb(null, success.account_key);
        })
        .catch(cb);
    },
    (accountKey, cb) => {
      connection
        .Instance
        .please()
        .create({name: Globals.tempInstanceName})
        .then(() => cb(null))
        .catch(cb);
    }
  ], (err) => {
    if (err) throw err;
    if (typeof callback === 'function') {
      callback.call(this);
    }
  });

  return this;
};
