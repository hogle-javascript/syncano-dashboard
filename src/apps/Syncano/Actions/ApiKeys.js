import _ from 'lodash';

export default {
  list(params = {}) {
    _.defaults(params, {ordering: 'desc'});
    this.Connection
      .ApiKeys
      .list(params)
      .then(this.completed)
      .catch(this.failure);
  },

  create(payload) {
    this.Connection
      .ApiKeys
      .create(payload)
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
    names.map((name) => {
      this.Connection
        .ApiKeys
        .remove(name)
        .then(this.completed)
        .catch(this.failure);
    });
  },

  reset(apiKeys) {
    let promises = apiKeys.map((apiKey) => this.Connection.ApiKeys.reset(apiKey.id));

    this.Promise.all(promises)
      .then(this.completed)
      .error(this.failure);
  }
};
