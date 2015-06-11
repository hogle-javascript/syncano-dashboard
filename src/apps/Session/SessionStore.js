var Reflux         = require('reflux'),
    Connection     = require('./Connection'),
    SessionActions = require('./SessionActions');


var SessionStore = Reflux.createStore({
  listenables: SessionActions,

  init: function () {
    this.token      = sessionStorage.getItem('token') || null;
    this.user       = null;
    this.connection = Connection.get();
    this.instance   = null;
    this.route      = null;

    if (this.isAuthenticated() && !this.user) {
      SessionActions.fetchUser(this.token);
    }
  },

  onLogin: function(payload) {
    console.info('SessionStore::onLogin');
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
    if (this.token === 'undefined') {
       return false;
    }
    return this.token ? true : false;
  },

  onFetchUserCompleted: function (payload) {
    console.info('SessionStore::onFetchUserCompleted');

    if (payload === undefined) {
      return
    }

    this.user             = payload;
    this.user.account_key = this.token;
    this.trigger(this);
  },

  onFetchUserFailure: function () {
    console.info('SessionStore::onFetchUserFailure');
    this.onLogout();
  },

  isReady: function () {
    return this.isAuthenticated() && this.user !== null;
  }

});

module.exports = SessionStore;
