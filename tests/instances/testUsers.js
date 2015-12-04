import utils from '../utils';

module.exports = {
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
  'Administrator adds a Group'(client) {
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
  'Administrator deletes a Group'(client) {
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
      .clickButton('@confirm')
      .waitForElementVisible('@groupList')
      .waitForElementNotPresent('@groupTableRowDropdown');
  }
  // 'Administrator adds a User' : function(client) {
  //   const usersPage = client.page.usersPage();
  //   const suffix = utils.addSuffix('user');

  //   usersPage.navigate();
  //   usersPage.waitForElementVisible('@groupEditButton');
  //   usersPage.waitForElementVisible('@userList')
  //   usersPage.clickButton('@addUserButton');
  //   usersPage.waitForElementPresent('@addUserModalTitle');
  //   usersPage.fillInputField('@username', suffix);
  //   usersPage.fillInputField('@password', suffix);
  //   usersPage.clickButton('@confirm');
  //   usersPage.waitForElementPresent('@userTableRow');
  // },
  // 'Administrator deletes a User' : function(client) {
  //   const usersPage = client.page.usersPage();

  //   usersPage.navigate();
  //   usersPage.waitForElementVisible('@groupEditButton');
  //   usersPage.waitForElementVisible('@userList')
  //   usersPage.clickButton('@selectUserTableRow');
  //   client.pause(1000);
  //   usersPage.clickButton('@deleteButton');
  //   client.pause(1000);
  //   usersPage.waitForElementPresent('@deleteUserModalTitle');
  //   client.pause(1000);
  //   usersPage.clickButton('@confirm');
  //   usersPage.waitForElementNotPresent('@userTableRow');
  // }
}
