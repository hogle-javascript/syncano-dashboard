export default {
  tags: ['instances'],
  before(client) {
    const signupPage = client.page.signupPage();
    const slug = Date.now();
    const email = 'syncano.bot+' + slug + '@syncano.com';

    signupPage.navigate();
    signupPage.setValue('@emailInput', email);
    signupPage.setValue('@passInput', slug);
    signupPage.clickSubmitButton();
  },
  after(client) {
    client.end();
  },
  'Test Edit Instance': (client) => {
    const instancesPage = client.page.instancesPage();

    instancesPage
      .navigate()
      .clickDropdown('@instanceDropdown');
    client.pause(1000);
    instancesPage
      .clickButton('@editDropdownItem')
      .fillInstanceDescription('@createModalDescriptionInput', 'new_description')
      .clickButton('@confirmButton')
      .waitForElementNotVisible('@editInstanceModalTitle');

    instancesPage
      .waitForElementVisible('@instancesTableRow')
      .expect.element('@instancesTableRow').to.contain.text('new_description');
  },
  'Test Select/Deselect Instance': (client) => {
    const instancesPage = client.page.instancesPage();

    instancesPage
      .navigate()
      .clickButton('@selectInstance')
      .waitForElementVisible('@instanceSelected')
      .clickButton('@selectInstance')
      .waitForElementNotPresent('@instanceSelected');
  },
  'Test Delete Instance': (client) => {
    const instancesPage = client.page.instancesPage();

    instancesPage
      .navigate()
      .clickButton('@selectInstance')
      .clickButton('@deleteButton');
    client.pause(1000);
    instancesPage
      .clickButton('@confirmDeleteButton')
      .waitForElementNotVisible('@deleteInstanceModalTitle');

    instancesPage.expect.element('@emptyListItem').to.be.present.after(10000);
  },
  'Test Add Instance from welcome dialog': (client) => {
    const instancesPage = client.page.instancesPage();

    instancesPage
      .navigate()
      .waitForElementVisible('@emptyListItem')
      .clickButton('@welcomeDialogCreateInstance')
      .fillInstanceDescription('@createModalDescriptionInput', 'nightwatch_test_instance_description');

    instancesPage.expect.element('@addInstanceModalTitle').to.be.present.after(10000);
    instancesPage.clickButton('@confirmButton')
      .waitForElementNotVisible('@addInstanceModalTitle', 30000);
    instancesPage.expect.element('@instancesTableRow').to.be.present.after(10000);
    instancesPage.expect.element('@instancesTableRow').to.contain.text('nightwatch_test_instance_description');
  },
  'Test Delete an Instance': (client) => {
    const instancesPage = client.page.instancesPage();

    instancesPage
      .navigate()
      .clickButton('@selectInstance')
      .clickButton('@deleteButton');
    client.pause(1000);
    instancesPage
      .clickButton('@confirmDeleteButton')
      .waitForElementNotVisible('@deleteInstanceModalTitle');
    instancesPage.expect.element('@emptyListItem').to.be.present.after(10000);
  },
  'Add an Instance from empty list item': (client) => {
    const instancesPage = client.page.instancesPage();

    instancesPage
      .navigate()
      .waitForElementPresent('@emptyListItem');
    client.pause(1000);
    instancesPage
      .clickButton('@emptyListItem')
      .fillInstanceDescription('@createModalDescriptionInput', 'nightwatch_test_instance')
      .clickButton('@confirmButton')
      .waitForElementNotVisible('@addInstanceModalTitle', 30000)
      .waitForElementVisible('@instanceDescription');
  },
  'Test Create multiple Instances by FAB': (client) => {
    const instancesPage = client.page.instancesPage();
    let i = 0;

    instancesPage
      .navigate();
    for (i; i < 2; i += 1) {
      instancesPage.clickFAB();
      instancesPage.expect.element('@addInstanceModalTitle').to.be.present.after(10000);
      instancesPage
        .clickButton('@confirmButton')
        .waitForElementNotVisible('@addInstanceModalTitle', 30000);
    }
    instancesPage.expect.element('@instancesTableRow').to.be.present.after(10000);
  },
  //'Test Instances Dropdown': (client) => {
  //  const instancesPage = client.page.instancesPage();
  //  const leftMenuPage = client.page.leftMenuPage();
  //  const socketsPage = client.page.socketsPage();
  //
  //  const instanceNames = [];
  //
  //  instancesPage.navigate();
  //  instancesPage.waitForElementPresent('@instancesTableName');
  //  const instanceName = instancesPage.elements.instancesTableName;
  //
  //  client.elements(instanceName.locateStrategy, instanceName.selector, (result) => {
  //    result.value.forEach((value) => {
  //      client.elementIdText(value.ELEMENT, (el) => {
  //        instanceNames.push(el.value);
  //      });
  //    });
  //  });
  //  instancesPage.waitForElementPresent('@instancesTableRow');
  //  instancesPage.clickButton('@instancesTableRow');
  //  leftMenuPage.clickButton('@instancesDropdown');
  //  leftMenuPage.clickButton('@instancesListSecondItem');
  //  socketsPage.waitForElementPresent('@dataSocketTableTitle');
  //  const dropdown = leftMenuPage.elements.instancesDropdownName.selector;
  //
  //  client.getText('xpath', dropdown, (text) => {
  //    client.assert.equal(text.value, instanceNames[0]);
  //  });
  //},
  'Test Delete multiple Instances': (client) => {
    const instancesPage = client.page.instancesPage();

    instancesPage
      .navigate()
      .waitForElementPresent('@selectInstance')
      .moveToElement('@selectInstance', 0, 0)
      .clickButton('@instanceToSelect')
      .clickButton('@selectButton')
      .clickButton('@deleteButton');
    client.pause(1000);
    instancesPage
      .clickButton('@confirmDeleteButton')
      .waitForElementNotVisible('@deleteInstanceModalTitle');

    instancesPage.expect.element('@emptyListItem').to.be.present.after(10000);
  }
};
