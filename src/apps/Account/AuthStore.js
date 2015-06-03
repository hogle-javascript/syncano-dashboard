var alt         = require('../../alt'),
    AuthActions = require('./AuthActions');


// TODO: make this code more DRY
function AuthStore() {
  this.token     = sessionStorage.getItem('token') || null;
  this.user      = null;
  this.errors    = {};
  this.email     = null;
  this.password  = null;
  this.canSubmit = true;

  this.bindListeners({
      handlePasswordSignIn: AuthActions.PASSWORD_SIGN_IN,
      handlePasswordSignInSucceeded: AuthActions.PASSWORD_SIGN_IN_SUCCEEDED,
      handlePasswordSignInFailed: AuthActions.PASSWORD_SIGN_IN_FAILED,
      handlePasswordSignUp: AuthActions.PASSWORD_SIGN_UP,
      handlePasswordSignUpSucceeded: AuthActions.PASSWORD_SIGN_UP_SUCCEEDED,
      handlePasswordSignUpFailed: AuthActions.PASSWORD_SIGN_UP_FAILED,
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

AuthStore.prototype.handlePasswordSignUp = function (payload) {
  this.errors    = {};
  this.email     = payload.email;
  this.password  = payload.password;
  this.canSubmit = false;
};

AuthStore.prototype.handlePasswordSignUpSucceeded = function (payload) {
  this.token     = payload.account_key || null;
  this.user      = payload;
  this.errors    = {};
  this.email     = null;
  this.password  = null;
  this.canSubmit = true;

  if (this.token !== null) {
    sessionStorage.setItem('token', this.token);
  }
};

AuthStore.prototype.handlePasswordSignUpFailed = function (payload) {
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