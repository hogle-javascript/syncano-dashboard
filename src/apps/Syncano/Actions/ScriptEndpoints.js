export default {
  get(name) {
    this.NewLibConnection
      .ScriptEndpoint
      .please()
      .get({name})
      .then(this.completed)
      .catch(this.failure);
  },

  create(payload) {
    this.NewLibConnection
      .ScriptEndpoint
      .please()
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  list() {
    this.NewLibConnection
      .ScriptEndpoint
      .please()
      .list()
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  },

  update(name, payload) {
    this.NewLibConnection
      .ScriptEndpoint
      .please()
      .update({name}, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  remove(scriptEndpoints) {
    const promises = scriptEndpoints.map((scriptEndpoint) =>
      this.NewLibConnection
        .ScriptEndpoint
        .please()
        .delete({name: scriptEndpoint.name}));

    this.Promise.all(promises)
      .then(this.completed)
      .error(this.failure);
  },

  listTraces(scriptEndpointName) {
    this.NewLibConnection
      .ScriptEndpointTrace
      .please({scriptEndpointName})
      .ordering('desc')
      .then(this.completed)
      .catch(this.failure);
  }
};
