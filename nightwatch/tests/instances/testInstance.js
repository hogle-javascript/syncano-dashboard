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

    instancesPage.navigate();
    instancesPage.clickDropdown('@instanceDropdown');
    instancesPage.clickElement('@editDropdownItem');
    instancesPage.fillInstanceDescription('@createModalDescriptionInput', 'new_description', client);
    instancesPage.clickElement('@confirmButton');
    instancesPage.waitForElementNotPresent('@editInstanceModalTitle');
    instancesPage.waitForElementVisible('@instancesTableName');
    instancesPage.expect.element('@instancesTableRow').to.contain.text('new_description');
  },
  'Test Select/Deselect Instance': (client) => {
    const instancesPage = client.page.instancesPage();

    instancesPage.navigate();
    instancesPage.clickElement('@selectInstance');
    instancesPage.waitForElementVisible('@instanceSelected');
    instancesPage.clickElement('@selectInstance');
    instancesPage.waitForElementNotPresent('@instanceSelected');
  },
  'Test Delete Instance': (client) => {
    const instancesPage = client.page.instancesPage();

    instancesPage.navigate();
    instancesPage.clickDropdown('@instanceDropdown', client);
    instancesPage.clickElement('@deleteDropdownItem');
    instancesPage.clickElement('@confirmDeleteButton');
    instancesPage.waitForElementNotPresent('@deleteInstanceModalTitle');
    instancesPage.expect.element('@emptyListItem').to.be.present.after(10000);
  }
  // This test should be reanabled once we merge with the devel branch
  // 'Add an Instance from empty list item': (client) => {
  //   const instancesPage = client.page.instancesPage();

  //   instancesPage
  //     .navigate()
  //     .waitForElementPresent('@emptyListItem');
  //   client.pause(1000);
  //   instancesPage
  //     .clickButton('@emptyListItem')
  //     .fillInstanceDescription('@createModalDescriptionInput', 'nightwatch_test_instance')
  //     .clickButton('@confirmButton')
  //     .waitForElementNotVisible('@addInstanceModalTitle', 60000)
  //     .waitForElementVisible('@instanceDescription');
  // }
};
