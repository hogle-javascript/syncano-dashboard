import accounts from '../../tempAccounts';
import utils from '../../utils';

export default {
  tags: ['instance'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .setResolution(client)
      .login(accounts.instanceUser.email, accounts.instanceUser.password);
  },
  after(client) {
    client.end();
  },
  'Check if Instance has been created': (client) => {
    const instancesPage = client.page.instancesPage();

    instancesPage
      .waitForElementNotPresent('@setupText')
      .navigate()
      .waitForElementNotPresent('@emptyListItem')
      .waitForElementVisible('@selectInstance');
  },
  'Test Edit Instance': (client) => {
    const instancesPage = client.page.instancesPage();
    const newDescription = utils.addSuffix('description');

    instancesPage
      .navigate()
      .clickListItemDropdown('@instanceDropdown', 'Edit')
      .fillInput('@createModalDescriptionInput', newDescription)
      .clickElement('@confirmButton')
      .waitForElementNotPresent('@editInstanceModalTitle')
      .waitForElementVisible('@instancesTableName');

    instancesPage.expect.element('@instancesTableRow').to.contain.text(newDescription);
  }
  // 'Test Delete Instance': (client) => {
  //   const instancesPage = client.page.instancesPage();
  //
  //   instancesPage.navigate();
  //   client.pause(1000);
  //
  //   instancesPage
  //     .clickListItemDropdown('@instanceDropdown', 'Delete')
  //     .clickElement('@confirmDeleteButton')
  //     .waitForElementNotPresent('@deleteInstanceModalTitle');
  //
  //   instancesPage.expect.element('@emptyListItem').to.be.present.after(10000);
  // }
};
