import accounts from '../../tempAccounts';
import utils from '../../utils';

export default {
  tags: ['administrators'],
  before: (client) => {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .setResolution(client)
      .login(accounts.instanceUser.email, accounts.instanceUser.password);
  },
  after: (client) => {
    client.end();
  },
  'User invites an Administrator': (client) => {
    const email = utils.addSuffix('admin') + '@syncano.com';
    const adminsPage = client.page.adminsPage();

    adminsPage
      .navigate()
      .waitForElementVisible('@adminsListItem')
      .clickElement('@addAdminButton')
      .waitForElementVisible('@addAdminModalTitle')
      .fillInput('@addAdminModalEmailInput', email)
      .selectDropdownValue('@addAdminModalRoleDropdown', 'read')
      .clickElement('@confirmButton')
      .waitForElementVisible('@adminEmailTableRow');
  },
  'User deletes an Administrator invitation': (client) => {
    const adminsPage = client.page.adminsPage();
    const listsPage = client.page.listsPage();

    adminsPage
      .navigate()
      .clickElement('@selectAdminTableRow')
      .clickElement('@deleteButton')
      .waitForElementVisible('@deleteAdminModalTitle')
      .clickElement('@confirmButton')
      .waitForElementNotPresent('@adminEmailTableRow');

    listsPage
      .waitForElementVisible('@emptyListItem');
  }
};
