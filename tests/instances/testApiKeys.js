const utils = require('../utils');

module.exports = {
  tags: ['api_keys'],
  before: function(client) {
    const loginPage = client.page.loginPage();
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
    const apiKeysPage = client.page.apiKeysPage();
    const description = utils.addSuffix('api_key_description');

    apiKeysPage.navigate();
    apiKeysPage.clickButton('@addApiKeyButton');
    apiKeysPage.fillApiKeyDescription(description);
    apiKeysPage.clickButton('@confirmButton');

    apiKeysPage.waitForModalToClose();

    apiKeysPage.expect.element('@apiKeysTableRow').to.be.present.after(5000);
  },
  'Test Reset Api Key': function ResetApiKey(client) {
    const apiKeysPage = client.page.apiKeysPage();
    var apiKeyValue = null;

    apiKeysPage.navigate();
    apiKeysPage.waitForElementPresent('@apiKeyValue');
    const apiKeyValueElement = apiKeysPage.elements.apiKeyValue.selector;

    client.element('xpath', apiKeyValueElement, function(result) {
      client.elementIdText(result.value.ELEMENT, function(text) {
        apiKeyValue = text.value;
      });
    })
    apiKeysPage.clickButton('@selectApiKey');
    apiKeysPage.clickButton('@resetButton');
    client.pause(1000);
    apiKeysPage.clickButton('@confirmButton');
    apiKeysPage.waitForElementPresent('@selectApiKey');
    client.pause(1000);

    client.element('xpath', apiKeyValueElement, function(result) {
      client.elementIdText(result.value.ELEMENT, function(text) {
        client.assert.notEqual(text.value, apiKeyValue);
      });
    })
  },
  'Test Delete Api Key': function(client) {
    const apiKeysPage = client.page.apiKeysPage();

    apiKeysPage.navigate();
    apiKeysPage.clickButton('@selectApiKey');
    apiKeysPage.clickButton('@deleteButton');
    client.pause(1000);
    apiKeysPage.clickButton('@confirmButton');
    client.pause(1000);
    apiKeysPage.waitForElementNotPresent('@selectApiKey');
  }
};
