module.exports = {
  tags: ['api_keys'],
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
  'Test Go to API Keys View' : function(client) {
    var apiKeysPage = client.page.apiKeysPage();

    var instance = client.globals.instanceName;
    var url = apiKeysPage.url + instance + '/api_keys';
    client.url(url);

    apiKeysPage.expect.element('@addApiKeyButton').to.be.present.after(5000);
  },
  'Test Add Api Key': function(client) {
    var apiKeysPage = client.page.apiKeysPage();

    apiKeysPage.clickButton('@addApiKeyButton');
    apiKeysPage.fillApiKeyDescription('test_api_key_description');
    apiKeysPage.clickButton('@confirmButton');

    apiKeysPage.waitForModalToClose();

    apiKeysPage.expect.element('@apiKeysTableRow').to.be.present.after(5000);
    apiKeysPage.expect.element('@apiKeysTableRow').to.contain.text('test_api_key_description');
  },
  'Test Delete Api Key': function(client) {
    var apiKeysPage = client.page.apiKeysPage();

    apiKeysPage.clickButton('@selectApiKey');
    apiKeysPage.clickButton('@deleteButton');

    client.pause(1000);
    client.useXpath();
    apiKeysPage.clickButton('@confirmDeleteButton');
    client.useCss();
    client.pause(1000);

    apiKeysPage.expect.element('@apiKeysTableRow').to.be.not.present.after(5000);
  }
};
