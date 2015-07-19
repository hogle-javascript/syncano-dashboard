export default {
  get(solutionId) {
    this.Connection
      .Solutions
      .get(solutionId)
      .then(this.completed)
      .catch(this.failure);
  },

  listVersions(solutionId) {
    this.Connection
      .Solutions
      .listVersions(solutionId)
      .then(this.completed)
      .catch(this.failure);
  },

  createVersion(solutionId, payload) {
    this.Connection
      .Solutions
      .createVersion(solutionId, payload)
      .then(this.completed)
      .catch(this.failure);
  },

  install(payload) {
    this.Connection
      .Solutions
      .install(
        payload.solutionId,
        payload.versionId,
        payload.instanceName
      )
      .then(this.completed)
      .catch(this.failure);
  },

  remove(solutionId) {
    this.Connection
      .Solutions
      .remove(solutionId)
      .then(this.completed)
      .catch(this.failure);
  },

  list() {
    this.Connection
      .Solutions
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  create(payload) {
    this.Connection
      .Solutions
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  star(id) {
    this.Connection
      .Solutions
      .star(id)
      .then(this.completed)
      .catch(this.failure);
  },

  unstar(id) {
    this.Connection
      .Solutions
      .unstar(id)
      .then(this.completed)
      .catch(this.failure);
  }
};