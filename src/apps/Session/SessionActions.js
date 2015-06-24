var Reflux     = require('reflux'),
    Connection = require('./Connection').get();


var SessionActions = Reflux.createActions({
  'login': {},
  'fetchUser': {
    asyncResult: true,
    children: ['completed', 'failure']
  },
  'logout': {},
  'registerRouter': {},
  'registerUser': {},
  'registerTheme': {},
  'registerInstance': {
      asyncResult: true,
      children: ['completed', 'failure']
  }
});

SessionActions.fetchUser.listen(function (token) {
  console.info('SessionActions::fetchUser');

  Connection
    .setApiKey(token)
    .Accounts
    .get()
    .then(this.completed)
    .catch(this.failure)
});

SessionActions.registerInstance.listen(function (name) {
  console.info('SessionActions::registerInstance');
  Connection
    .setInstance(name)
    .then(this.completed)
    .catch(this.failure)
});

module.exports = SessionActions;