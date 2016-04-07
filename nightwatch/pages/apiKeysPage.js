import utils from '../utils';
import globals from '../globals';

const apiKeysCommands = {
  waitForModalToClose() {
    return this.waitForElementNotPresent('@createModalDescriptionInput')
               .waitForElementVisible('@apiKeysTableRow');
  }
};

export default {
  url: `https://localhost:8080/#/instances/${globals.instanceName}/api-keys`,
  commands: [apiKeysCommands],
  elements: {
    addApiKeyButton: {
      selector: '//span[text()="Add"]',
      locateStrategy: 'xpath'
    },
    apiKeysListMenu: {
      selector: '//div[@class="api-keys-list"]/div[1]/div[@class="col-menu"]//button',
      locateStrategy: 'xpath'
    },
    apiKeysListItem: {
      selector: '//div[@class="api-keys-list"]//div[text()="api_key"]',
      locateStrategy: 'xpath'
    },
    createModalDescriptionInput: {
      selector: 'input[name="description"]'
    },
    createModalIgnoreACLInput: {
      selector: 'input[name="ignore_acl"]'
    },
    createModalAllowUserCreate: {
      selector: 'input[name="allow_user_create"]'
    },
    confirmButton: {
      selector: '//span[text()="Confirm"]',
      locateStrategy: 'xpath'
    },
    apiKeysTableRow: {
      selector: `//div[text()="${utils.addSuffix('')}"]`,
      locateStrategy: 'xpath'
    },
    selectApiKey: {
      selector: `//div[text()="${utils.addSuffix('')}"]/../../preceding-sibling::div//span`,
      locateStrategy: 'xpath'
    },
    apiKeyValue: {
      selector: `//div[text()="${utils.addSuffix('')}"]/../following-sibling::div/div/div/div/div/div`,
      locateStrategy: 'xpath'
    },
    deleteButton: {
      selector: '//div[text()="Delete an API Key"]',
      locateStrategy: 'xpath'
    },
    resetButton: {
      selector: '//div[text()="Reset an API Key"]',
      locateStrategy: 'xpath'
    }
  }
};
