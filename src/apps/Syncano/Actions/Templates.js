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

  render(params) {
    this.Connection
      .Templates
      .render(params.name, {context: params.payload})
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
        description: payload.description,
        content_type: payload.content_type,
        content: '{# This is how to use comments in template #}'
      })
      .then(this.completed)
      .catch(this.failure);
  },

  remove(ids) {
    let promises = ids.map((id) => this.Connection.Templates.remove(id));

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  }
};
