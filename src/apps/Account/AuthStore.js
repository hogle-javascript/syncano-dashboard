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

  onActivate: function () {
    this.data = {
      status: 'Account activation in progress...'
    };
    this.trigger(this.data);
  },

  onActivateCompleted: function () {
    this.data = {
      status: 'Account activated successfully.'
    };
    this.trigger(this.data);
  },

  onActivateFailure: function () {
    this.data = {
      status: 'Invalid or expired activation link.'
    };
    this.trigger(this.data);
  },

  onPasswordSignUp: function () {
    this.onPasswordSignIn();
  },

  onPasswordSignUpCompleted: function (payload) {
    this.onPasswordSignInCompleted(payload);
  },

  onPasswordSignUpFailure: function (payload) {
    this.onPasswordSignInFailure(payload);
  },

  onPasswordSignIn: function () {
    this.data = {
      canSubmit: false
    };

    this.trigger(this.data);
  },

  onPasswordSignInCompleted: function (payload) {
    this.data = {
      canSubmit: true
    };

    SessionActions.login(payload);
    this.trigger(this.data);
  },

  onPasswordSignInFailure: function (payload) {
    this.data = this.getInitialState();

    if (typeof payload === 'string') {
      this.data.errors.feedback = payload;
    } else {
      if (payload.non_field_errors !== undefined) {
        this.data.errors.feedback = payload.non_field_errors.join();
      }

      for (var field in payload) {
        this.data.errors[field] = payload[field];
      }
    }

    this.trigger(this.data);
  },

  onPasswordReset: function () {
    this.onPasswordSignIn();
  },

  onPasswordResetCompleted: function () {
    this.data = {
      canSubmit: true,
      email: null,
      feedback: 'Check your inbox.'
    };
    this.trigger(this.data);
  },

  onPasswordResetFailure: function (payload) {
    this.onPasswordSignInFailure(payload);
  },

  onPasswordResetConfirm: function () {
    this.onPasswordSignIn();
  },

  onPasswordResetConfirmCompleted: function () {
    this.data = {
      canSubmit: true,
      password: null,
      confirmPassword: null,
      feedback: 'Password changed successfully'
    };
    this.trigger(this.data);
  },

  onPasswordResetConfirmFailure: function (payload) {
    this.onPasswordSignInFailure(payload);
  },

  checkSession: function (session) {
    if (session.isAuthenticated()) {
      this.trigger(this.data);
    }
  },

  onSocialLoginCompleted: function (payload) {
    this.onPasswordSignInCompleted(payload);
  },

  onSocialLoginFailure: function (error) {
    console.error('AuthStore::onSocialLoginFailure', error);
  },

});

module.exports = AuthStore;
