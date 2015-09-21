import _ from 'lodash';

export default {
  list() {
    this.Connection
      .Instances
      .list()
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

  remove(names) {
    if (_.isArray(names)) {
      let promises = _.map(names, this.Connection.Instances.remove);

      this.D.all(promises)
        .success(this.completed)
        .error(this.failure);
    }

    if (_.isString(names)) {
      this.Connection
        .Instances
        .remove(names)
        .then(this.completed)
        .catch(this.failure);
    }
  },

  removeShared(names, adminId) {
    if (_.isArray(names)) {
      let promises = _.map(names, (name) => this.Connection.Instances.removeShared(name, adminId));

      this.D.all(promises)
        .success(this.completed)
        .error(this.failure);
    }

    if (_.isString(names)) {
      this.Connection
        .Instances
        .removeShared(names, adminId)
        .then(this.completed)
        .catch(this.failure);
    }
  },

  set(name) {
    this.Connection
      .setInstance(name)
      .then(this.completed)
      .catch(this.failure)
  }
};
