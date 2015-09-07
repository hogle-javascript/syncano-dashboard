const utils = require('../utils');

module.exports = {
  tags: ['administrators'],
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
  'User adds Administrator' : function(client) {
    const email = utils.addSuffix('admin') + '@gmail.com';
    const administratorsPage = client.page.administratorsPage();

    administratorsPage.navigate();
    administratorsPage.waitForElementPresent('@administratorsListItem');
    administratorsPage.clickButton('@addAdministratorButton');
    administratorsPage.waitForElementPresent('@addAdministratorModalTitle');
    administratorsPage.fillInputField('@addAdministratorModalEmailInput', email);
    administratorsPage.selectFromDropdown('@addAdministratorModalRoleDropdown', '@addAdministratorModalRoleDropdownRead');
    administratorsPage.clickButton('@confirmButton');
    administratorsPage.waitForElementPresent('@administratorTableRow');
  }
};