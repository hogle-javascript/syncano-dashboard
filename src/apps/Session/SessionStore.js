var Reflux         = require('reflux'),
    Connection     = require('./Connection'),
    SessionActions = require('./SessionActions');


var SessionStore = Reflux.createStore({
  listenables: SessionActions,

  init: function () {
    this.connection = Connection.get();
    this.instance   = null;
    this.route      = null;

    if (this.isAuthenticated() && !this.connection.account) {
      SessionActions.tokenLogin(this.getToken());
    }
  },

  getMyEmail: function() {
    return sessionStorage.getItem('user');
  },

  getToken: function() {
    return sessionStorage.getItem('token');
  },

  clearInstance: function() {
    this.instance = null;
  },

  onTokenLoginCompleted: function(payload) {
    console.info('SessionStore::onTokenLoginComplete');
  },

  onLogin: function(payload) {
    console.info('SessionStore::onLogin');
    if (payload === undefined || payload.account_key === undefined) {
      return
    }

    sessionStorage.setItem('token', payload.account_key);
    sessionStorage.setItem('user', payload.email);
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
    this.router.transitionTo('login');
    this.trigger(this);
  },

  onRegisterRouter: function (router) {
    this.router = router;
  },

  onSetInstanceCompleted: function (payload) {
    console.info('SessionStore::onSetInstanceCompleted');
    this.instance = payload;
    this.trigger(this)
  },

  onSetInstanceFailure: function () {
    this.router.transitionTo('/404');
  },

  isAuthenticated: function () {
    if (sessionStorage.getItem('token') === null) {
      return false;
    }
    return true;
  },

});

module.exports = SessionStore;
