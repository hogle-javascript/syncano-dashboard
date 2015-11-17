import Globals from '../globals';
import Syncano from 'syncano';
import async from 'async';

exports.command = (callbackDone) => {
  let account = null;
  let syncano = new Syncano({baseUrl: 'https://api.syncano.rocks'});

  Globals.tempPass = Date.now();
  Globals.tempInstanceName = 'a' + Globals.tempPass;
  Globals.tempEmail = 'syncano.bot+' + Globals.tempPass + '@syncano.com';

  let error = (err) => {
    console.log(err);
  };

  async.waterfall([
    (callback) => {
      syncano.register({email: Globals.tempEmail, password: Globals.tempPass}).then((success) => {
        Globals.tempAccountKey = success.account_key;
        callback(null, success.account_key);
      }).catch(error);
    },
    (accountKey, callback) => {
      console.log(accountKey);
      account = new Syncano({accountKey: accountKey, baseUrl: 'https://api.syncano.rocks'});
      account.instance().add({name: Globals.tempInstanceName}).then(() => {
        callback(null);
      }).catch(error);
    }

  ], () => {
    if (typeof callbackDone === 'function') {
      callbackDone();
    }
  });

  return this; // allows the command to be chained.
};
