import _ from 'lodash';

export default {
  list() {
    this.NewLibConnection
      .Instance
      .please()
      .list()
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  },

  create(payload) {
    this.NewLibConnection
      .Instance
      .please()
      .create({
        name: payload.name,
        description: payload.description,
        metadata: payload.metadata
      })
      .then(this.completed)
      .catch(this.failure);
  },

  update(name, payload) {
    const {description, metadata} = payload;

    this.NewLibConnection
      .Instance
      .please()
      .update({name}, {description, metadata})
      .then(this.completed)
      .catch(this.failure);
  },

  rename(name, newName) {
    this.NewLibConnection
      .Instance
      .please()
      .rename({name}, {new_name: newName})
      .then(this.completed)
      .catch(this.failure);
  },

  renameAndUpdate(name, newName, payload) {
    const {description, metadata} = payload;

    this.NewLibConnection
      .Instance
      .please()
      .rename({name}, {new_name: newName})
      .then(() => {
        this.NewLibConnection
          .Instance
          .please()
          .update({name: newName}, {description, metadata})
          .then(this.completed)
          .catch(this.failure);
      })
      .catch(this.failure);
  },

  remove(instances) {
    const promises = _.map(instances, (instance) =>
      this.NewLibConnection
        .Instance
        .please()
        .delete({name: instance.name}));

    this.Promise.all(promises)
      .then(this.completed)
      .catch(this.failure);
  },

  removeShared(names, adminId) {
    const promises = _.map(names, (name) => this.Connection.Instances.removeShared(name, adminId));

    this.Promise.all(promises)
      .then(this.completed)
      .catch(this.failure);
  },

  set(name) {
    this.NewLibConnection.setInstanceName(name);
    this.NewLibConnection
      .Instance
      .please()
      .get({name})
      .then(this.completed)
      .catch(this.failure);
    this.Connection.setInstance(name);
  }
};
