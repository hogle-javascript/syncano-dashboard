var Reflux     = require('reflux'),
    Syncano    = require('../Session/Connection'),
    Connection = Syncano.get(),
    D          = Syncano.D,
    _          = require('lodash');

var UsersActions = Reflux.createActions({
  checkItem     : {},
  uncheckAll    : {},
  selectAll     : {},
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
  },
  addToGroup: {
    asyncResult : true,
    loading     : true,
    children    : ['completed', 'failure']
  },
  removeFromGroup: {
    asyncResult : true,
    loading     : true,
    children    : ['completed', 'failure']
  },
  getUserGroups: {
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

UsersActions.createUser.listen(function(payload, groups) {
  console.debug('UsersActions::createUser', payload, groups);

  if (groups.newGroups) {
    Connection
      .Users
      .create(payload)
      .then(function(user) {
        var addUserToGroups = groups.newGroups.map(function(group) {
          return UsersActions.addToGroup(user.id, group);
        });

        D.all(addUserToGroups)
          .success(this.completed)
          .error(this.failure);
      }.bind(this))
      .catch(this.failure);
  } else {
    Connection
      .Users
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  }
});

UsersActions.updateUser.listen(function(id, payload, groups) {
  console.info('UsersActions::updateUser');
  console.error('updateUserPayload', payload);
  console.error('updateUserGroups', groups);

  var addedGroups     = _.difference(groups.newGroups, groups.groups),
      removedGroups   = _.difference(groups.groups, groups.newGroups),
      addUserToGroups = addedGroups.map(function(group) {
        return UsersActions.addToGroup(id, group);
      });

  UsersActions.getUserGroups(id).then(function(groups) {
    console.error('userGroupsData', groups);
    var userGroups = Object.keys(groups).map(function(key) {
      return groups[key];
    });

    var removeUserFromGroups = removedGroups.map(function(group) {
      var userGroupId = _.findIndex(userGroups, function(userGroup) {
        return userGroup.group.id === group.id
      });

      return UsersActions.removeFromGroup(id, userGroups[userGroupId]);
    });

    D.all(removeUserFromGroups, addUserToGroups)
      .success(this.completed)
      .error(this.failure);
  }.bind(this));
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

UsersActions.addToGroup.listen(function(user, group) {
  console.info('UsersActions::addToGroup');
  Connection
    .Users
    .addToGroup(user, group)
    .then(this.completed)
    .catch(this.failure);
});

UsersActions.removeFromGroup.listen(function(user, group) {
  console.info('UsersActions::removeFromGroup');
  Connection
    .Users
    .removeFromGroup(user, group)
    .then(this.completed)
    .catch(this.failure);
});

UsersActions.getUserGroups.listen(function(user) {
  console.info('UsersActions::getUserGroups');
  Connection
    .Users
    .getUserGroups(user)
    .then(this.completed)
    .catch(this.failure);
});

module.exports = UsersActions;
