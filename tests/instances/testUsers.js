var utils = require('../utils');

module.exports = {
  tags: ['users'],
  before: function(client) {
    var loginPage = client.page.loginPage();
    loginPage.goToLoginPage();
    loginPage.typeEmail();
    loginPage.typePassword();
    loginPage.clickSignInButton();
    loginPage.verifyLoginSuccessful();

  },
  after: function(client) {
    client.end();
  },
  'Administrator adds a Group' : function(client) {
    var usersPage = client.page.usersPage();
    usersPage.navigate();

    var suffix = utils.addSuffix('group');

    usersPage.clickButton('@addGroupButton');
    usersPage.waitForElementPresent('@addGroupModalTitle');

    usersPage.fillInputField('@groupName', suffix);

    usersPage.clickButton('@confirm');

    usersPage.waitForElementPresent('@groupTableRow');
  },
  'Administrator deletes a Group' : function(client) {
    var usersPage = client.page.usersPage();
    usersPage.navigate();

    usersPage.clickButton('@groupTableRowDropdown');
    usersPage.clickButton('@deleteButtonDropdown');

    usersPage.waitForElementPresent('@deleteGroupModalTitle');
    client.pause(1000);

    usersPage.clickButton('@confirm');

    usersPage.waitForElementNotPresent('@groupTableRowDropdown');
  },
  'Administrator adds a User' : function(client) {
    var usersPage = client.page.usersPage();
    usersPage.navigate();

    var suffix = utils.addSuffix('user');

    usersPage.clickButton('@addUserButton');
    usersPage.waitForElementPresent('@addUserModalTitle');

    usersPage.fillInputField('@username', suffix);
    usersPage.fillInputField('@password', suffix);

    usersPage.clickButton('@confirm');

    usersPage.waitForElementPresent('@userTableRow');
  },
  'Administrator deletes a User' : function(client) {
    var usersPage = client.page.usersPage();
    usersPage.navigate();

    usersPage.clickButton('@selectUserTableRow');
    usersPage.clickButton('@deleteButton');

    usersPage.waitForElementPresent('@deleteUserModalTitle');
    client.pause(1000);

    usersPage.clickButton('@confirm');

    usersPage.waitForElementNotPresent('@selectUserTableRow');
  }
};