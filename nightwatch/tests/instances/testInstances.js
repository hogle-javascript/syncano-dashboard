import globals from '../../globals';
import async from 'async';

export default {
  tags: ['instances'],
  after(client) {
    client.end();
  },
  'Test create instances': (client) => {
    async.waterfall([
      client.createTempAccount,
      client.createTempInstance
    ], (err) => {
      if (err) throw err;
      const loginPage = client.page.loginPage();

      loginPage
        .navigate()
        .login(globals.tempEmail, globals.tempPass);
    });
  },
  'Test Instances Dropdown': (client) => {
    const instancesPage = client.page.instancesPage();
    const leftMenuPage = client.page.leftMenuPage();
    const socketsPage = client.page.socketsPage();

    const instanceNames = [];

    instancesPage
      .navigate()
      .waitForElementPresent('@instancesTableName');
    const instanceName = instancesPage.elements.instancesTableName;

    client.elements(instanceName.locateStrategy, instanceName.selector, (result) => {
      result.value.forEach((value) => {
        client.elementIdText(value.ELEMENT, (el) => {
          instanceNames.push(el.value);
        });
      });
    });
    instancesPage
      .clickElement('@instancesTableName');
    leftMenuPage
      .clickElement('@instancesDropdown')
      .clickElement('@instancesListSecondItem');

    socketsPage.waitForElementPresent('@emptySocketsHeading');
    const dropdown = leftMenuPage.elements.instancesDropdownName.selector;

    client.getText('xpath', dropdown, (text) => {
      client.assert.equal(text.value, instanceNames[0]);
    });
  },
  'Test Select and Delete multiple Instances': (client) => {
    const listsPage = client.page.listsPage();
    const selectedItems = listsPage.elements.selectedItem.selector;
    const optionsMenu = listsPage.elements.optionsMenu.selector;

    client
      .url('https://localhost:8080/#/instances/')
      .multipleItems('Select', 2, optionsMenu, selectedItems)
      .pause(2500);

    listsPage
      .clickListItemDropdown('@optionsMenu', 'Delete')
      .clickElement('@confirmButton')
      .waitForElementVisible('@emptyListItem');
  }
};
