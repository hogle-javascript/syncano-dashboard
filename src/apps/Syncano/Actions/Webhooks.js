export default {
  createWebhook(payload) {
    this.Connection
      .WebHooks
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  fetchWebhooks() {
    this.Connection
      .WebHooks
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  updateWebhook(id, payload) {
    this.Connection
      .WebHooks
      .update(id, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  removeWebhooks(ids) {

    let promises = ids.map(id => {
      return this.Connection.WebHooks.remove(id);
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  fetchCurrentClassObj(className) {
    this.Connection
      .Classes
      .get(className)
      .then(this.completed)
      .catch(this.failure);
  }
};
