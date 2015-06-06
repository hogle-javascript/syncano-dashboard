var Reflux     = require('reflux'),
    Connection = require('./Connection').get();


var SessionActions = Reflux.createActions({
  'login': {},
  'tokenLogin': {
    asyncResult: true,
    children: ['completed', 'failure'],
  },
  'logout': {},
  'registerRouter': {},
  'setInstance': {
      asyncResult: true,
      children: ['completed', 'failure'],
  }
});

SessionActions.tokenLogin.listen(function (token) {
  Connection
    .connect(token)
    .then(this.completed)
    .catch(this.failure)
});

SessionActions.setInstance.listen(function (name) {
  Connection
    .setInstance(name)
    .then(this.completed)
    .catch(this.failure)
});

module.exports = SessionActions;