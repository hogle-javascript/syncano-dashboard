import utils from '../../utils';

export default {
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

  'Test Add Api Key': (client) => {
    const apiKeysPage = client.page.apiKeysPage();
    const description = utils.addSuffix('api_key_description');

    apiKeysPage.navigate()
      .clickButton('@addApiKeyButton')
      .fillApiKeyDescription(description)
      .clickButton('@confirmButton')

      .waitForModalToClose()
      .waitForElementVisible('@apiKeysTableRow');
  },
  'Test Reset Api Key': (client) => {
    const apiKeysPage = client.page.apiKeysPage();
    let apiKeyValue = null;

    apiKeysPage
      .navigate()
      .waitForElementPresent('@apiKeyValue');

    const apiKeyValueElement = apiKeysPage.elements.apiKeyValue.selector;

    client.element('xpath', apiKeyValueElement, (result) => {
      client.elementIdText(result.value.ELEMENT, (text) => apiKeyValue = text.value);
    });
    apiKeysPage
      .clickButton('@selectApiKey')
      .clickButton('@apiKeysListMenu')
      .clickButton('@resetButton');
    client.pause(1000);
    apiKeysPage
      .clickButton('@confirmButton')
      .waitForElementPresent('@selectApiKey');
    client.pause(1000)
      .element('xpath', apiKeyValueElement, (result) => {
        client.elementIdText(result.value.ELEMENT, (text) => {
          client.assert.notEqual(text.value, apiKeyValue);
        });
      });
  },
  'Test Delete Api Key': (client) => {
    const apiKeysPage = client.page.apiKeysPage();

    apiKeysPage.navigate()
      .clickButton('@selectApiKey')
      .clickButton('@apiKeysListMenu')
      .clickButton('@deleteButton');
    client.pause(1000);
    apiKeysPage.clickButton('@confirmButton');
    client.pause(1000);
    apiKeysPage.waitForElementNotPresent('@selectApiKey');
  }
};
