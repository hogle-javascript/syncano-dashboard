export default {
  tags: ['instances'],
  before(client) {
    const signupPage = client.page.signupPage();
    const slug = Date.now();
    const email = 'syncano.bot+' + slug + '@syncano.com';

    signupPage
      .navigate()
      .setValue('@emailInput', email)
      .setValue('@passInput', slug)
      .clickSubmitButton();
  },
  after(client) {
    client.end();
  },
  //'Test Close welcome dialog': (client) => {
  //  const instancesPage = client.page.instancesPage();
  //  const dataPage = client.page.dataPage();
  //
  //  client.pause(2000);
  //  instancesPage.clickButton('@welcomeDialog');
  //  dataPage.waitForElementPresent('@instancesDropdown');
  //},
  'Test Edit Instance': (client) => {
    const instancesPage = client.page.instancesPage();

    instancesPage
      .navigate()
      .clickDropdown()
      .clickButton('@editDropdownItem');
    client.pause(1000);
    instancesPage
      .fillInstanceDescription('nightwatch_test_instance_new_description')
      .clickButton('@confirmButton')
      .isModalClosed('@editInstanceModalTitle');

    instancesPage.expect.element('@instancesTableRow').to.be.present.after(10000);
    instancesPage.expect.element('@instancesTableRow').to.contain.text('nightwatch_test_instance_new_description');
  },
  'Test Select/Deselect Instance': (client) => {
    const instancesPage = client.page.instancesPage();

    instancesPage
      .navigate()
      .clickSelectInstance()
      .waitForElementPresent('@instanceSelected')
      .clickSelectInstance()
      .waitForElementNotPresent('@instanceSelected');
  },
  'Test Delete an Instance': (client) => {
    const instancesPage = client.page.instancesPage();

    instancesPage
      .navigate()
      .clickSelectInstance()
      .clickButton('@deleteButton');
    client.pause(1000);
    instancesPage
      .clickButton('@confirmDeleteButton')
      .isModalClosed('@deleteInstanceModalTitle');

    instancesPage.expect.element('@emptyListItem').to.be.present.after(10000);
  },
  'Add an Instance from empty list item': (client) => {
    const instancesPage = client.page.instancesPage();

    instancesPage
      .navigate()
      .waitForElementPresent('@emptyListItem')
      .clickButton('@emptyListItem');

    instancesPage.expect.element('@addInstanceModalTitle').to.be.present.after(10000);

    instancesPage
      .fillInstanceDescription('nightwatch_test_instance')
      .clickButton('@confirmButton')
      .isModalClosed('@addInstanceModalTitle')
      .waitForElementVisible('@instanceDescription');
  },
  'Test Create multiple Instances by FAB': (client) => {
    const instancesPage = client.page.instancesPage();
    let i = 0;

    instancesPage.navigate();
    for (i; i < 2; i += 1) {
      instancesPage.clickFAB();
      instancesPage.expect.element('@addInstanceModalTitle').to.be.present.after(10000);
      instancesPage
        .clickButton('@confirmButton')
        .isModalClosed('@addInstanceModalTitle');
    }
    instancesPage.expect.element('@instancesTableRow').to.be.present.after(10000);
  },
  'Test Instances Dropdown': (client) => {
    const instancesPage = client.page.instancesPage();
    const leftMenuPage = client.page.leftMenuPage();
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
      .waitForElementPresent('@instancesTableRow')
      .clickButton('@instancesTableRow');
    leftMenuPage
      .clickButton('@instancesDropdown')
      .clickButton('@instancesListSecondItem')
      .waitForElementPresent('@instancesDropdown');
    client.pause(1000);
    const dropdown = leftMenuPage.elements.instancesDropdown.selector;

    client.getText('xpath', dropdown, (text) => {
      client.assert.equal(text.value, instanceNames[1]);
    });
  },
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
      .isModalClosed('@deleteInstanceModalTitle');

    instancesPage.expect.element('@emptyListItem').to.be.present.after(10000);
  }
};
