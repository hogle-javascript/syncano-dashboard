exports.command = function goToUrl(instanceName, endpoint) {
  return this.url('https://localhost:8080/#/instances/' + instanceName + '/' + endpoint);
};
