export default {
  fetchSolution(solutionId) {
    this.Connection
      .Solutions
      .get(solutionId)
      .then(this.completed)
      .catch(this.failure);
  },

  fetchSolutionVersions(solutionId) {
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

  installSolution(payload) {
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

  removeSolution(solutionId) {
    this.Connection
      .Solutions
      .remove(solutionId)
      .then(this.completed)
      .catch(this.failure);
  },

  fetchSolutions() {
    this.Connection
      .Solutions
      .list()
      .then(this.completed)
      .catch(this.failure);
  },

  createSolution(payload) {
    this.Connection
      .Solutions
      .create(payload)
      .then(this.completed)
      .catch(this.failure);
  },

  starSolution(id) {
    this.Connection
      .Solutions
      .star(id)
      .then(this.completed)
      .catch(this.failure);
  },

  unstarSolution(id) {
    this.Connection
      .Solutions
      .unstar(id)
      .then(this.completed)
      .catch(this.failure);
  }
};
