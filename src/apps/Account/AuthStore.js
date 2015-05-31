var alt         = require('../../alt'),
    AuthActions = require('./AuthActions');


function AuthStore() {
  this.token         = null;
  this.user          = null;
  this.error         = null;
  this.email         = null;
  this.emailError    = null;
  this.password      = null;
  this.passwordError = null;
  this.isLoading     = false;

  this.bindListeners({
      handlePasswordSignIn: AuthActions.PASSWORD_SIGN_IN,
      handlePasswordSignInSucceeded: AuthActions.PASSWORD_SIGN_IN_SUCCEEDED,
      handlePasswordSignInFailed: AuthActions.PASSWORD_SIGN_IN_FAILED,
      handleLogout: AuthActions.LOGOUT,
  });
};

AuthStore.prototype.handlePasswordSignIn = function (payload) {
  this.error         = null;
  this.emailError    = null;
  this.passwordError = null;
  this.email         = payload.email;
  this.password      = payload.password;
  this.isLoading     = true;
  console.log('handlePasswordSignIn', payload);
};

AuthStore.prototype.handlePasswordSignInSucceeded = function (payload) {
  this.token         = payload.payload.account_key;
  this.user          = payload;
  this.error         = null;
  this.email         = null;
  this.emailError    = null;
  this.password      = null;
  this.passwordError = null;
  this.isLoading     = false;
  console.log('handlePasswordSignInSucceeded', payload);
};

AuthStore.prototype.handlePasswordSignInFailed = function (payload) {
  this.isLoading = false;
  console.log('handlePasswordSignInFailed', payload);
};

AuthStore.prototype.handleLogout = function () {
  this.token         = null;
  this.user          = null;
  this.error         = null;
  this.email         = null;
  this.emailError    = null;
  this.password      = null;
  this.passwordError = null;
};

AuthStore.prototype.isAuthenticated = function () {
  return !!this.token;
};

module.exports = alt.createStore(AuthStore);