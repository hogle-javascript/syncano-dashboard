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
    const promises = names.map((name) => this.Connection.Templates.remove(name));

    this.Promise.all(promises)
      .then(this.completed)
      .error(this.failure);
  },

  renderFromEndpoint(templateName, endpointUrl) {
    let endpointUrlWithoutDomain = endpointUrl.substring(endpointUrl.indexOf('/v1'));
    const params = {
      template_response: templateName,
      serialize: false
    };

    if (!endpointUrlWithoutDomain.endsWith('/')) {
      endpointUrlWithoutDomain += '/';
    }

    this.Connection
      .request('GET', endpointUrlWithoutDomain, params)
      .then(this.completed)
      .catch(this.failure);
  }
};
