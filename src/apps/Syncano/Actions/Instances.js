export default {
  fetchInstances() {
    this.Connection
      .Instances
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  createInstance(payload) {
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

  updateInstance(name, payload) {
    this.Connection
      .Instances
      .update(name, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  removeInstances(names) {
    let promises = names.map(name => {
      return this.Connection.Instances.remove(name);
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  }
};
