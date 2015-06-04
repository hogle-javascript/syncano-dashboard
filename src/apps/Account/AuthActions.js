var Reflux    = require('reflux'),

    MainStore = require('../Main/MainStore');


var AuthActions = Reflux.createActions({
  'logout': {},
  'passwordSignIn': {
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
  AuthActions.passwordSignIn.promise(
    MainStore.connection.connect(payload.email, payload.password)
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