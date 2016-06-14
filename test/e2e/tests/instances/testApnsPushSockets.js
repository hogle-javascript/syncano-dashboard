// import utils from '../../utils';
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

    client.url('https://localhost:8080/#/instances/' + accounts.alternativeUser.instanceName + '/sockets');
    client.pause(1000);
    const filePath = './cert12';

    socketsPage
      .clickElement('@addApnsSocket')
      .waitForElementPresent('@certDragAndDrop');

    client.pause(1000);
    client.execute(`document.querySelectorAll('input[type="file"]')[1].style.display = 'block';
                    document.querySelectorAll('input[type="file"]')[1].style.visibility = 'visible';`);

    socketsPage
      .setValue('@uploadApnsDevCert', require('path').resolve(filePath))
      .waitForElementVisible('@apnsCertInput')
      .clickElement('@cancelButton');
  },
  'Test Admin Removes APNS Socket': (client) => {
    const socketsPage = client.page.socketsPage();
    const filePath = './cert12';

    const accountKey = accounts.alternativeUser.accountKey;
    const instanceName = accounts.alternativeUser.instanceName;
    const baseUrl = 'https://api.syncano.rocks';

    let connection = Syncano({
      baseUrl,
      accountKey,
      defaults: {
        instanceName,
        className: 'apns_cert'
      }
    });

    const update = {
      development_certificate: Syncano.file('./cert.p12'),
      development_certificate_name: 'certName',
      development_bundle_identifier: 'certBundle'
    };

    connection.APNSConfig.please().update(update);

    client.url('https://localhost:8080/#/instances/' + accounts.alternativeUser.instanceName + '/sockets');
    client.refresh();
    client.pause(1000);

    socketsPage
      .clickElement('@addApnsSocket')
      .verify.valueContains('@apnsCertNameInput', 'cert.p12')
      .verify.valueContains('@apnsBundleInput', 'certBundle')
      .clickElement('@removeCert')
      .verify.visible('@certDragAndDrop')
      .clickElement('@confirmButton')
      .waitForElementVisible('@apnsSocket')
      .clickListItemDropdown('Apple Push Notification service (APNs)', 'Add')
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
