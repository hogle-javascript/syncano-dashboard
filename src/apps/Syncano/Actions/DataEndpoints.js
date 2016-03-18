import _ from 'lodash';

export default {
  create(payload) {
    this.Connection
      .DataViews
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  list(params = {}) {
    _.defaults(params, {ordering: 'desc'});
    this.Connection
      .DataViews
      .list(params)
      .then(this.completed)
      .catch(this.failure);
  },

  update(id, payload) {
    this.Connection
      .DataViews
      .update(id, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  remove(dataviews) {
    const promises = _.map(dataviews, (dataview) => this.Connection.DataViews.remove(dataview.name));

    this.Promise.all(promises)
      .then(this.completed)
      .error(this.failure);
  }
};
