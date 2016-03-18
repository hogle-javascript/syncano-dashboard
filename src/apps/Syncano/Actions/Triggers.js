import _ from 'lodash';

export default {
  create(payload) {
    this.Connection
      .Triggers
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  get(triggerId) {
    this.Connection
      .Triggers
      .get(triggerId)
      .then(this.completed)
      .catch(this.failure);
  },

  list(params = {}) {
    _.defaults(params, {ordering: 'desc'});
    this.Connection
      .Triggers
      .list(params)
      .then(this.completed)
      .catch(this.failure);
  },

  update(id, payload) {
    this.Connection
      .Triggers
      .update(id, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  remove(ids) {
    const promises = ids.map((id) => this.Connection.Triggers.remove(id));

    this.Promise.all(promises)
      .then(this.completed)
      .error(this.failure);
  },

  listTraces(triggerId) {
    this.Connection
      .Triggers
      .traces(triggerId, {ordering: 'desc'})
      .then(this.completed)
      .catch(this.failure);
  }
};
