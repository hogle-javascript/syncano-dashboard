export default {
  createGroup(label) {
    this.Connection
      .Groups
      .create(label)
      .then(this.completed)
      .catch(this.failure);
  },

  fetchGroups() {
    this.Connection
      .Groups
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  updateGroup(id, payload) {
    this.Connection
      .Groups
      .update(id, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  removeGroups(ids) {

    let promises = ids.map(id => {
      return this.Connection.Groups.remove(id);
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  fetchGroupUsers(groupId) {
    this.Connection
      .Groups
      .getUsers(groupId)
      .then(this.completed)
      .catch(this.failure);
  }
};
