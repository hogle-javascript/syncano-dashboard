var Reflux         = require('reflux'),

    StoreFormMixin = require('../../mixins/StoreFormMixin'),

    SessionActions = require('../Session/SessionActions'),
    SessionStore   = require('../Session/SessionStore'),
    AuthActions    = require('./AuthActions');


var AuthStore = Reflux.createStore({
  listenables: AuthActions,
  mixins: [StoreFormMixin],

  getInitialState: function () {
    return this.data;
  },

  init: function () {
    this.data.email    = null;
    this.data.password = null;
    this.listenTo(SessionStore, this.checkSession);
    this.listenToForms();
  },

  onActivate: function () {
    this.data.status = 'Account activation in progress...';
    this.trigger(this.data);
  },

  onActivateCompleted: function () {
    this.data.status = 'Account activated successfully.';
    this.trigger(this.data);
  },

  onActivateFailure: function () {
    this.data.status = 'Invalid or expired activation link.'
    this.trigger(this.data);
  },

  onPasswordSignUpCompleted: function (payload) {
    this.onPasswordSignInCompleted(payload);
  },

  onPasswordSignInCompleted: function (payload) {
    SessionActions.login(payload);
    this.trigger(this.data);
  },

  onPasswordResetCompleted: function () {
    this.data.feedback = 'Check your inbox.';
    this.data.email    = null;
    this.trigger(this.data);
  },

  onPasswordResetConfirmCompleted: function () {
    this.data.feedback        = 'Password changed successfully';
    this.data.password        = null;
    this.data.confirmPassword = null;
    this.trigger(this.data);
  },

  checkSession: function (Session) {
    if (Session.isAuthenticated()) {
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
