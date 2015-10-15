module.exports = {
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
  'Test Add Instance from welcome dialog': function addInstanceDialog(client) {
    const instancesPage = client.page.instancesPage();

    instancesPage.navigate();
    instancesPage.waitForElementPresent('@emptyListItem');
    instancesPage.clickButton('@welcomeDialogCreateInstance');
    instancesPage.fillInstanceDescription('nightwatch_test_instance_description');
    instancesPage.expect.element('@addInstanceModalTitle').to.be.present.after(10000);
    instancesPage.clickButton('@confirmButton');
    instancesPage.isModalClosed('@addInstanceModalTitle');

    instancesPage.expect.element('@instancesTableRow').to.be.present.after(10000);
    instancesPage.expect.element('@instancesTableRow').to.contain.text('nightwatch_test_instance_description');
  },
  'Test Edit Instance': function editInstance(client) {
    const instancesPage = client.page.instancesPage();

    instancesPage.navigate();
    instancesPage.clickSelectInstance();
    instancesPage.clickButton('@editButton');
    instancesPage.fillInstanceDescription('nightwatch_test_instance_new_description');
    instancesPage.clickButton('@confirmButton');
    instancesPage.isModalClosed('@editInstanceModalTitle');

    instancesPage.expect.element('@instancesTableRowDescription').to.be.present.after(10000);
    instancesPage.expect.element('@instancesTableRowDescription')
    .to.contain.text('nightwatch_test_instance_new_description');
  },
  'Test Select/Deselect Instance': function selectDeselectInstance(client) {
    const instancesPage = client.page.instancesPage();

    instancesPage.navigate();
    instancesPage.clickSelectInstance();
    instancesPage.waitForElementPresent('@instanceSelected');
    instancesPage.clickSelectInstance();
    instancesPage.waitForElementNotPresent('@instanceSelected');
  },
  'Test Delete Instance': function deleteInstance(client) {
    const instancesPage = client.page.instancesPage();

    instancesPage.navigate();
    instancesPage.clickSelectInstance();
    instancesPage.clickButton('@deleteButton');
    client.pause(1000);
    instancesPage.clickButton('@confirmDeleteButton');
    instancesPage.isModalClosed('@deleteInstanceModalTitle');

    instancesPage.expect.element('@emptyListItem').to.be.present.after(10000);
  },
  'Add an Instance from empty list item': function addInstanceListItem(client) {
    const instancesPage = client.page.instancesPage();

    instancesPage.navigate();
    instancesPage.waitForElementPresent('@emptyListItem');
    instancesPage.clickButton('@emptyListItem');
    instancesPage.expect.element('@addInstanceModalTitle').to.be.present.after(10000);
    instancesPage.fillInstanceDescription('nightwatch_test_instance');
    instancesPage.clickButton('@confirmButton');
    instancesPage.isModalClosed('@addInstanceModalTitle');
    instancesPage.waitForElementVisible('@instanceDescription')
  },
  'Test Create multiple Instances by FAB': function addInstancesFab(client) {
    const instancesPage = client.page.instancesPage();
    let i = 0;

    instancesPage.navigate();
    for (i; i < 2; i += 1) {
      instancesPage.clickFAB();
      instancesPage.expect.element('@addInstanceModalTitle').to.be.present.after(10000);
      instancesPage.clickButton('@confirmButton');
      instancesPage.isModalClosed('@addInstanceModalTitle');
    }
    instancesPage.expect.element('@instancesTableRow').to.be.present.after(10000);
  },
  'Test Instances Dropdown': function instancesDropdown(client) {
    const instancesPage = client.page.instancesPage();
    const leftMenuPage = client.page.leftMenuPage();
    const instanceNames = [];

    instancesPage.navigate();
    instancesPage.waitForElementPresent('@instancesTableName');
    const instanceName = instancesPage.elements.instancesTableName;

    client.elements(instanceName.locateStrategy, instanceName.selector, function(result) {
      result.value.forEach(function(value) {
        client.elementIdText(value.ELEMENT, function(el) {
          instanceNames.push(el.value);
        });
      });
    });
    instancesPage.waitForElementPresent('@instancesTableRow', function() {
    });
    instancesPage.clickButton('@instancesTableRow');
    leftMenuPage.clickButton('@instancesDropdown');
    leftMenuPage.clickButton('@instancesListSecondItem');
    leftMenuPage.waitForElementPresent('@instancesDropdown');
    const instancesDropdownItems = leftMenuPage.elements.instancesDropdownItems.selector;

    client.element('xpath', instancesDropdownItems, function(result) {
      const elementId = result.value.ELEMENT;

      client.pause(1000);
      client.elementIdText(elementId.toString(), function(text) {
        client.assert.equal(text.value, instanceNames[0]);
      });
    })
  },
  'Test Delete multiple Instances': function deleteInstances(client) {
    const instancesPage = client.page.instancesPage();

    instancesPage.navigate();
    instancesPage.waitForElementPresent('@selectInstance');
    instancesPage.moveToElement('@selectInstance', 0, 0);
    instancesPage.clickButton('@instanceToSelect')
    instancesPage.clickButton('@selectButton');
    instancesPage.clickButton('@deleteButton');
    client.pause(1000);
    instancesPage.clickButton('@confirmDeleteButton');
    instancesPage.isModalClosed('@deleteInstanceModalTitle');

    instancesPage.expect.element('@emptyListItem').to.be.present.after(10000);
  }
};
