var Reflux    = require('reflux'),

    MainStore = require('../Main/MainStore');


var AuthActions = Reflux.createActions({
  'logout': {},
  'passwordSignIn': {
      asyncResult: true,
      children: ['completed', 'failed']
  },
  'passwordSignUp': {
      asyncResult: true,
      children: ['completed', 'failed']
  },
  'setInstance': {
      asyncResult: true,
      children: ['completed', 'failed']
  },
  'apiKeySignIn': {
      asyncResult: true,
      children: ['completed', 'failed']
  },
});

AuthActions.passwordSignIn.listen(function (payload) {
  AuthActions.passwordSignIn.promise(
    MainStore.connection.connect(payload.email, payload.password)
  );
});

AuthActions.passwordSignUp.listen(function (payload) {
  AuthActions.passwordSignUp.promise(
    MainStore.connection.Accounts.create(payload)
  );
});

AuthActions.setInstance.listen(function (name) {
  AuthActions.passwordSignIn.promise(
    MainStore.connection.setInstance(name)
  );
});

AuthActions.apiKeySignIn.listen(function (apiKey) {
  AuthActions.passwordSignIn.promise(
    MainStore.connection.connect(apiKey)
  );
});

module.exports = AuthActions;