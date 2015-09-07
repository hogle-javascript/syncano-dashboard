const utils = require('../utils');

module.exports = {
  tags: ['administrators'],
  before: function(client) {
    const loginPage = client.page.loginPage();

    loginPage.goToLoginPage();
    loginPage.typeEmail();
    loginPage.typePassword();
    loginPage.clickSignInButton();
    loginPage.verifyLoginSuccessful();

  },
  after: function(client) {
    client.end();
  },
  'User adds an Administrator' : function(client) {
    const email = utils.addSuffix('admin') + '@gmail.com';
    const adminsPage = client.page.adminsPage();

    adminsPage.navigate();
    adminsPage.waitForElementPresent('@adminsListItem');
    adminsPage.clickButton('@addAdminButton');
    adminsPage.waitForElementPresent('@addAdminModalTitle');
    adminsPage.fillInputField('@addAdminModalEmailInput', email);
    adminsPage.selectFromDropdown('@addAdminModalRoleDropdown', '@addAdminModalRoleDropdownRead');
    adminsPage.clickButton('@confirmButton');
    adminsPage.waitForElementPresent('@adminTableRow');
  },
  'User deletes an Administrator' : function(client) {
    const adminsPage = client.page.adminsPage();

    adminsPage.navigate();
    adminsPage.clickButton('@selectAdminTableRow');
    adminsPage.clickButton('@deleteButton');
    adminsPage.waitForElementPresent('@deleteAdminModalTitle');
    client.pause(1000);
    adminsPage.clickButton('@confirmButton');
    adminsPage.waitForElementNotPresent('@selectAdminTableRow');
  }
};
