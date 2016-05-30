import globals from '../globals';

exports.command = function goToUrl(type, endpoint) {
  const instance = type === 'temp' ? globals.tempInstanceName : globals.instanceName;

  this.url('https://localhost:8080/#/instances/' + instance + '/' + endpoint);
  return this;
};
