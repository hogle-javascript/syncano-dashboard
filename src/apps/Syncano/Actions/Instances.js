import _ from 'lodash';

export default {
  list(params = {}) {
    _.defaults(params, {ordering: 'desc'});
    this.Connection
      .Instances
      .list(params)
      .then(this.completed)
      .catch(this.failure);
  },

  create(payload) {
    this.Connection
      .Instances
      .create({
        name: payload.name,
        description: payload.description,
        metadata: payload.metadata
      })
      .then(this.completed)
      .catch(this.failure);
  },

  update(name, payload) {
    this.Connection
      .Instances
      .update(name, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  rename(name, payload) {
    this.Connection
      .Instances
      .rename(name, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  renameAndUpdate(name, newName, payload) {
    this.Connection
      .Instances
      .rename(name, {new_name: newName})
      .then(() => {
        this.Connection
          .Instances
          .update(newName, payload)
          .then(this.completed)
          .catch(this.failure);
      })
      .catch(this.failure);
  },

  remove(names) {
    const promises = _.map(names, this.Connection.Instances.remove);

    this.Promise.all(promises)
      .then(this.completed)
      .error(this.failure);
  },

  removeShared(names, adminId) {
    const promises = _.map(names, (name) => this.Connection.Instances.removeShared(name, adminId));

    this.Promise.all(promises)
      .then(this.completed)
      .error(this.failure);
  },

  set(name) {
    this.Connection
      .setInstance(name)
      .then(this.completed)
      .catch(this.failure);
  }
};
