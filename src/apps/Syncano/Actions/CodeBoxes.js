export default {
  fetchCodeBox(codeboxId) {
    this.Connection
      .CodeBoxes
      .get(codeboxId)
      .then(this.completed)
      .catch(this.failure);
  },

  updateCodeBox(codeboxId, params) {
    this.Connection
      .CodeBoxes.update(codeboxId, params)
      .then(this.completed)
      .catch(this.failure);
  },

  runCodeBox(params) {
    this.Connection
      .CodeBoxes.run(params.id, {payload: params.payload})
      .then(this.completed)
      .catch(this.failure);
  },

  fetchCodeBoxes() {
    this.Connection
      .CodeBoxes
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  createCodeBox(payload) {
    this.Connection
      .CodeBoxes.create({
        runtime_name : payload.runtime_name,
        label        : payload.label,
        description  : payload.description,
        source       : '# Start coding!'
      })
      .then(this.completed)
      .catch(this.failure);
  },

  removeCodeBoxes(ids) {
    let promises = ids.map(id => {
      return this.Connection.CodeBoxes.remove(id);
    });

    this.D.all(promises)
      .success(this.completed)
      .error(this.failure);
  },

  fetchCodeBoxTrace(codeboxId, traceId) {
    this.Connection
      .CodeBoxes.trace(traceId, codeboxId, {})
      .then(this.completed)
      .catch(this.failure);
  },

  fetchCodeBoxTraces(codeboxId) {
    this.Connection
      .CodeBoxes.traces(codeboxId, {})
      .then(this.completed)
      .catch(this.failure);
  },

  fetchCodeBoxRuntimes() {
    this.Connection
      .CodeBoxes.listRuntimes()
      .then(this.completed)
      .catch(this.failure);
  },

  getTraces(objectId) {
    this.Connection
      .CodeBoxes.traces(objectId, {})
      .then(this.completed)
      .catch(this.failure);
  }
};
