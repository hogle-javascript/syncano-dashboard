export default {
  tags: ['instance'],
  before(client) {
    const signupPage = client.page.signupPage();
    const slug = Date.now();
    const email = 'syncano.bot+' + slug + '@syncano.com';

    signupPage
      .navigate()
      .setValue('@emailInput', email)
      .setValue('@passInput', slug)
      .clickElement('@submitButton');
  },
  after(client) {
    client.end();
  },
  'Add an Instance from empty list item': (client) => {
    const instancesPage = client.page.instancesPage();

    instancesPage
      .navigate()
      .waitForElementPresent('@emptyListItem')
      .clickElement('@emptyListItem')
      .fillInstanceDescription('@createModalDescriptionInput', 'nightwatch_test_instance')
      .clickElement('@confirmButton')
      .waitForElementNotPresent('@addInstanceModalTitle')
      .waitForElementVisible('@instanceDescription');
  },
  'Test Edit Instance': (client) => {
    const instancesPage = client.page.instancesPage();

    instancesPage
      .navigate()
      .clickListItemDropdown('@instanceDropdown', 'Edit')
      .fillInput('@createModalDescriptionInput', 'new_description')
      .clickElement('@confirmButton')
      .waitForElementNotPresent('@editInstanceModalTitle')
      .waitForElementVisible('@instancesTableName');

    instancesPage.expect.element('@instancesTableRow').to.contain.text('new_description');
  },
  'Test Delete Instance': (client) => {
    const instancesPage = client.page.instancesPage();

    instancesPage.navigate();
    client.pause(1000);

    instancesPage
      .clickListItemDropdown('@instanceDropdown', 'Delete')
      .clickElement('@confirmDeleteButton')
      .waitForElementNotPresent('@deleteInstanceModalTitle');

    instancesPage.expect.element('@emptyListItem').to.be.present.after(10000);
  }
};
