export default {
  fetchApiKeys() {
    this.Connection
      .ApiKeys
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  createApiKey(payload) {
    this.Connection
      .ApiKeys
      .create({
        description       : payload.description,
        allow_user_create : payloathis.d.allow_user_create,
        ignore_acl        : payload.ignore_acl
      })
      .then(this.completed)
      .catch(this.failure);
  },

  updateApiKey(name, payload) {
    this.Connection
      .ApiKeys
      .update(name, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  removeApiKeys(names) {
    names.map(name => {
      this.Connection
        .ApiKeys
        .remove(name)
        .then(this.completed)
        .catch(this.failure);
    });
  },

  resetApiKey(id) {
    this.Connection
      .ApiKeys
      .reset(id)
      .then(this.completed)
      .catch(this.failure);
  }
};
