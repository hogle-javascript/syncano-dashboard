import globals from '../globals';

exports.command = function goToUrl(type, endpoint) {
  const instance = type === 'temp' ? globals.tempInstanceName : globals.instanceName;

  return this.url('https://localhost:8080/#/instances/' + instance + '/' + endpoint);
};
