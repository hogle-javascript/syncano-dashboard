import accounts from '../../tempAccounts';
import Syncano from 'syncano';

export default {
  tags: ['apnsPushSockets'],
  before: (client) => {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .setResolution(client)
      .login(accounts.alternativeUser.email, accounts.alternativeUser.password);
  },
  after: (client) => {
    client.end();
  },
  'Test Admin Adds APNS Socket': (client) => {
    const socketsPage = client.page.socketsPage();
    const filePath = './cert12';

    client.url(`https://localhost:8080/#/instances/${accounts.alternativeUser.instanceName}/sockets`);

    socketsPage
      .clickElement('@addApnsSocket')
      .waitForElementPresent('@certDragAndDrop');

    client.execute(`document.querySelectorAll('input[type="file"]')[1].style.display = 'block';
                    document.querySelectorAll('input[type="file"]')[1].style.visibility = 'visible';`);

    socketsPage
      .waitForElementVisible('@uploadApnsDevCert')
      .setValue('@uploadApnsDevCert', require('path').resolve(filePath))
      .waitForElementVisible('@apnsCertInput')
      .clickElement('@cancelButton');
  },
  'Test Admin Removes APNS Socket': (client) => {
    const socketsPage = client.page.socketsPage();
    const filePath = './cert.p12';

    const accountKey = accounts.alternativeUser.accountKey;
    const instanceName = accounts.alternativeUser.instanceName;
    const baseUrl = 'https://api.syncano.rocks';
    const connection = Syncano({
      baseUrl,
      accountKey,
      defaults: {
        instanceName,
        className: 'apns_cert'
      }
    });
    const params = {instanceName};
    const update = {
      development_certificate: Syncano.file(filePath),
      development_certificate_name: 'certName',
      development_bundle_identifier: 'certBundle'
    };

    connection
      .APNSConfig
      .please()
      .update(params, update)
      .then((resp) => console.log('Development certifacte uploaded?: ', resp.development_certificate))
      .catch((err) => console.log(err));

    client
      .url(`https://localhost:8080/#/instances/${accounts.alternativeUser.instanceName}/sockets`)
      .refresh()
      .pause(1000);

    socketsPage
      .clickElement('@configuration')
      .waitForElementVisible('@apnsCertInput')
      .clickElement('@removeCert')
      .waitForElementVisible('@certDragAndDrop')
      .clickElement('@confirmButton')
      .clickElement('@addApnsSocket')
      .waitForElementVisible('@certDragAndDrop');
  },
  'Test Admin Goes to APNS Device list': (client) => {
    const socketsPage = client.page.socketsPage();
    const pushDevicesPage = client.page.pushDevicesPage();

    socketsPage
      .goToUrl('temp', 'push-notifications/config')
      .clickListItemDropdown('Apple Push Notification service (APNs)', 'Devices list');

    pushDevicesPage
      .waitForElementVisible('@iosDevicesHeading');
  }
};
