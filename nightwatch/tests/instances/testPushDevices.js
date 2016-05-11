import Async from 'async';
import globals from '../../globals';

export default {
  tags: ['pushDevices'],
  before: (client) => {
    Async.waterfall([
      client.createTempAccount,
      client.createTempInstance,
      client.createTempGcmDevice,
      client.createTempGcmDevice,
      client.createTempApnsDevice,
      client.createTempApnsDevice
    ], (err) => {
      if (err) throw err;
      const loginPage = client.page.loginPage();

      loginPage
        .navigate()
        .login(globals.tempEmail, globals.tempPass);
    });
  },
  after: (client) => {
    client.end();
  },
  'Test Select/Deselect multiple Android Devices': (client) => {
    const listsPage = client.page.listsPage();
    const selectedItems = listsPage.elements.selectedItem.selector;
    const optionsMenu = listsPage.elements.optionsMenu.selector;

    client
      .goToUrl('temp', 'push-notifications/devices/gcm')
      .multipleItems('Select', 2, optionsMenu, selectedItems)
      .pause(2000)
      .multipleItems('Unselect', 0, optionsMenu, selectedItems);
  },
  'Test Delete multiple Android Devices': (client) => {
    const listsPage = client.page.listsPage();
    const selectedItems = listsPage.elements.selectedItem.selector;
    const optionsMenu = listsPage.elements.optionsMenu.selector;

    client
      .goToUrl('temp', 'push-notifications/devices/gcm')
      .multipleItems('Select', 2, optionsMenu, selectedItems)
      .pause(2000);

    listsPage
      .clickListItemDropdown('@optionsMenu', 'Delete')
      .waitForElementVisible('@deleteTitleHeading')
      .clickElement('@confirmButton')
      .waitForElementVisible('@emptyListItem');
  },
  'Test Select/Deselect multiple iOS Devices': (client) => {
    const listsPage = client.page.listsPage();
    const selectedItems = listsPage.elements.selectedItem.selector;
    const optionsMenu = listsPage.elements.optionsMenu.selector;

    client
      .goToUrl('temp', 'push-notifications/devices/apns')
      .multipleItems('Select', 2, optionsMenu, selectedItems)
      .pause(2000)
      .multipleItems('Unselect', 0, optionsMenu, selectedItems);
  },
  'Test Delete multiple iOS Devices': (client) => {
    const listsPage = client.page.listsPage();
    const selectedItems = listsPage.elements.selectedItem.selector;
    const optionsMenu = listsPage.elements.optionsMenu.selector;

    client
      .goToUrl('temp', 'push-notifications/devices/apns')
      .multipleItems('Select', 2, optionsMenu, selectedItems)
      .pause(2000);

    listsPage
      .clickListItemDropdown('@optionsMenu', 'Delete')
      .waitForElementVisible('@deleteTitleHeading')
      .clickElement('@confirmButton')
      .waitForElementVisible('@emptyListItem');
  }
};
