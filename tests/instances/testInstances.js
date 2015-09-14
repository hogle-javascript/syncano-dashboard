module.exports = {
  tags: ['instances'],
  before: function(client) {
    const signupPage = client.page.signupPage();
    const slug = Date.now();

    signupPage.navigate();
    signupPage.setValue('@emailInput', 'syncano.bot+' + slug + '@syncano.com');
    signupPage.setValue('@passInput', slug);
    signupPage.clickSubmitButton();
  },
  after: function(client) {
    client.end();
  },
  'Test Add Instance': function(client) {
    const instancesPage = client.page.instancesPage();

    instancesPage.waitForElementPresent('@emptyListItem');
    instancesPage.clickFAB();
    instancesPage.fillInstanceName();
    instancesPage.fillInstanceDescription('nightwatch_test_instance_description');
    instancesPage.expect.element('@addInstanceModalTitle').to.be.present.after(10000);
    instancesPage.clickButton('@confirmButton');
    instancesPage.isModalClosed('@addInstanceModalTitle');

    instancesPage.expect.element('@instancesTableRow').to.be.present.after(10000);
    instancesPage.expect.element('@instancesTableRow').to.contain.text('nightwatch_test_instance_description');
  },
  'Test Edit Instance': function(client) {
    const instancesPage = client.page.instancesPage();

    instancesPage.clickSelectInstance();
    instancesPage.clickButton('@editButton');
    instancesPage.fillInstanceDescription('nightwatch_test_instance_new_description');
    instancesPage.clickButton('@confirmButton');
    instancesPage.isModalClosed('@editInstanceModalTitle');

    instancesPage.expect.element('@instancesTableRowDescription').to.be.present.after(10000);
    instancesPage.expect.element('@instancesTableRowDescription')
    .to.contain.text('nightwatch_test_instance_new_description');
  },
  'Test Delete Instance': function(client) {
    const instancesPage = client.page.instancesPage();

    instancesPage.clickSelectInstance();
    instancesPage.clickButton('@deleteButton');
    client.pause(1000);
    instancesPage.clickButton('@confirmDeleteButton');
    instancesPage.isModalClosed('@deleteInstanceModalTitle');

    instancesPage.expect.element('@emptyListItem').to.be.present.after(10000);
  }
};
