var Reflux    = require('reflux'),

    MainStore = require('../Main/MainStore');


var AuthActions = Reflux.createActions([
  "logout",
]);

AuthActions.passwordSignIn = Reflux.createAction({asyncResult: true, children: ['completed', 'failure']});
AuthActions.passwordSignIn.listen(function (payload) {

  MainStore.connection.connect(payload.email, payload.password)
    .then(this.completed)
    .catch(this.failure);
});

AuthActions.setInstance = Reflux.createAction({asyncResult: true, children: ['completed', 'failure']});
AuthActions.setInstance.listen(function (name) {

  MainStore.connection.setInstance(name)
    .then(this.completed)
    .catch(this.failure);
});

AuthActions.apiKeySignIn = Reflux.createAction({asyncResult: true, children: ['completed', 'failure']});
AuthActions.apiKeySignIn.listen(function (apiKey) {

  MainStore.connection.connect(apiKey)
    .then(this.completed)
    .catch(this.failure);
});

module.exports = AuthActions;