module.exports = {
  tags: ['instances'],
  before: function(client) {
    const signupPage = client.page.signupPage();
    const slug = Date.now();
    const email = 'syncano.bot+' + slug + '@syncano.com';

    signupPage.navigate();
    signupPage.setValue('@emailInput', email);
    signupPage.setValue('@passInput', slug);
    signupPage.clickSubmitButton();
  },
  after: function(client) {
    client.end();
  },
  'Test Add Instance from welcome dialog': function(client) {
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
  'Test Edit Instance': function(client) {
    const instancesPage = client.page.instancesPage();

    instancesPage.navigate();
    instancesPage.clickDropdown();
    instancesPage.clickButton('@editDropdownItem');
    instancesPage.fillInstanceDescription('nightwatch_test_instance_new_description');
    instancesPage.clickButton('@confirmButton');
    instancesPage.isModalClosed('@editInstanceModalTitle');

    instancesPage.expect.element('@instancesTableRow').to.be.present.after(10000);
    instancesPage.expect.element('@instancesTableRow')
    .to.contain.text('nightwatch_test_instance_new_description');
  },
  'Test Select/Deselect Instance': function(client) {
    const instancesPage = client.page.instancesPage();

    instancesPage.navigate();
    instancesPage.clickSelectInstance();
    instancesPage.waitForElementPresent('@instanceSelected');
    instancesPage.clickSelectInstance();
    instancesPage.waitForElementNotPresent('@instanceSelected');
  },
  'Test Delete Instance': function(client) {
    const instancesPage = client.page.instancesPage();

    instancesPage.navigate();
    instancesPage.clickSelectInstance();
    instancesPage.clickButton('@deleteButton');
    client.pause(1000);
    instancesPage.clickButton('@confirmDeleteButton');
    instancesPage.isModalClosed('@deleteInstanceModalTitle');

    instancesPage.expect.element('@emptyListItem').to.be.present.after(10000);
  },
  'Add an Instance from empty list item': function(client){
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
  'Test Create multiple Instances by FAB': function(client) {
    const instancesPage = client.page.instancesPage();
    var i = 0;

    instancesPage.navigate();
    for (i; i < 2; i += 1) {
      instancesPage.clickFAB();
      instancesPage.expect.element('@addInstanceModalTitle').to.be.present.after(10000);
      instancesPage.clickButton('@confirmButton');
      instancesPage.isModalClosed('@addInstanceModalTitle');
    }
    instancesPage.expect.element('@instancesTableRow').to.be.present.after(10000);
  },
  'Test Delete multiple Instances': function(client) {
    const instancesPage = client.page.instancesPage();

    instancesPage.navigate();
    instancesPage.clickSelectInstance();
    instancesPage.clickButton('@selectButton');
    instancesPage.clickButton('@deleteButton');
    client.pause(1000);
    instancesPage.clickButton('@confirmDeleteButton');
    instancesPage.isModalClosed('@deleteInstanceModalTitle');

    instancesPage.expect.element('@emptyListItem').to.be.present.after(10000);
  }
};
