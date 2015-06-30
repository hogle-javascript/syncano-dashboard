var Reflux     = require('reflux'),
    Syncano    = require('../Session/Connection'),
    Connection = Syncano.get(),
    D          = Syncano.D;

var UsersActions = Reflux.createActions({
  checkItem     : {},
  uncheckAll    : {},
  fetch         : {},
  setUsers      : {},
  showDialog    : {},
  dismissDialog : {},
  fetchUsers: {
    asyncResult: true,
    loading    : true,
    children   : ['completed', 'failure']
  },
  createUser: {
    asyncResult : true,
    asyncForm   : true,
    loading     : true,
    children    : ['completed', 'failure']
  },
  updateUser: {
    asyncResult : true,
    asyncForm   : true,
    loading     : true,
    children    : ['completed', 'failure']
  },
  removeUsers: {
    asyncResult : true,
    loading     : true,
    children    : ['completed', 'failure']
  }
});

UsersActions.fetchUsers.listen(function() {
  console.info('UsersActions::fetchUsers');
  Connection
    .Users
    .list()
    .then(this.completed)
    .catch(this.failure);
});

UsersActions.createUser.listen(function(payload) {
  console.info('UsersActions::createUser', payload);
  Connection
    .Users
    .create(payload)
    .then(this.completed)
    .catch(this.failure);
});

UsersActions.updateUser.listen(function(id, payload) {
  console.info('UsersActions::updateUser');
  Connection
    .Users
    .update(id, payload)
    .then(this.completed)
    .catch(this.failure);
});

UsersActions.removeUsers.listen(function(users) {
  console.info('UsersActions::removeUsers');
  var promises = users.map(function(user) {
    return Connection.Users.remove(user.id);
  });

  D.all(promises)
    .success(this.completed)
    .error(this.failure);
});

module.exports = UsersActions;
