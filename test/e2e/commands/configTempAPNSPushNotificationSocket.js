import Globals from '../globals';
import Syncano from 'syncano';
import utils from '../utils';
import https from 'https';
import fs from 'fs';

exports.command = (callback) => {
  const accountKey = Globals.tempAccountKey;
  const baseUrl = Globals.apiBaseUrl;
  const certName = Globals.certFileName;
  const credentials = {
    email: process.env.NIGHTWATCH_EMAIL,
    password: process.env.NIGHTWATCH_PASSWORD
  };
  const removeCertFile = () => {
    fs.exists(`./${certName}`, (exists) => {
      if (exists) {
        fs.unlink(`./${certName}`);
      }
    });
  };
  let connection = Syncano({
    baseUrl,
    defaults: {
      instanceName: Globals.instanceName
    }
  });

  connection
    .Account
    .login(credentials)
    .then((accountDetails) => {
      connection = Syncano({
        baseUrl,
        accountKey: accountDetails.account_key,
        defaults: {
          instanceName: Globals.instanceName,
          className: Globals.certClassName
        }
      });

      return connection
        .DataObject
        .please()
        .get({id: Globals.dataObjectWithCertId});
    })
    .then((dataObject) => {
      let certFile = fs.createWriteStream(certName);

      connection = Syncano({
        baseUrl,
        accountKey,
        defaults: {
          instanceName: Globals.tempInstanceName
        }
      });

      https.get(dataObject.cert.value, (resp) => {
        resp.on('data', (data) => {
          certFile.write(data);
        });

        resp.on('end', () => {
          return connection
            .APNSConfig
            .please()
            .update({}, {
              development_certificate: Syncano.file(`./${certName}`),
              development_certificate_name: utils.randomString(10),
              development_bundle_identifier: utils.randomString(5)
            })
            .then(() => removeCertFile());
        });
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
