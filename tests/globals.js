import Syncano from 'syncano';
// const Syncano = require('syncano');


export default {
  waitForConditionTimeout: 15000,
  retryAssertionTimeout: 2000,
  instanceName: 'long-frost-7585',
  className: null,
  tempEmail: null,
  tempPass: null,
  tempAccountKey: null,
  tempInstanceName: null,

  before(done) {
    const syncano = new Syncano({baseUrl: 'https://api.syncano.rocks'});

    this.tempPass = Date.now();
    this.tempInstanceName = 'a' + this.tempPass;
    this.tempEmail = 'syncano.bot+' + this.tempPass + '@syncano.com';

    const error = function(err) {
      console.log(err);
      done();
    };
    let account = null;

    syncano.register({email: this.tempEmail, password: this.tempPass}).then((success) => {
      this.tempAccountKey = success.account_key;
      account = new Syncano({accountKey: success.account_key, baseUrl: 'https://api.syncano.rocks'});
      account.instance().add({name: this.tempInstanceName}).then(() => {
        done();
      });
    }).catch(error);
  },

  after(done) {
    console.log('done');
    done();
  }
};
