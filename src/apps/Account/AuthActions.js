var Reflux    = require('reflux'),

    MainStore = require('../Main/MainStore');


// TODO: https://github.com/spoike/refluxjs/issues/296
var AuthActions = Reflux.createActions({
  'logout': {},
  'passwordSignIn': {
      asyncResult: true,
      children: ['completed', 'failure']
  },
  'passwordSignUp': {
      asyncResult: true,
      children: ['completed', 'failure']
  },
  'setInstance': {
      asyncResult: true,
      children: ['completed', 'failure']
  },
  'apiKeySignIn': {
      asyncResult: true,
      children: ['completed', 'failure']
  },
});

AuthActions.passwordSignIn.listen(function (payload) {
  MainStore
    .connection
    .connect(payload.email, payload.password)
    .then(this.completed)
    .catch(this.failure)
});

AuthActions.passwordSignUp.listen(function (payload) {
  MainStore
    .Accounts
    .create(payload.email, payload.password)
    .then(this.completed)
    .catch(this.failure)
});

AuthActions.setInstance.listen(function (name) {
  MainStore
    .connection
    .setInstance(name)
    .then(this.completed)
    .catch(this.failure)
});

AuthActions.apiKeySignIn.listen(function (apiKey) {
  MainStore
    .connection
    .connect(apiKey)
    .then(this.completed)
    .catch(this.failure)
});

module.exports = AuthActions;