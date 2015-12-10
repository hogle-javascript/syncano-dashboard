export default {
  get(snippetId) {
    this.Connection
      .CodeBoxes
      .get(snippetId)
      .then(this.completed)
      .catch(this.failure);
  },

  update(snippetId, params) {
    this.Connection
      .CodeBoxes.update(snippetId, params)
      .then(this.completed)
      .catch(this.failure);
  },

  run(params) {
    this.Connection
      .CodeBoxes.run(params.id, {payload: params.payload})
      .then(this.completed)
      .catch(this.failure);
  },

  runWithUpdate(snippetId, updateParams, payload) {
    this.Connection
      .CodeBoxes.update(snippetId, updateParams)
      .then(
      this.Connection
        .CodeBoxes
        .run(snippetId, payload)
        .then(this.completed)
        .catch(this.failure)
    )
    .catch(this.failure);
  },

  list() {
    this.Connection
      .CodeBoxes
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  create(payload) {
    this.Connection
      .CodeBoxes.create({
        runtime_name: payload.runtime_name,
        label: payload.label,
        description: payload.description,
        source: '# Start coding!'
      })
      .then(this.completed)
      .catch(this.failure);
  },

  remove(ids) {
    let promises = ids.map((id) => this.Connection.CodeBoxes.remove(id));

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  getTrace(snippetId, traceId) {
    this.Connection
      .CodeBoxes.trace(traceId, snippetId, {})
      .then(this.completed)
      .catch(this.failure);
  },

  listTraces(snippetId) {
    this.Connection
      .CodeBoxes.traces(snippetId, {})
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
