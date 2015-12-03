const utils = require('../utils');

module.exports = {
  tags: ['users'],
  before: function(client) {
    var loginPage = client.page.loginPage();
    loginPage.navigate();
    loginPage.typeEmail();
    loginPage.typePassword();
    loginPage.clickSignInButton();
    loginPage.verifyLoginSuccessful();
  },
  after: function(client) {
    client.end();
  },
  'Administrator adds a Group' : function(client) {
    const usersPage = client.page.usersPage();
    const suffix = utils.addSuffix('group');

    usersPage.navigate();
    usersPage.waitForElementVisible('@groupEditButton');
    usersPage.waitForElementVisible('@userList')
    usersPage.clickButton('@addGroupButton');
    usersPage.waitForElementPresent('@addGroupModalTitle');
    usersPage.fillInputField('@groupName', suffix);
    usersPage.clickButton('@confirm');
    usersPage.waitForElementPresent('@groupTableRow');
  },
  'Administrator deletes a Group' : function(client) {
    const usersPage = client.page.usersPage();

    usersPage.navigate();
    usersPage.waitForElementVisible('@groupEditButton');
    usersPage.waitForElementVisible('@userList');
    usersPage.clickDropdown('@groupTableRowDropdown');
    client.pause(1000);
    usersPage.clickButton('@deleteButtonDropdown');
    usersPage.waitForElementPresent('@deleteGroupModalTitle');
    client.pause(1000);
    usersPage.clickButton('@confirm');
    usersPage.waitForElementVisible('@groupList');
    usersPage.waitForElementNotPresent('@groupTableRowDropdown');
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
