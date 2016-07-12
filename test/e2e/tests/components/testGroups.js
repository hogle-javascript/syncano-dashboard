import accounts from '../../tempAccounts';
import utils from '../../utils';

export default {
  tags: ['groups'],
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
  'Administrator adds a Group': (client) => {
    const usersPage = client.page.usersPage();
    const suffix = utils.addSuffix('group');
    const instanceName = accounts.instanceUser.instanceName;

    usersPage
      .goToUrl(instanceName, 'users')
      .waitForElementVisible('@groupEditButton')
      .waitForElementVisible('@userList')
      .clickElement('@addGroupButton')
      .waitForElementPresent('@addGroupModalTitle')
      .fillInput('@groupName', suffix)
      .clickElement('@confirm')
      .waitForElementPresent('@groupTableRow');
  },
  'Administrator deletes a Group': (client) => {
    const usersPage = client.page.usersPage();
    const instanceName = accounts.instanceUser.instanceName;

    usersPage
      .goToUrl(instanceName, 'users')
      .waitForElementVisible('@groupEditButton')
      .waitForElementVisible('@userList')
      .clickListItemDropdown('@groupTableRowDropdown', 'Delete')
      .waitForElementPresent('@deleteGroupModalTitle')
      .clickElement('@confirm')
      .waitForElementVisible('@groupList')
      .waitForElementNotPresent('@groupTableRowDropdown');
  }
};

