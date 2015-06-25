var Reflux     = require('reflux'),
    Connection = require('./Connection').get();


var SessionActions = Reflux.createActions({
  login       : {},
  logout      : {},
  setToken    : {},
  setRouter   : {},
  setUser     : {},
  setTheme    : {},
  setInstance : {},
  fetchUser: {
    asyncResult : true,
    children    : ['completed', 'failure']
  },
  fetchInstance: {
      asyncResult : true,
      children    : ['completed', 'failure']
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

SessionActions.fetchInstance.listen(function (name) {
  console.info('SessionActions::fetchInstance');
  Connection
    .setInstance(name)
    .then(this.completed)
    .catch(this.failure)
});

module.exports = SessionActions;