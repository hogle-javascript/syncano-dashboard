import utils from '../../utils';

export default {
  tags: ['users'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .login(process.env.NIGHTWATCH_EMAIL, process.env.NIGHTWATCH_PASSWORD);
  },
  after(client) {
    client.end();
  },
  'Administrator adds a User': (client) => {
    const usersPage = client.page.usersPage();
    const suffix = utils.addSuffix('user');

    usersPage
      .navigate()
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

    usersPage
      .navigate()
      .waitForElementVisible('@groupEditButton')
      .waitForElementVisible('@userList')
      .clickListItemDropdown('@selectUserTableRow', 'Delete')
      .waitForElementPresent('@deleteUserModalTitle')
      .clickElement('@confirm')
      .waitForElementNotPresent('@userTableRow');
  }
};

