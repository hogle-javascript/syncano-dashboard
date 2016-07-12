import accounts from '../../tempAccounts';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['apiKeys'],
  before(client) {
    const loginPage = client.page.loginPage();
    const { email, password } = accounts.instanceUser;

    loginPage
      .navigate()
      .setResolution(client)
      .login(email, password);
  },

  after(client) {
    client.end();
  },

  'Test Add Api Key': (client) => {
    const apiKeysPage = client.page.apiKeysPage();
    const description = utils.addSuffix();
    const { instanceName } = accounts.instanceUser;

    apiKeysPage
      .goToUrl(instanceName, 'api-keys')
      .clickElement('@addApiKeyButton')
      .fillInput('@createModalDescriptionInput', description)
      .clickElement('@confirmButton')
      .waitForModalToClose()
      .waitForElementVisible('@apiKeysTableRow');
  },
  'Test Reset Api Key': (client) => {
    const apiKeysPage = client.page.apiKeysPage();
    const description = utils.addSuffix();
    const { instanceName } = accounts.instanceUser;
    let apiKeyValue = null;

    apiKeysPage
      .goToUrl(instanceName, 'api-keys')
      .waitForElementPresent('@apiKeyValue');

    const apiKeyValueElement = apiKeysPage.elements.apiKeyValue.selector;

    client.element('xpath', apiKeyValueElement, (result) => {
      client.elementIdText(result.value.ELEMENT, (text) => apiKeyValue = text.value);
    });

    apiKeysPage
      .clickListItemDropdown(description, 'Reset')
      .clickElement('@confirmButton');

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
    const description = utils.addSuffix();
    const { instanceName } = accounts.instanceUser;

    apiKeysPage
      .goToUrl(instanceName, 'api-keys')
      .clickListItemDropdown(description, 'Delete')
      .clickElement('@confirmButton')
      .waitForElementNotPresent('@selectApiKey');
  }
});
