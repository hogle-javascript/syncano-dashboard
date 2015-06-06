var Reflux         = require('reflux'),

    SessionActions = require('../Session/SessionActions'),
    SessionStore   = require('../Session/SessionStore'),
    AuthActions    = require('./AuthActions');


var AuthStore = Reflux.createStore({
  listenables: AuthActions,

  getInitialState: function () {
    return {
      canSubmit: true,
      errors: {},
    }
  },

  init: function () {
    this.data = {
      errors: {},
      email: null,
      password: null,
      canSubmit: true,
    };

    this.listenTo(SessionStore, this.checkSession);
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
    this.data = {
      canSubmit: false
    };

    SessionActions.login(payload);
    this.trigger(this.data);
  },

  onPasswordSignInFailure: function (payload) {
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

  checkSession: function (session) {
    if (session.isAuthenticated()) {
      this.trigger(this.data);
    }
  },

});

module.exports = AuthStore;
