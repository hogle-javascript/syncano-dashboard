import Utils from '../../utils';

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
    const description = Utils.addSuffix();

    apiKeysPage
      .navigate()
      .clickElement('@addApiKeyButton')
      .fillInput('@createModalDescriptionInput', description)
      .clickElement('@confirmButton')
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
      .clickElement('@selectApiKey')
      .clickElement('@apiKeysListMenu')
      .clickElement('@resetButton')
      .clickElement('@confirmButton')
      .waitForElementPresent('@selectApiKey');
    client
      .pause(1000)
      .element('xpath', apiKeyValueElement, (result) => {
        client.elementIdText(result.value.ELEMENT, (text) => {
          client.assert.notEqual(text.value, apiKeyValue);
        });
      });
  },
  'Test Delete Api Key': (client) => {
    const apiKeysPage = client.page.apiKeysPage();

    apiKeysPage
      .navigate()
      .clickElement('@selectApiKey')
      .clickElement('@apiKeysListMenu')
      .clickElement('@deleteButton')
      .clickElement('@confirmButton')
      .waitForElementNotPresent('@selectApiKey');
  }
};
