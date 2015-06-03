var alt     = require('../../alt');
    Syncano = require('../../lib/syncano4');


// TODO: make this code more DRY
function AuthActions() {

};

// TODO: Change this Source http://alt.js.org/docs/async/
AuthActions.prototype.passwordSignUp = function (payload) {
  this.dispatch(payload);

  new Syncano().Accounts.create({
      email: payload.email,
      password: payload.password
    }).then(
      this.actions.passwordSignUpSucceeded,
      this.actions.passwordSignUpFailed
    );

};

AuthActions.prototype.passwordSignUpSucceeded = function (payload) {
  this.dispatch(payload);
};

AuthActions.prototype.passwordSignUpFailed = function (error) {
  this.dispatch(error);
};

// TODO: Change this Source http://alt.js.org/docs/async/
AuthActions.prototype.passwordSignIn = function (payload) {
  this.dispatch(payload);

  new Syncano().connect(
    payload.email,
    payload.password,
    this.actions.passwordSignInSucceeded,
    this.actions.passwordSignInFailed
  );

};

AuthActions.prototype.passwordSignInSucceeded = function (payload) {
  this.dispatch(payload);
};

AuthActions.prototype.passwordSignInFailed = function (error) {
  this.dispatch(error);
};

AuthActions.prototype.logout = function () {
  this.dispatch();
};

module.exports = alt.createActions(AuthActions);