var Reflux     = require('reflux'),
    Connection = require('../Session/Connection').get();


// TODO: https://github.com/spoike/refluxjs/issues/296
var AuthActions = Reflux.createActions({
  'activate': {
      asyncResult: true,
      children: ['completed', 'failure']
  },
  'passwordSignIn': {
      asyncResult: true,
      children: ['completed', 'failure']
  },
  'passwordSignUp': {
      asyncResult: true,
      children: ['completed', 'failure']
  },
  'passwordReset': {
      asyncResult: true,
      children: ['completed', 'failure']
  },
  'passwordResetConfirm': {
      asyncResult: true,
      children: ['completed', 'failure']
  },
});

AuthActions.activate.listen(function (payload) {
  Connection
    .Accounts
    .activate(payload)
    .then(this.completed)
    .catch(this.failure);
});

AuthActions.passwordSignIn.listen(function (payload) {
  Connection
    .connect(payload.email, payload.password)
    .then(this.completed)
    .catch(this.failure);
});

AuthActions.passwordSignUp.listen(function (payload) {
  Connection
    .Accounts
    .create({
      email: payload.email,
      password: payload.password
    })
    .then(this.completed)
    .catch(this.failure);
});

AuthActions.passwordReset.listen(function (email) {
  Connection
    .Accounts
    .passwordReset(email)
    .then(this.completed)
    .catch(this.failure);
});

AuthActions.passwordResetConfirm.listen(function (payload) {
  Connection
    .Accounts
    .passwordResetConfirm(payload)
    .then(this.completed)
    .catch(this.failure);
});

module.exports = AuthActions;