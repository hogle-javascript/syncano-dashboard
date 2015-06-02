var alt         = require('../../alt'),
    AuthActions = require('./AuthActions');


function AuthStore() {
  this.token     = sessionStorage.getItem('token');
  this.user      = null;
  this.errors    = {};
  this.email     = null;
  this.password  = null;
  this.canSubmit = true;

  this.bindListeners({
      handlePasswordSignIn: AuthActions.PASSWORD_SIGN_IN,
      handlePasswordSignInSucceeded: AuthActions.PASSWORD_SIGN_IN_SUCCEEDED,
      handlePasswordSignInFailed: AuthActions.PASSWORD_SIGN_IN_FAILED,
      handleLogout: AuthActions.LOGOUT,
  });
};

AuthStore.prototype.handlePasswordSignIn = function (payload) {
  this.errors    = {};
  this.email     = payload.email;
  this.password  = payload.password;
  this.canSubmit = false;
};

AuthStore.prototype.handlePasswordSignInSucceeded = function (payload) {
  this.token     = payload.account_key;
  this.user      = payload;
  this.errors    = {};
  this.email     = null;
  this.password  = null;
  this.canSubmit = true;

  sessionStorage.setItem('token', payload.account_key);
};

AuthStore.prototype.handlePasswordSignInFailed = function (payload) {
  this.token     = null;
  this.user      = null;
  this.errors    = {};
  this.canSubmit = true;

  sessionStorage.removeItem('token');


  if (typeof payload === 'string') {
    this.errors.feedback = payload;
  } else {
    for (var field in payload) {
      this.errors[field] = payload[field];
    }
  }
};

AuthStore.prototype.handleLogout = function () {
  this.token         = null;
  this.user          = null;
  this.errors        = {};
  this.email         = null;
  this.emailError    = null;
  this.password      = null;
  this.passwordError = null;

  sessionStorage.removeItem('token');
};

module.exports = alt.createStore(AuthStore);