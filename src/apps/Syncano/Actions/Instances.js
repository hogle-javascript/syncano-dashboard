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
        name        : payload.name,
        description : payload.description,
        metadata    : payload.metadata
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
    let promises = names.map(name => {
      return this.Connection.Instances.remove(name);
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  set(name) {
    this.Connection
      .setInstance(name)
      .then(this.completed)
      .catch(this.failure)
  }
};
