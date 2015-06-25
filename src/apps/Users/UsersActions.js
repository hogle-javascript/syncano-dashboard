var Reflux     = require('reflux'),

    Connection = require('../Session/Connection').get();


var UsersActions = Reflux.createActions({
  checkItem  : {},
  uncheckAll : {},
  fetch      : {},
  setUsers   : {},
  fetchUsers: {
      asyncResult: true,
      children: ['completed', 'failure']
  },
  createUser: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure']
  },
  updateUser: {
      asyncResult: true,
      asyncForm: true,
      children: ['completed', 'failure']
  },
  removeUsers: {
      asyncResult: true,
      children: ['completed', 'failure']
  }
});

UsersActions.fetchUsers.listen( function() {
  console.info('UsersActions::fetchUsers');
  Connection
    .Users
    .list()
    .then(this.completed)
    .catch(this.failure);
});

UsersActions.createUser.listen( function(payload) {
  console.info('UsersActions::createUser', payload);
  Connection
    .Users
    .create(payload)
    .then(this.completed)
    .catch(this.failure);
});


UsersActions.updateUser.listen( function(id, payload) {
  console.info('UsersActions::updateUser');
  Connection
    .Users
    .update(id, payload)
    .then(this.completed)
    .catch(this.failure);
});

UsersActions.removeUsers.listen( function(schedules) {
  schedules.map(function(schedule) {
    console.info('UsersActions::removeUsers');
    Connection
      .Users
      .remove(schedule.id)
      .then(this.completed)
      .catch(this.failure);
  }.bind(this));
});

module.exports = UsersActions;