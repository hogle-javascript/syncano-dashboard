var alt     = require('../../alt');
    Syncano = require('../../lib/syncano4');


function AuthActions() {

};

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