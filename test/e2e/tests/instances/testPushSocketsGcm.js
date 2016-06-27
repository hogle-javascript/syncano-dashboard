import accounts from '../../tempAccounts';
import utils from '../../utils';

export default {
  tags: ['pushSocketsGcm'],
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
    const instanceName = accounts.alternativeUser.instanceName;

    socketsPage
      .goToUrl(instanceName, 'sockets')
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
      .clickElement('@GCMDevicesLinkIcon');
    pushDevicesPage
      .waitForElementVisible('@androidDevicesHeading');
  }
};
