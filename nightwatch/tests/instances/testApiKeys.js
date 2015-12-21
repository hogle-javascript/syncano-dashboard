import utils from '../../utils';

export default {
  tags: ['api_keys'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .login(process.env.NIGHTWATCH_EMAIL, process.env.NIGHTWATCH_PASSWORD);
  },

  after(client) {
    client.end();
  },

  'Test Add Api Key': (client) => {
    const apiKeysPage = client.page.apiKeysPage();
    const description = utils.addSuffix('api_key_description');

    apiKeysPage.navigate();
    apiKeysPage.clickButton('@addApiKeyButton', client);
    apiKeysPage.fillInputField('@createModalDescriptionInput', description, client);
    apiKeysPage.clickButton('@confirmButton', client);
    apiKeysPage.waitForModalToClose();
    apiKeysPage.waitForElementVisible('@apiKeysTableRow');
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
    apiKeysPage.clickButton('@selectApiKey', client);
    apiKeysPage.clickButton('@apiKeysListMenu', client);
    apiKeysPage.clickButton('@resetButton', client);
    apiKeysPage.clickButton('@confirmButton', client);
    apiKeysPage.waitForElementPresent('@selectApiKey');
    client.pause(1000)
      .element('xpath', apiKeyValueElement, (result) => {
        client.elementIdText(result.value.ELEMENT, (text) => {
          client.assert.notEqual(text.value, apiKeyValue);
        });
      });
  },
  'Test Delete Api Key': (client) => {
    const apiKeysPage = client.page.apiKeysPage();

    apiKeysPage.navigate();
    apiKeysPage.clickButton('@selectApiKey', client);
    apiKeysPage.clickButton('@apiKeysListMenu', client);
    apiKeysPage.clickButton('@deleteButton', client);
    apiKeysPage.clickButton('@confirmButton', client);
    apiKeysPage.waitForElementNotPresent('@selectApiKey');
  }
};
