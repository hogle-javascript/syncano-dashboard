var Reflux      = require('reflux'),

    MainStore   = require('../Main/MainStore'),
    AuthActions = require('./AuthActions');


var AuthStore = Reflux.createStore({
  listenables: AuthActions,

  getInitialState: function () {
    return {
      canSubmit: true,
      token: null,
      errors: {},
    }
  },

  init: function () {
    this.data = {
      token: null,
      user: null,
      errors: {},
      email: null,
      password: null,
      canSubmit: true,
    };

    this.data.token = sessionStorage.getItem('token') || null;

    if (this.data.token) {
      if (!MainStore.connection.account) {
        AuthActions.apiKeySignIn(this.data.token);
      }
    }
  },

  // We need name (for example) to build URL's
  getCurrentInstanceName: function () {
    return this.data.currentInstance.name;
  },

  onPasswordSignUp: function () {
    this.onPasswordSignIn();
  },

  onPasswordSignUpCompleted: function (payload) {
    this.onPasswordSignInCompleted(payload);
  },

  onPasswordSignUpFailure: function (payload) {
    this.onPasswordSignInCompleted(payload);
  },

  onPasswordSignIn: function () {
    this.data = {
      canSubmit: false
    };

    this.trigger(this.data);
  },

  onPasswordSignInCompleted: function (payload) {

    sessionStorage.setItem('token', payload.account_key);
    this.data = {
      firstName: payload.first_name,
      lastName: payload.last_name,
      is_active: payload.is_active,
      user: payload.email,
      token: payload.account_key,
      errors: {},
    };

    this.trigger(this.data);
  },

  onPasswordSignInFailure: function (payload) {

    sessionStorage.removeItem('token');
    this.data = this.getInitialState();

    if (typeof payload === 'string') {
      this.data.errors.feedback = payload;
    } else {
      for (var field in payload) {
        this.data.errors[field] = payload[field];
      }
    }

    this.trigger(this.data);
  },

  onLogout: function () {
    sessionStorage.removeItem('token');

    this.data = this.getInitialState();
    this.trigger(this.data);
  },

  // Attaching to instance
  onSetInstanceCompleted: function (payload) {
    this.data.currentInstance = payload;
    this.trigger(this.data)
  },

  onSetInstanceFailure: function () {
    MainStore.router.transitionTo('/404');
  }
});

module.exports = AuthStore;
