import _ from 'lodash';

export default {
  list(params = {}) {
    _.defaults(params, {ordering: 'desc'});
    this.Connection
      .Users
      .list(params)
      .then(this.completed)
      .catch(this.failure);
  },

  create(payload, groups) {
    const userGroups = groups.newGroups ? groups.newGroups : null;
    const userGroupsArray = _.isArray(userGroups) ? userGroups : [userGroups];

    if (userGroups) {
      this.Connection
        .Users
        .create(payload)
        .then((user) => {
          const addUserToGroups = userGroupsArray.map((group) => this.Connection.Users.addToGroup(user.id, group.id));

          this.Promise.all(addUserToGroups)
            .then(this.completed)
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

  update(id, payload, groups) {
    this.Connection
      .Users
      .update(id, payload)
      .success(() => {
        const groupsId = groups.groups.map((group) => group.id);
        const newGroupsId = groups.newGroups.map((group) => group.id);
        const addedGroups = _.difference(newGroupsId, groupsId);
        const removedGroups = _.difference(groupsId, newGroupsId);
        const addUserToGroups = addedGroups.map((group) => this.Connection.Users.addToGroup(id, group));
        const removeUserFromGroups = removedGroups.map((group) => this.Connection.Users.removeFromGroup(id, group));
        const promises = removeUserFromGroups.concat(addUserToGroups);

        this.Promise.all(promises)
          .then(this.completed)
          .error(this.failure);
      })
      .error(this.failure);
  },

  remove(users) {
    const promises = users.map((user) => this.Connection.Users.remove(user.id));

    this.Promise.all(promises)
      .then(this.completed)
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

  listUserGroups(user) {
    this.Connection
      .Users
      .getUserGroups(user)
      .then(this.completed)
      .catch(this.failure);
  }
};
