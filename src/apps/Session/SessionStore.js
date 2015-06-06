var Reflux         = require('reflux'),
    Connection     = require('./Connection'),
    SessionActions = require('./SessionActions');


var SessionStore = Reflux.createStore({
  listenables: SessionActions,

  init: function () {
    console.log('SessionStore::init');

    this.token      = sessionStorage.getItem('token') || null;
    this.user       = null;
    this.instance   = null;
    this.connection = Connection.get();
    this.route      = null;

    if (this.isAuthenticated() && !this.connection.account) {
      SessionActions.tokenLogin(this.token);
    }
  },

  onLogin: function(payload) {
    console.log('SessionStore::onLogin', payload);

    sessionStorage.setItem('token', payload.account_key);
    this.token = payload.account_key;
    this.user  = payload;
    this.trigger(this);
  },

  onLogout: function() {
    console.log('SessionStore::onLogout');

    this.token      = null;
    this.user       = null;
    this.instance   = null;
    this.connection = Connection.reset();

    sessionStorage.removeItem('token');
    this.trigger(this);
  },

  onRegisterRouter: function (router) {
    console.log('SessionStore::onRegisterRouter', router);

    this.router = router;
  },

  onSetInstanceCompleted: function (payload) {
    console.log('SessionStore::onSetInstanceCompleted', payload);

    this.instance = payload;
    this.trigger(this)
  },

  onSetInstanceFailure: function () {
    console.log('SessionStore::onSetInstanceFailure');

    this.router.transitionTo('/404');
  },

  isAuthenticated: function () {
    console.log('SessionStore::isAuthenticated', this.token);

    return this.token ? true : false;
  },

});

module.exports = SessionStore;
