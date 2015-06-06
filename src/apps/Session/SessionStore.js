var Reflux         = require('reflux'),
    Connection     = require('./Connection'),
    SessionActions = require('./SessionActions');


var SessionStore = Reflux.createStore({
  listenables: SessionActions,

  init: function () {
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
    if (payload === undefined || payload.account_key === undefined) {
      return
    }

    sessionStorage.setItem('token', payload.account_key);
    this.token = payload.account_key;
    this.user  = payload;
    this.trigger(this);
  },

  onLogout: function() {
    this.token      = null;
    this.user       = null;
    this.instance   = null;
    this.connection = Connection.reset();

    sessionStorage.removeItem('token');
    this.trigger(this);
  },

  onRegisterRouter: function (router) {
    this.router = router;
  },

  onSetInstanceCompleted: function (payload) {
    this.instance = payload;
    this.trigger(this)
  },

  onSetInstanceFailure: function () {
    this.router.transitionTo('/404');
  },

  isAuthenticated: function () {
    if (this.token === 'undefined') {
      return false;
    }

    return this.token ? true : false;
  },

});

module.exports = SessionStore;
