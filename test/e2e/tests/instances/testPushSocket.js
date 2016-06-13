import utils from '../../utils';
import accounts from '../../tempAccounts';

export default {
  tags: ['pushSockets'],
  before: (client) => {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .setResolution(client)
      .login(accounts.instanceUser.email, accounts.instanceUser.password);
  },
  after: (client) => {
    client.end();
  },
  'Test Admin Adds GCM Socket': (client) => {
    const socketsPage = client.page.socketsPage();
    const gcmDevKey = utils.randomString(39);

    client.url('https://localhost:8080/#/instances/' + accounts.instanceUser.instanceName + '/sockets');

    socketsPage
      // Example rewrite tests, will need to change custom command, but right now it is not possible
      // .goToUrl('temp', 'sockets')
      .waitForElementVisible('@addCodeBoxModalTitle')
      .clickElement('@addGcmSocket')
      .fillInput('@inputGcmDevKey', gcmDevKey)
      .clickElement('@confirmButton')
      .goToUrl('temp', 'push-notifications/config')
      .waitForElementVisible('@gcmSocket');
  },
  'Test Admin Edits GCM Socket': (client) => {
    const socketsPage = client.page.socketsPage();
    const gcmDevKey = utils.randomString(39);
    const gcmProdKey = utils.randomString(39);

    client.pause(500);

    socketsPage
      .clickListItemDropdown('Google Cloud Messaging (GCM)', 'Edit')
      .waitForElementVisible('@gcmTitleHeading')
      .waitForElementVisible('@inputGcmDevKey')
      .fillInput('@inputGcmDevKey', gcmDevKey)
      .fillInput('@inputGcmProdKey', gcmProdKey)
      .clickElement('@confirmButton')
      .clickListItemDropdown('Google Cloud Messaging (GCM)', 'Edit')
      .waitForElementVisible('@gcmTitleHeading')
      .waitForElementVisible('@inputGcmDevKey')
      .verify.valueContains('@inputGcmDevKey', gcmDevKey)
      .verify.valueContains('@inputGcmProdKey', gcmProdKey)
      .clickElement('@confirmButton');
  },
  'Test Admin Goes to GCM Device list': (client) => {
    const socketsPage = client.page.socketsPage();
    const pushDevicesPage = client.page.pushDevicesPage();

    socketsPage
      .clickListItemDropdown('Google Cloud Messaging (GCM)', 'Devices list');
    pushDevicesPage
      .waitForElementVisible('@androidDevicesHeading');
  }
  // 'Test Admin Adds APNS Socket': (client) => {
  //   const socketsPage = client.page.socketsPage();
  //   const filePath = '/Users/marcin/Downloads/ApplePushDevelopment.p12';

  //   socketsPage
  //     .goToUrl('temp', 'sockets')
  //     .clickElement('@addCodeBoxButton')
  //     .waitForElementVisible('@addCodeBoxModalTitle')
  //     .clickElement('@addApnsSocket')
  //     .setValue('@uploadApnsDevCert', require('path').resolve(filePath))
  //     .fillInput('@apnsBundleInput', '1')
  //     .clickElement('@confirmButton')
  //     .assert.elementNotPresent('//div[@class="notification notification--error"]')
  //     .goToUrl('temp', 'push-notifications/config')
  //     .waitForElementVisible('@apnsSocket');
  // },
  // 'Test Admin Edits APNS Socket': (client) => {
  //   const socketsPage = client.page.socketsPage();
  //   const filePath = '/Users/marcin/Downloads/ApplePushDevelopment.p12';

  //   socketsPage
  //     .goToUrl('temp', 'push-notifications/config')
  //     .clickListItemDropdown('Apple Push Notification service (APNs)', 'Edit')
  //     .clickElement('@removeCert')
  //     .verify.visible('@certDragAndDrop')
  //     .setValue('@uploadApnsDevCert', filePath)
  //     .fillInput('@apnsBundleInput', '2')
  //     .clickElement('@confirmButton')
  //     .waitForElementVisible('@apnsSocket')
  //     .clickListItemDropdown('Apple Push Notification service (APNs)', 'Edit')
  //     .verify.valueContains('@apnsCertNameInput', 'ApplePushDevelopment.p12')
  //     .verify.valueContains('@apnsBundleInput', '2')
  //     .clickElement('@confirmButton');
  // },
  // 'Test Admin Goes to APNS Device list': (client) => {
  //   const socketsPage = client.page.socketsPage();
  //   const pushDevicesPage = client.page.pushDevicesPage();

  //   socketsPage
  //     .goToUrl('temp', 'push-notifications/config')
  //     .clickListItemDropdown('Apple Push Notification service (APNs)', 'Devices list');
  //   pushDevicesPage
  //     .waitForElementVisible('@iosDevicesHeading');
  // }
};
