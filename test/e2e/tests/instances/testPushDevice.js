import accounts from '../../tempAccounts';
import utils from '../../utils';

export default {
  tags: ['pushDevice'],
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
  'Test Admin Adds Android Device': (client) => {
    const pushDevicesPage = client.page.pushDevicesPage();
    const listsPage = client.page.listsPage();
    const instanceName = accounts.instanceUser.instanceName;
    const labelName = utils.addSuffix('androidlabel');
    const registrationId = utils.randomString(64);
    const deviceId = utils.randomInt(100, 1000);

    pushDevicesPage
      .goToUrl(instanceName, 'push-notifications/devices/gcm')
      .waitForElementVisible('@androidDevicesHeading');

    client.pause(500);

    listsPage
      .clickElement('@addButton')
      .fillInput('@inputLabel', labelName)
      .fillInput('@inputRegistrationId', registrationId)
      .fillInput('@inputDeviceId', deviceId)
      .clickElement('@confirmButton')
      .waitForElementNotPresent('@addTitleHeading');

    pushDevicesPage
      .verify.containsText('@firstDevice', labelName);
  },
  'Test Admin Edits Android Device': (client) => {
    const pushDevicesPage = client.page.pushDevicesPage();
    const listsPage = client.page.listsPage();
    const labelName = utils.addSuffix('androidlabel');
    const deviceId = utils.randomInt(100, 1000);

    pushDevicesPage
      .waitForElementVisible('@androidDevicesHeading');

    listsPage
      .clickListItemDropdown('@firstItemOptionsMenu', 'Edit')
      .fillInput('@inputLabel', labelName)
      .fillInput('@inputDeviceId', deviceId)
      .clickElement('@confirmButton')
      .waitForElementNotPresent('@addTitleHeading');

    pushDevicesPage
      .verify.containsText('@firstDevice', labelName);
  },
  'Test Admin Selects/Deselects Android Device': (client) => {
    const listsPage = client.page.listsPage();
    const selectedItem = listsPage.elements.selectedItem.selector;
    const optionsMenu = listsPage.elements.firstItemOptionsMenu.selector;

    client
      .singleItemSelectUnselect('synicon-android', optionsMenu, selectedItem);
  },
  'Test Admin Deletes Android Device': (client) => {
    const pushDevicesPage = client.page.pushDevicesPage();
    const listsPage = client.page.listsPage();
    const tempGCMDevicesNames = accounts.instanceUser.tempGCMDevicesNames;
    const lastDeviceName = tempGCMDevicesNames[tempGCMDevicesNames.length - 1];

    pushDevicesPage
      .waitForElementVisible('@androidDevicesHeading');

    listsPage
      .waitForElementVisible('@firstItemOptionsMenu')
      .clickListItemDropdown('@firstItemOptionsMenu', 'Delete')
      .waitForElementVisible('@deleteTitleHeading')
      .clickElement('@confirmButton')
      .waitForElementNotPresent('@deleteTitleHeading');

    pushDevicesPage
      .verify.containsText('@firstDevice', lastDeviceName);
  },
  'Test Admin Adds iOS Device': (client) => {
    const pushDevicesPage = client.page.pushDevicesPage();
    const listsPage = client.page.listsPage();
    const instanceName = accounts.instanceUser.instanceName;
    const labelName = utils.addSuffix('ioslabel');
    const registrationId = utils.randomString(64);

    pushDevicesPage
      .goToUrl(instanceName, 'push-notifications/devices/apns')
      .waitForElementVisible('@iosDevicesHeading');

    client.pause(500);

    listsPage
      .clickElement('@addButton')
      .fillInput('@inputLabel', labelName)
      .fillInput('@inputRegistrationId', registrationId)
      .clickElement('@confirmButton')
      .waitForElementNotPresent('@addTitleHeading');

    pushDevicesPage
      .verify.containsText('@firstDevice', labelName);
  },
  'Test Admin Edits iOS Device': (client) => {
    const pushDevicesPage = client.page.pushDevicesPage();
    const listsPage = client.page.listsPage();
    const labelName = utils.addSuffix('ioslabel');

    pushDevicesPage
      .waitForElementVisible('@iosDevicesHeading');

    listsPage
      .clickListItemDropdown('@firstItemOptionsMenu', 'Edit')
      .fillInput('@inputLabel', labelName)
      .clickElement('@confirmButton')
      .waitForElementNotPresent('@addTitleHeading');

    pushDevicesPage
      .verify.containsText('@firstDevice', labelName);
  },
  'Test Admin Selects/Deselects iOS Device': (client) => {
    const listsPage = client.page.listsPage();
    const selectedItem = listsPage.elements.selectedItem.selector;
    const optionsMenu = listsPage.elements.firstItemOptionsMenu.selector;

    client
      .singleItemSelectUnselect('synicon-apple', optionsMenu, selectedItem);
  },
  'Test Admin Deletes iOS Device': (client) => {
    const pushDevicesPage = client.page.pushDevicesPage();
    const listsPage = client.page.listsPage();
    const tempAPNSDevicesNames = accounts.instanceUser.tempAPNSDevicesNames;
    const lastDeviceName = tempAPNSDevicesNames[tempAPNSDevicesNames.length - 1];

    pushDevicesPage
      .waitForElementVisible('@iosDevicesHeading');

    listsPage
      .waitForElementVisible('@firstItemOptionsMenu')
      .clickListItemDropdown('@firstItemOptionsMenu', 'Delete')
      .waitForElementVisible('@deleteTitleHeading')
      .clickElement('@confirmButton')
      .waitForElementNotPresent('@deleteTitleHeading');

    pushDevicesPage
      .verify.containsText('@firstDevice', lastDeviceName);
  }
};
