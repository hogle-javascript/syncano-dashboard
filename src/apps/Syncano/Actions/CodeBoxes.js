export default {
  get(codeboxName) {
    this.Connection
      .WebHooks
      .get(codeboxName)
      .then(this.completed)
      .catch(this.failure);
  },

  create(payload) {
    this.Connection
      .WebHooks
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  list() {
    this.Connection
      .WebHooks
      .list({ordering: 'desc'})
      .then(this.completed)
      .catch(this.failure);
  },

  update(id, payload) {
    this.Connection
      .WebHooks
      .update(id, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  remove(ids) {
    let promises = ids.map((id) => this.Connection.WebHooks.remove(id));

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  listTraces(codeboxId) {
    this.Connection
      .WebHooks
      .traces(codeboxId, {ordering: 'desc'})
      .then(this.completed)
      .catch(this.failure);
  }
};
