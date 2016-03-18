import _ from 'lodash';

export default {
  get(scriptId) {
    this.Connection
      .CodeBoxes
      .get(scriptId)
      .then(this.completed)
      .catch(this.failure);
  },

  update(scriptId, params) {
    this.Connection
      .CodeBoxes.update(scriptId, params)
      .then(this.completed)
      .catch(this.failure);
  },

  run(params) {
    this.Connection
      .CodeBoxes.run(params.id, {payload: params.payload})
      .then(this.completed)
      .catch(this.failure);
  },

  runWithUpdate(scriptId, updateParams, payload) {
    this.Connection
      .CodeBoxes.update(scriptId, updateParams)
      .then(
      this.Connection
        .CodeBoxes
        .run(scriptId, payload)
        .then(this.completed)
        .catch(this.failure)
    )
    .catch(this.failure);
  },

  list(params = {}) {
    _.defaults(params, {ordering: 'desc'});
    this.Connection
      .CodeBoxes
      .list(params)
      .then(this.completed)
      .catch(this.failure);
  },

  create(payload) {
    let source = '';
    const comment = {
      python: '#',
      javascript: '//',
      ruby: '#',
      golang: '//',
      swift: '//',
      php: '//'
    }[payload.runtime_name];

    if (comment) {
      source = `${comment} Start coding!`;
    }

    this.Connection
      .CodeBoxes.create({
        runtime_name: payload.runtime_name,
        label: payload.label,
        description: payload.description,
        source
      })
      .then(this.completed)
      .catch(this.failure);
  },

  remove(ids) {
    const promises = ids.map((id) => this.Connection.CodeBoxes.remove(id));

    this.Promise.all(promises)
      .then(this.completed)
      .error(this.failure);
  },

  getTrace(scriptId, traceId) {
    this.Connection
      .CodeBoxes.trace(traceId, scriptId, {})
      .then(this.completed)
      .catch(this.failure);
  },

  listTraces(scriptId, params = {}) {
    _.defaults(params, {ordering: 'desc'});
    this.Connection
      .CodeBoxes.traces(scriptId, params)
      .then(this.completed)
      .catch(this.failure);
  },

  listRuntimes() {
    this.Connection
      .CodeBoxes.listRuntimes()
      .then(this.completed)
      .catch(this.failure);
  }
};
