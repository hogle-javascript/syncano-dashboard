export default {
  tags: ['instance'],
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
