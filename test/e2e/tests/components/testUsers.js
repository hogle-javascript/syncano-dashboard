import utils from '../../utils';
import accounts from '../../tempAccounts';

export default {
  tags: ['users'],
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
  'Administrator adds a User': (client) => {
    const usersPage = client.page.usersPage();
    const suffix = utils.addSuffix('user');
    const instanceName = accounts.instanceUser.instanceName;

    usersPage
      .goToUrl(instanceName, 'users')
      .waitForElementVisible('@groupEditButton')
      .waitForElementVisible('@userList')
      .clickElement('@addUserButton')
      .waitForElementPresent('@addUserModalTitle')
      .fillInput('@username', suffix)
      .fillInput('@password', suffix)
      .clickElement('@confirm')
      .waitForElementPresent('@userTableRow');
  },
  'Administrator deletes a User': (client) => {
    const usersPage = client.page.usersPage();
    const instanceName = accounts.instanceUser.instanceName;

    usersPage
      .goToUrl(instanceName, 'users')
      .waitForElementVisible('@groupEditButton')
      .waitForElementVisible('@userList')
      .clickListItemDropdown('@selectUserTableRow', 'Delete')
      .waitForElementPresent('@deleteUserModalTitle')
      .clickElement('@confirm')
      .waitForElementNotPresent('@userTableRow');
  }
};
