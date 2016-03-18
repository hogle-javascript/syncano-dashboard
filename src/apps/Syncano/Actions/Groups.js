import _ from 'lodash';

export default {
  create(label) {
    this.Connection
      .Groups
      .create(label)
      .then(this.completed)
      .catch(this.failure);
  },

  list(params = {}) {
    _.defaults(params, {ordering: 'desc'});
    this.Connection
      .Groups
      .list(params)
      .then(this.completed)
      .catch(this.failure);
  },

  update(id, payload) {
    this.Connection
      .Groups
      .update(id, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  remove(ids) {
    const promises = ids.map((id) => this.Connection.Groups.remove(id));

    this.Promise.all(promises)
      .then(this.completed)
      .error(this.failure);
  },

  listUsers(groupId) {
    this.Connection
      .Groups
      .getUsers(groupId)
      .then(this.completed)
      .catch(this.failure);
  }
};
