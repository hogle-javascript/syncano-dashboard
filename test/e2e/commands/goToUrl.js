import utils from '../utils';

exports.command = function goToUrl(instanceName, endpoint) {
  const baseUrl = utils.testBaseUrl();

  return this
    .url(`${baseUrl}/#/instances/${instanceName}/${endpoint}`)
    .pause(1500);
};
