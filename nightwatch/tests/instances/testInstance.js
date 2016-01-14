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
  'Go to an Instance from welcome screen': (client) => {
    const instancesPage = client.page.instancesPage();
    const socketsPage = client.page.socketsPage();

    client.pause(1000);

    instancesPage
      .navigate()
      .clickElement('@welcomeDialogButton');

    socketsPage
      .waitForElementVisible('@emptySocketsHeading');
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
  'Test Select/Deselect Instance': (client) => {
    const instancesPage = client.page.instancesPage();

    instancesPage
      .navigate()
      .clickElement('@selectInstance')
      .waitForElementVisible('@instanceSelected')
      .clickElement('@selectInstance')
      .waitForElementNotPresent('@instanceSelected');
  },
  'Test Delete Instance': (client) => {
    const instancesPage = client.page.instancesPage();

    instancesPage
      .navigate()
      .clickListItemDropdown('@instanceDropdown', 'Delete')
      .clickElement('@confirmDeleteButton')
      .waitForElementNotPresent('@deleteInstanceModalTitle');

    instancesPage.expect.element('@emptyListItem').to.be.present.after(10000);
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
  }
};