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

    usersPage.navigate();
    usersPage.waitForElementVisible('@groupEditButton');
    usersPage.waitForElementVisible('@userList');
    usersPage.clickElement('@addGroupButton');
    usersPage.waitForElementPresent('@addGroupModalTitle');
    usersPage.fillInputField('@groupName', suffix);
    usersPage.clickElement('@confirm');
    usersPage.waitForElementPresent('@groupTableRow');
  },
  'Administrator deletes a Group': (client) => {
    const usersPage = client.page.usersPage();

    usersPage.navigate();
    usersPage.waitForElementVisible('@groupEditButton');
    usersPage.waitForElementVisible('@userList');
    usersPage.clickDropdown('@groupTableRowDropdown');
    usersPage.clickElement('@deleteButtonDropdown');
    usersPage.waitForElementPresent('@deleteGroupModalTitle');
    usersPage.clickElement('@confirm');
    usersPage.waitForElementVisible('@groupList');
    usersPage.waitForElementNotPresent('@groupTableRowDropdown');
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

