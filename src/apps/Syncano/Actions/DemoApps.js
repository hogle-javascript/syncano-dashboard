export default {
  list() {
    const url = 'https://api.syncano.io/v1.1/instances/example-apps/endpoints/scripts/p/'
      + '322f68921537dd4c655e0c22d7404569d4fc1f2e/getexampleapps/';

    this.Promise
      .get(url)
      .then(this.completed)
      .catch(this.failure);
  }
};
