import Globals from '../globals';
import Syncano from 'syncano';
import utils from '../utils';

exports.command = (callback) => {
  const accountKey = Globals.tempAccountKey;
  const baseUrl = Globals.apiBaseUrl;
  let connection = Syncano({
    baseUrl,
    defaults: {
      instanceName: Globals.instanceName
    }
  });
  const credentials = {
    email: process.env.NIGHTWATCH_EMAIL,
    password: process.env.NIGHTWATCH_PASSWORD
  };

  connection
    .Account
    .login(credentials)
    .then((accountDetails) => {
      connection = Syncano({
        baseUrl,
        accountKey: accountDetails.account_key,
        defaults: {
          instanceName: Globals.instanceName,
          className: 'apns_cert'
        }
      });

      return connection
      .DataObject
      .please()
      .get({id: 3163});
    })
    .then((dataObject) => {
      connection = Syncano({
        baseUrl,
        accountKey,
        defaults: {
          instanceName: Globals.tempInstanceName
        }
      });

      return connection
        .APNSConfig
        .please()
        .update({}, {
          development_certificate: Syncano.file(dataObject.cert),
          development_certificate_name: utils.randomString(10),
          development_bundle_identifier: utils.randomString(5)
        });
    })
    .then(() => {
      if (typeof callback === 'function') {
        callback.call(this);
      }
    })
    .catch((error) => {
      if (error) throw error;
    });
  return this;
};
