import Async from 'async';
import globals from '../../globals';
import utils from '../../utils';

export default {
  tags: ['pushSockets'],
  before: (client) => {
    Async.waterfall([
      client.createTempAccount,
      client.createTempInstance
    ], (err) => {
      if (err) throw err;
      const loginPage = client.page.loginPage();

      loginPage
        .navigate()
        .setResolution(client)
        .login(globals.tempEmail, globals.tempPass);
    });
  },
  after: (client) => {
    client.end();
  },
  // 'Test Admin Adds GCM Socket': (client) => {
  //   const socketsPage = client.page.socketsPage();
  //   const gcmDevKey = utils.randomString(39);

  //   socketsPage
  //     .goToUrl('temp', 'sockets')
  //     .waitForElementVisible('@addCodeBoxModalTitle')
  //     .clickElement('@addGcmSocket')
  //     .fillInput('@inputGcmDevKey', gcmDevKey)
  //     .clickElement('@confirmButton')
  //     .goToUrl('temp', 'push-notifications/config')
  //     .waitForElementVisible('@gcmSocket');
  // },
  // 'Test Admin Edits GCM Socket': (client) => {
  //   const socketsPage = client.page.socketsPage();
  //   const gcmDevKey = utils.randomString(39);
  //   const gcmProdKey = utils.randomString(39);

  //   client.pause(500);

  //   socketsPage
  //     .clickListItemDropdown('Google Cloud Messaging (GCM)', 'Edit')
  //     .waitForElementVisible('@gcmTitleHeading')
  //     .waitForElementVisible('@inputGcmDevKey')
  //     .fillInput('@inputGcmDevKey', gcmDevKey)
  //     .fillInput('@inputGcmProdKey', gcmProdKey)
  //     .clickElement('@confirmButton')
  //     .clickListItemDropdown('Google Cloud Messaging (GCM)', 'Edit')
  //     .waitForElementVisible('@gcmTitleHeading')
  //     .waitForElementVisible('@inputGcmDevKey')
  //     .verify.valueContains('@inputGcmDevKey', gcmDevKey)
  //     .verify.valueContains('@inputGcmProdKey', gcmProdKey)
  //     .clickElement('@confirmButton');
  // },
  // 'Test Admin Goes to GCM Device list': (client) => {
  //   const socketsPage = client.page.socketsPage();
  //   const pushDevicesPage = client.page.pushDevicesPage();

  //   socketsPage
  //     .clickListItemDropdown('Google Cloud Messaging (GCM)', 'Devices list');
  //   pushDevicesPage
  //     .waitForElementVisible('@androidDevicesHeading');
  // }
  'Test Admin Adds APNS Socket': (client) => {
    const socketsPage = client.page.socketsPage();
    const filePath = '/Users/adam/Documents/MariuszPush/ApplePushDevelopment.p12';

    socketsPage
      .goToUrl('temp', 'sockets')
      .clickElement('@addApnsSocket');

    client.execute(`document.querySelectorAll('input[name="hiddenInput"]')[0].style.display = 'block';
                    document.querySelectorAll('input[name="hiddenInput"]')[0].style.visibility = 'visible';`);

    socketsPage
      .setValue('@uploadApnsDevCert', require('path').resolve(filePath))
      .fillInput('@apnsBundleInput', '1');
    socketsPage
      .clickElement('@confirmButton')
      .assert.elementNotPresent('//div[@class="notification notification--error"]')
      .goToUrl('temp', 'push-notifications/config')
      .waitForElementVisible('@apnsSocket');
  },
  'Test Admin Edits APNS Socket': (client) => {
    const socketsPage = client.page.socketsPage();
    const filePath = '/Users/adam/Documents/MariuszPush/ApplePushDevelopment.p12';
    const file = require('path').resolve(filePath);

    console.error('file', file);

    socketsPage
      .goToUrl('temp', 'push-notifications/config');

    socketsPage
      .clickListItemDropdown('Apple Push Notification service (APNs)', 'Edit')
      .clickElement('@removeCert')
      .verify.visible('@certDragAndDrop')
      .setValue('@uploadApnsDevCert', require('path').resolve(filePath))
      .fillInput('@apnsBundleInput', '2')
      .clickElement('@confirmButton')
      .waitForElementVisible('@apnsSocket')
      .clickListItemDropdown('Apple Push Notification service (APNs)', 'Edit')
      .verify.valueContains('@apnsCertNameInput', 'ApplePushDevelopment.p12')
      .verify.valueContains('@apnsBundleInput', '2')
      .clickElement('@confirmButton');
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
