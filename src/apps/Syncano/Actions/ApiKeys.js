export default {
  list() {
    this.Connection
      .ApiKeys
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  create(payload) {
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

  update(name, payload) {
    this.Connection
      .ApiKeys
      .update(name, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  remove(names) {
    names.map(name => {
      this.Connection
        .ApiKeys
        .remove(name)
        .then(this.completed)
        .catch(this.failure);
    });
  },

  reset(id) {
    this.Connection
      .ApiKeys
      .reset(id)
      .then(this.completed)
      .catch(this.failure);
  }
};