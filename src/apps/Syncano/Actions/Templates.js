import _ from 'lodash';

export default {
  get(templateName) {
    this.Connection
      .Templates
      .get(templateName)
      .then(this.completed)
      .catch(this.failure);
  },

  update(templateName, params) {
    this.Connection
      .Templates
      .update(templateName, params)
      .then(this.completed)
      .catch(this.failure);
  },

  render(templateName, context = {}) {
    this.Connection
      .Templates
      .render(templateName, {context})
      .then(this.completed)
      .catch(this.failure);
  },

  list(params = {}) {
    _.defaults(params, {ordering: 'desc'});
    this.Connection
      .Templates
      .list(params)
      .then(this.completed)
      .catch(this.failure);
  },

  create(payload) {
    this.Connection
      .Templates
      .create({
        name: payload.name,
        content_type: payload.content_type,
        content: '{# This is how to use comments in template #}'
      })
      .then(this.completed)
      .catch(this.failure);
  },

  remove(names) {
    let promises = names.map((name) => this.Connection.Templates.remove(name));

    this.Bluebird.all(promises)
      .then(this.completed)
      .error(this.failure);
  }
};
