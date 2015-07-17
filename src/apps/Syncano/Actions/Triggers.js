export default {
  createTrigger(payload) {
    this.Connection
      .Triggers
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  fetchTriggers() {
    this.Connection
      .Triggers
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  updateTrigger(id, payload) {
    this.Connection
      .Triggers
      .update(id, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  removeTriggers(ids) {

    let promises = ids.map(id => {
      return this.Connection.Triggers.remove(id);
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  }
};
