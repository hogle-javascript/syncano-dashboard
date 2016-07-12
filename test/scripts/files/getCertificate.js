import Syncano from 'syncano';
import fs from 'fs';
import https from 'https';

const getCertFile = () => {
  const baseUrl = 'https://api.syncano.rocks';
  const certName = 'cert.p12';
  const credentials = {
    email: process.env.NIGHTWATCH_EMAIL,
    password: process.env.NIGHTWATCH_PASSWORD
  };
  const connection = Syncano({
    baseUrl,
    defaults: {
      instanceName: 'long-frost-7585',
      className: 'apns_cert'
    }
  });

  connection
    .Account
    .login(credentials)
    .then((accountDetails) => {
      connection.accountKey = accountDetails.account_key;

      return connection
        .DataObject
        .please()
        .get({ id: 3163 });
    })
    .then((dataObject) => {
      const certFile = fs.createWriteStream(certName);

      https.get(dataObject.cert.value, (resp) => {
        resp.on('data', (data) => {
          certFile.write(data);
        });

        resp.on('end', () => {
          return console.log(`Downloaded: ./${certName}`);
        });
      });
    });
  return;
};

export default getCertFile;
