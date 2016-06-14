import utils from '../../utils';
import accounts from '../../tempAccounts';

export default {
  tags: ['pushSockets'],
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
  'Test Admin Adds GCM Socket': (client) => {
    const socketsPage = client.page.socketsPage();
    const gcmDevKey = utils.randomString(39);

    client.url('https://localhost:8080/#/instances/' + accounts.alternativeUser.instanceName + '/sockets');

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
  }
  // 'Test Admin Goes to GCM Device list': (client) => {
  //   const socketsPage = client.page.socketsPage();
  //   const pushDevicesPage = client.page.pushDevicesPage();

  //   socketsPage
  //     .clickListItemDropdown('Google Cloud Messaging (GCM)', 'Devices list');
  //   pushDevicesPage
  //     .waitForElementVisible('@androidDevicesHeading');
  // }
};
