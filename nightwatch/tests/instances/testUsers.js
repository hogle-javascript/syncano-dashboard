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
    usersPage.clickButton('@addGroupButton', client);
    usersPage.waitForElementPresent('@addGroupModalTitle');
    usersPage.fillInputField('@groupName', suffix, client);
    usersPage.clickButton('@confirm', client);
    usersPage.waitForElementPresent('@groupTableRow');
  },
  'Administrator deletes a Group': (client) => {
    const usersPage = client.page.usersPage();

    usersPage.navigate();
    usersPage.waitForElementVisible('@groupEditButton');
    usersPage.waitForElementVisible('@userList');
    usersPage.clickDropdown('@groupTableRowDropdown', client);
    usersPage.clickButton('@deleteButtonDropdown', client);
    usersPage.waitForElementPresent('@deleteGroupModalTitle');
    usersPage.clickButton('@confirm', client);
    usersPage.waitForElementVisible('@groupList');
    usersPage.waitForElementNotPresent('@groupTableRowDropdown');
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

