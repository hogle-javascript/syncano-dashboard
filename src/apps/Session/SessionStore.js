var Reflux         = require('reflux'),
    Connection     = require('./Connection'),
    SessionActions = require('./SessionActions'),

    ThemeManager   = require('material-ui/lib/styles/theme-manager')(),
    Colors         = require('material-ui/lib/styles/colors'),
    ColorStore     = require('../../common/Color/ColorStore'),
    SyncanoTheme   = require('../../common/SyncanoTheme');


var SessionStore = Reflux.createStore({
  listenables: SessionActions,

  init: function () {
    this.connection = Connection.get();
    this.token      = sessionStorage.getItem('token') || null;
    this.user       = null;
    this.instance   = null;
    this.route      = null;
    this.theme      = null;

    if (this.isAuthenticated() && !this.user) {
      SessionActions.fetchUser(this.token);
    }

    if (this.token !== null) {
      this.connection.setApiKey(this.token);
    }
  },

  clearInstance: function() {
    this.instance = null;
    if (this.theme) {
      this.theme.setTheme(SyncanoTheme);
    }
  },

  makePalette: function(mainColor, accentColor) {
    return {
      primary1Color : Colors[mainColor+'700'],
      primary2Color : Colors[mainColor+'500'],
      primary3Color : Colors[mainColor+'100'],

      accent1Color  : Colors[accentColor+'700'],
      accent2Color  : Colors[accentColor+'300'],
      accent3Color  : Colors[accentColor+'200']
    }
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

    this.token = payload.account_key;
    this.user  = payload;

    this.connection.setApiKey(this.token);
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

  onRegisterUser: function (user) {
    console.info('SessionStore::onRegisterUser');
    this.user             = user;
    this.user.account_key = this.token;
    this.trigger(this);
  },

  onRegisterTheme: function (theme) {
    console.info('SessionStore::onRegisterTheme');
    this.theme = theme;
  },

  onSetInstanceCompleted: function (payload) {
    console.info('SessionStore::onSetInstanceCompleted');
    var colorName       = payload.metadata.color,
        secondColorName = 'indigo';

    if (ColorStore.getColorByName(colorName)) {
        this.theme.setPalette(this.makePalette(colorName, secondColorName));
    }
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
  },

  getUser: function (empty) {
    return this.user || empty || null;
  },

  getInstance: function (empty) {
    return this.instance || empty || null;
  }

});

module.exports = SessionStore;
