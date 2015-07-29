var Reflux         = require('reflux'),
    Raven          = require('../../raven'),
    analytics      = require('../../segment'),
    Connection     = require('./Connection'),
    SessionActions = require('./SessionActions'),

    ThemeManager   = require('material-ui/lib/styles/theme-manager')(),
    Colors         = require('material-ui/lib/styles/colors'),
    ColorStore     = require('../../common/Color/ColorStore'),
    SyncanoTheme   = require('../../common/SyncanoTheme');

export default Reflux.createStore({
  listenables: SessionActions,

  init: function() {
    this.connection = Connection.get();
    this.token      = sessionStorage.getItem('token') || null;
    this.user       = null;
    this.instance   = null;
    this.router     = null;
    this.theme      = null;

    if (this.isAuthenticated() && !this.user) {
      SessionActions.fetchUser(this.token);
    }

    if (this.token !== null) {
      this.connection.setApiKey(this.token);
    }
  },

  getConnection: function(empty) {
    return this.connection || empty || null;
  },

  getToken: function(empty) {
    return this.token || empty || null;
  },

  getUser: function(empty) {
    return this.user || empty || null;
  },

  getInstance: function(empty) {
    return this.instance || empty || null;
  },

  getRouter: function(empty) {
    return this.router || empty || null;
  },

  getTheme: function(empty) {
    return this.theme || empty || null;
  },

  setToken: function(token) {
    console.info('SessionStore::setToken');
    this.token = token;
  },

  setUser: function(user) {
    console.info('SessionStore::setUser');
    if (user === undefined) {
      return;
    }

    this.user             = user;

    if (this.user.account_key === undefined) {
      this.user.account_key = this.token;
    } else {
      this.token = user.account_key;
      this.connection.setApiKey(this.token);
      sessionStorage.setItem('token', this.token);
    }

    Raven.setUserContext({
      email: user.email,
      id: user.id
    });

    analytics.identify(user.email);

    this.trigger(this);
  },

  setInstance: function(instance) {
    console.info('SessionStore::setInstance');

    // Let's go back to this topic later
    //var colorName       = instance.metadata.color,
    //    secondColorName = 'indigo';
    //
    //if (ColorStore.getColorByName(colorName)) {
    //  this.theme.setPalette(this.makePalette(colorName, secondColorName));
    //}

    this.instance = instance;
    this.trigger(this);
  },

  setRouter: function(router) {
    console.info('SessionStore::setRouter');
    this.router = router;
  },

  setTheme: function(theme) {
    console.info('SessionStore::setTheme');
    this.theme = theme;
  },

  onFetchInstanceCompleted: function(payload) {
    console.info('SessionStore::onFetchInstanceCompleted');
    SessionActions.setInstance(payload);
  },

  onFetchInstanceFailure: function() {
    this.router.transitionTo('/404');
  },

  onFetchUserCompleted: function(payload) {
    console.info('SessionStore::onFetchUserCompleted');
    SessionActions.setUser(payload);
  },

  onFetchUserFailure: function() {
    console.info('SessionStore::onFetchUserFailure');
    this.onLogout();
  },

  removeInstance: function() {
    this.instance = null;
    if (this.theme) {
      this.theme.setTheme(SyncanoTheme);
    }
  },

  makePalette: function(mainColor, accentColor) {
    return {
      primary1Color : Colors[mainColor + '700'],
      primary2Color : Colors[mainColor + '500'],
      primary3Color : Colors[mainColor + '100'],

      accent1Color  : Colors[accentColor + '700'],
      accent2Color  : Colors[accentColor + '300'],
      accent3Color  : Colors[accentColor + '200']
    }
  },

  onLogin: function(payload) {
    console.info('SessionStore::onLogin');

    if (payload === undefined || payload.account_key === undefined) {
      return;
    }

    this.token = payload.account_key;
    this.connection.setApiKey(this.token);
    sessionStorage.setItem('token', this.token);
    SessionActions.setUser(payload);
  },

  onLogout: function() {
    this.token      = null;
    this.user       = null;
    this.connection = Connection.reset();

    sessionStorage.removeItem('token');
    this.removeInstance();
    this.router.transitionTo('login');
    this.trigger(this);

    Raven.setUserContext();
    analytics.identify();
  },

  isAuthenticated: function() {
    if (this.token === 'undefined') {
      return false;
    }
    return this.token ? true : false;
  },

  isReady: function() {
    return this.isAuthenticated() && this.user !== null;
  }

});
