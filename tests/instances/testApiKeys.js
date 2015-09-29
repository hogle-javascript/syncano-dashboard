var utils = require('../utils');

module.exports = {
  tags: ['api_keys'],
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

  'Test Add Api Key': function(client) {
    var apiKeysPage = client.page.apiKeysPage();
    var description = utils.addSuffix('test_api_key_description');

    apiKeysPage.clickButton('@addApiKeyButton');
    apiKeysPage.fillApiKeyDescription(description);
    apiKeysPage.clickButton('@confirmButton');

    apiKeysPage.waitForModalToClose();

    apiKeysPage.expect.element('@apiKeysTableRow').to.be.present.after(5000);
  },

  'Test Delete Api Key': function(client) {
    var apiKeysPage = client.page.apiKeysPage();
    var description = utils.addSuffix('test_api_key_description');

    apiKeysPage.clickButton('@selectApiKey');
    apiKeysPage.clickButton('@deleteButton');
    client.pause(1000);
    apiKeysPage.clickButton('@confirmDeleteButton');
    client.pause(1000);
    apiKeysPage.expect.element('@apiKeysTableRow').to.be.not.present.after(5000);
  }
};
