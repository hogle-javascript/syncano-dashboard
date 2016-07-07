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
      .clickElement('@addCodeBoxButton')
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
      .fillInput('@inputGcmDevKey', gcmDevKey)
      .fillInput('@inputGcmProdKey', gcmProdKey)
      .clickElement('@confirmButton')
      .clickElement('@summaryDialogCloseButton')
      .clickListItemDropdown('Google Cloud Messaging (GCM)', 'Edit')
      .verify.valueContains('@inputGcmDevKey', gcmDevKey)
      .verify.valueContains('@inputGcmProdKey', gcmProdKey)
      .clickElement('@confirmButton')
      .clickElement('@summaryDialogCloseButton');
  },
  'Test Admin Goes to GCM Device list': (client) => {
    const socketsPage = client.page.socketsPage();
    const pushDevicesPage = client.page.pushDevicesPage();
    const instanceName = accounts.alternativeUser.instanceName;

    socketsPage
      .goToUrl(instanceName, 'push-notifications/config')
      .clickElement('@GCMDevicesLinkIcon');
    pushDevicesPage
      .waitForElementVisible('@androidDevicesHeading');
  }
};
