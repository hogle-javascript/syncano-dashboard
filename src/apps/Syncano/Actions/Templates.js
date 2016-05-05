export default {
  get(name) {
    this.NewLibConnection
      .Template
      .please()
      .get({name})
      .then(this.completed)
      .catch(this.failure);
  },

  update(name, params) {
    this.NewLibConnection
      .Template
      .please()
      .update({name}, params)
      .then(this.completed)
      .catch(this.failure);
  },

  render(name, context = {}) {
    this.NewLibConnection
      .Template
      .please()
      .render({name}, context)
      .then(this.completed)
      .catch(this.failure);
  },

  list() {
    this.NewLibConnection
      .Template
      .please()
      .list()
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  },

  create(payload) {
    const {name, content_type} = payload;

    this.NewLibConnection
      .Template
      .please()
      .create({
        content: '{# This is how to use comments in template #}',
        name,
        content_type
      })
      .then(this.completed)
      .catch(this.failure);
  },

  remove(templates) {
    const promises = templates.map((template) =>
      this.NewLibConnection
        .Template
        .please()
        .delete({name: template.name}));

    this.Promise.all(promises)
      .then(this.completed)
      .catch(this.failure);
  },

  renderFromEndpoint(templateName, endpointUrl) {
    const endpointUrlWithoutDomain = endpointUrl.substring(endpointUrl.indexOf('/v1.1'));
    const params = {
      template_response: templateName,
      serialize: false
    };

    this.Connection
      .request('GET', endpointUrlWithoutDomain, params)
      .then(this.completed)
      .catch(this.failure);
  }
};
