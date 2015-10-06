import utils from '../utils';

module.exports = {
  tags: ['api_keys'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage.navigate()
      .typeEmail()
      .typePassword()
      .clickSignInButton()
      .verifyLoginSuccessful();
  },

  after(client) {
    client.end();
  },

  'Test Add Api Key': function AddApiKey(client) {
    const apiKeysPage = client.page.apiKeysPage();
    const description = utils.addSuffix('api_key_description');

    apiKeysPage.navigate()
      .clickButton('@addApiKeyButton')
      .fillApiKeyDescription(description)
      .clickButton('@confirmButton')

      .waitForModalToClose()
      .waitForElementVisible('@apiKeysTableRow');
  },
  'Test Reset Api Key': function ResetApiKey(client) {
    const apiKeysPage = client.page.apiKeysPage();
    let apiKeyValue = null;

    apiKeysPage.navigate()
      .waitForElementPresent('@apiKeyValue');

    const apiKeyValueElement = apiKeysPage.elements.apiKeyValue.selector;

    client.element('xpath', apiKeyValueElement, function(result) {
      client.elementIdText(result.value.ELEMENT, function(text) {
        apiKeyValue = text.value;
      });
    })
    apiKeysPage.clickButton('@selectApiKey')
      .clickButton('@resetButton');
    client.pause(1000);
    apiKeysPage.clickButton('@confirmButton')
      .waitForElementPresent('@selectApiKey');
    client.pause(1000)
      .element('xpath', apiKeyValueElement, function(result) {
        client.elementIdText(result.value.ELEMENT, function(text) {
          client.assert.notEqual(text.value, apiKeyValue);
        });
      })
  },
  'Test Delete Api Key': function DeleteApiKey(client) {
    const apiKeysPage = client.page.apiKeysPage();

    apiKeysPage.navigate()
      .clickButton('@selectApiKey')
      .clickButton('@deleteButton');
    client.pause(1000);
    apiKeysPage.clickButton('@confirmButton');
    client.pause(1000);
    apiKeysPage.waitForElementNotPresent('@selectApiKey');
  }
};
