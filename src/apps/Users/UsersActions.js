import Reflux from 'reflux';
import Syncano from '../Session/Connection';
import _ from 'lodash';

let Connection = Syncano.get(),
    D          = Syncano.D;

let UsersActions = Reflux.createActions({
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

  let userGroups      = groups.newGroups ? groups.newGroups : null,
      userGroupsArray = _.isArray(userGroups) ? userGroups : [userGroups];

  if (userGroups) {
    Connection
      .Users
      .create(payload)
      .then(user => {
        let addUserToGroups = userGroupsArray.map(group => UsersActions.addToGroup(user.id, group.id));

        D.all(addUserToGroups)
          .success(this.completed)
          .error(this.failure);
      })
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

  Connection
    .Users
    .update(id, payload)
    .success(() => {
      let groupsId             = groups.groups.map(group => group.id),
          newGroupsId          = groups.newGroups.map(group => group.id),
          addedGroups          = _.difference(newGroupsId, groupsId),
          removedGroups        = _.difference(groupsId, newGroupsId),
          addUserToGroups      = addedGroups.map(group => UsersActions.addToGroup(id, group)),
          removeUserFromGroups = removedGroups.map(group => UsersActions.removeFromGroup(id, group)),
          promises             = removeUserFromGroups.concat(addUserToGroups);

      D.all(promises)
        .success(this.completed)
        .error(this.failure);
    })
    .error(this.failure);
});

UsersActions.removeUsers.listen(function(users) {
  console.info('UsersActions::removeUsers');
  let promises = users.map(user => Connection.Users.remove(user.id));

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

export default UsersActions;
