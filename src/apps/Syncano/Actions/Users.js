import _ from 'lodash';

export default {
  fetchUsers() {
    this.Connection
      .Users
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  createUser(payload, groups) {

    if (groups.newGroups) {
      this.Connection
        .Users
        .create(payload)
        .then(user => {
          let addUserToGroups = groups.newGroups.map(group => {
            return addToGroup(user.id, group.id);
          });

          this.D.all(addUserToGroups)
            .success(this.completed)
            .error(this.failure);
        })
        .catch(this.failure);
    } else {
      this.Connection
        .Users
        .create(payload)
        .then(this.completed)
        .catch(this.failure);
    }
  },

  updateUser(id, payload, groups) {

    let addedGroups = _.difference(groups.newGroups, groups.groups),
      removedGroups = _.difference(groups.groups, groups.newGroups),
      addUserToGroups = addedGroups.map(group => {
        return addToGroup(id, group);
      });

    getUserGroups(id).then(groups => {
      let userGroups = Object.keys(groups).map(key => {
        return groups[key];
      });

      let removeUserFromGroups = removedGroups.map(group => {
        let userGroupId = _.findIndex(userGroups, userGroup => {
          return userGroup.group.id === group.id
        });

        return removeFromGroup(id, userGroups[userGroupId].id);
      });

      this.D.all(removeUserFromGroups, addUserToGroups)
        .success(this.completed)
        .error(this.failure);
    });
  },

  removeUsers(users) {

    let promises = users.map(user => {
      return this.Connection.Users.remove(user.id);
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  addToGroup(user, group) {
    this.Connection
      .Users
      .addToGroup(user, group)
      .then(this.completed)
      .catch(this.failure);
  },

  removeFromGroup(user, group) {
    this.Connection
      .Users
      .removeFromGroup(user, group)
      .then(this.completed)
      .catch(this.failure);
  },

  getUserGroups(user) {
    this.Connection
      .Users
      .getUserGroups(user)
      .then(this.completed)
      .catch(this.failure);
  }
};
