import utils from '../utils';

export default {
  tags: ['users'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .typeEmail()
      .typePassword()
      .clickSignInButton()
      .verifyLoginSuccessful();
  },
  after(client) {
    client.end();
  },
  'Administrator adds a Group': (client) => {
    const usersPage = client.page.usersPage();
    const suffix = utils.addSuffix('group');

    usersPage.navigate()
      .waitForElementVisible('@groupEditButton')
      .waitForElementVisible('@userList')
      .clickButton('@addGroupButton')
      .waitForElementPresent('@addGroupModalTitle')
      .fillInputField('@groupName', suffix)
      .clickButton('@confirm')
      .waitForElementPresent('@groupTableRow');
  },
  'Administrator deletes a Group': (client) => {
    const usersPage = client.page.usersPage();

    usersPage
      .navigate()
      .waitForElementVisible('@groupEditButton')
      .waitForElementVisible('@userList')
      .clickDropdown('@groupTableRowDropdown');
    client.pause(1000);
    usersPage
      .clickButton('@deleteButtonDropdown')
      .waitForElementPresent('@deleteGroupModalTitle');
    client.pause(1000);
    usersPage
      .clickButton('@confirm');
    client.pause(1000);
    usersPage
      .waitForElementVisible('@groupList')
      .waitForElementNotPresent('@groupTableRowDropdown');
  },
  // 'Administrator adds a User': (client) => {
  //   const usersPage = client.page.usersPage();
  //   const suffix = utils.addSuffix('user');
  //
  //   usersPage
  //     .navigate()
  //     .waitForElementVisible('@groupEditButton')
  //     .waitForElementVisible('@userList')
  //     .clickButton('@addUserButton')
  //     .waitForElementPresent('@addUserModalTitle')
  //     .fillInputField('@username', suffix)
  //     .fillInputField('@password', suffix)
  //     .clickButton('@confirm')
  //     .waitForElementPresent('@userTableRow');
  // },
  // 'Administrator deletes a User': (client) => {
  //   const usersPage = client.page.usersPage();
  //
  //   usersPage
  //     .navigate()
  //     .waitForElementVisible('@groupEditButton')
  //     .waitForElementVisible('@userList')
  //     .clickButton('@selectUserTableRow')
  //     .clickButton('@usersListMenu')
  //     .clickButton('@deleteButton')
  //     .waitForElementPresent('@deleteUserModalTitle')
  //     .clickButton('@confirm')
  //     .waitForElementNotPresent('@userTableRow');
  // }
};

