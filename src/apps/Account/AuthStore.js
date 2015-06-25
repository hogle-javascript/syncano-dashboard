var Reflux         = require('reflux'),

    StoreFormMixin = require('../../mixins/StoreFormMixin'),

    SessionActions = require('../Session/SessionActions'),
    SessionStore   = require('../Session/SessionStore'),
    AuthActions    = require('./AuthActions'),
    AuthConstans   = require('./AuthConstants');


var AuthStore = Reflux.createStore({
  listenables: AuthActions,
  mixins: [StoreFormMixin],

  getInitialState: function () {
    return {
      email           : null,
      password        : null,
      confirmPassword : null
    };
  },

  init: function () {
    this.data = this.getInitialState();
    this.listenTo(SessionStore, this.checkSession);
    this.listenToForms();
  },

  onActivate: function () {
    this.trigger({
      status: 'Account activation in progress...'
    });
  },

  onActivateCompleted: function (payload) {
    this.trigger({
      status: "Account activated successfully. You'll now be redirected to Syncano Dashboard."
    });
    this.onPasswordSignInCompleted(payload);
    setTimeout(function() {
      SessionStore.getRouter().transitionTo(AuthConstans.LOGIN_REDIRECT_PATH);
    }, 3000);
  },

  onActivateFailure: function () {
    this.trigger({
      status: 'Invalid or expired activation link.'
    });
  },

  onPasswordSignUpCompleted: function (payload) {
    this.onPasswordSignInCompleted(payload);
  },

  onPasswordSignInCompleted: function (payload) {
    SessionActions.login(payload);
  },

  onPasswordResetCompleted: function () {
    this.trigger({
      email    : null,
      feedback : 'Check your inbox.'
    });
  },

  onPasswordResetConfirmCompleted: function () {
    this.data = this.getInitialState();
    SessionStore.router.transitionTo('password-update');
  },

  checkSession: function (Session) {
    if (Session.isAuthenticated()) {
      this.trigger(this.data);
    }
  },

  onSocialLoginCompleted: function (payload) {
    console.debug('AuthStore::onSocialLoginCompleted');
    this.onPasswordSignInCompleted(payload);
  }

});

module.exports = AuthStore;
