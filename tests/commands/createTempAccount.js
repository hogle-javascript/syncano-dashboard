import globals from '../globals';
import Syncano from 'syncano';

module.exports.command = function() {
  this.executeAsync(() => {
    const syncano = new Syncano({baseUrl: 'https://api.syncano.rocks'});

    globals.tempPass = Date.now();
    globals.tempInstanceName = 'a' + globals.tempPass;
    globals.tempEmail = 'syncano.bot+' + globals.tempPass + '@syncano.com';

    const error = (err) => {
      console.log(err);
    };
    let account = null;

    syncano.register({email: globals.tempEmail, password: globals.tempPass}).then((success) => {
      globals.tempAccountKey = success.account_key;
      console.log(globals);
      account = new Syncano({accountKey: success.account_key, baseUrl: 'https://api.syncano.rocks'});
      account.instance().add({name: globals.tempInstanceName});
    }).catch(error);
  });
  return this;
};
