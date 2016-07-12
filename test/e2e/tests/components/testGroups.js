import accounts from '../../tempAccounts';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['groups'],
  before(client) {
    const loginPage = client.page.loginPage();
    const { email, password } = accounts.instanceUser;

    loginPage
      .navigate()
      .setResolution(client)
      .login(email, password);
  },
  after(client) {
    client.end();
  },
  'Administrator adds a Group': (client) => {
    const usersPage = client.page.usersPage();
    const suffix = utils.addSuffix('group');
    const { instanceName } = accounts.instanceUser;

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
    const { instanceName } = accounts.instanceUser;

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
});
