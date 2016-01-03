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
  'Administrator adds a Group': (client) => {
    const usersPage = client.page.usersPage();
    const suffix = utils.addSuffix('group');

    usersPage
      .navigate()
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

    usersPage
      .navigate()
      .waitForElementVisible('@groupEditButton')
      .waitForElementVisible('@userList')
      .clickListItemDropdown('@groupTableRowDropdown', 'Delete')
      .waitForElementPresent('@deleteGroupModalTitle')
      .clickElement('@confirm')
      .waitForElementVisible('@groupList')
      .waitForElementNotPresent('@groupTableRowDropdown');
  }
  // 'Administrator adds a User': (client) => {
  //   const usersPage = client.page.usersPage();
  //   const suffix = utils.addSuffix('user');
  //
  //   usersPage
  //     .navigate()
  //     .waitForElementVisible('@groupEditButton')
  //     .waitForElementVisible('@userList')
  //     .clickElement('@addUserButton')
  //     .waitForElementPresent('@addUserModalTitle')
  //     .fillInputField('@username', suffix)
  //     .fillInputField('@password', suffix)
  //     .clickElement('@confirm')
  //     .waitForElementPresent('@userTableRow');
  // },
  // 'Administrator deletes a User': (client) => {
  //   const usersPage = client.page.usersPage();
  //
  //   usersPage
  //     .navigate()
  //     .waitForElementVisible('@groupEditButton')
  //     .waitForElementVisible('@userList')
  //     .clickElement('@selectUserTableRow')
  //     .clickElement('@usersListMenu')
  //     .clickElement('@deleteButton')
  //     .waitForElementPresent('@deleteUserModalTitle')
  //     .clickElement('@confirm')
  //     .waitForElementNotPresent('@userTableRow');
  // }
};

