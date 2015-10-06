import utils from '../utils';
import globals from '../globals';

const apiKeysCommands = {
  clickButton(button) {
    return this.waitForElementVisible(button)
      .click(button);
  },
  fillApiKeyDescription(description) {
    return this.waitForElementVisible('@createModalDescriptionInput')
      .clearValue('@createModalDescriptionInput')
      .setValue('@createModalDescriptionInput', description);
  },
  waitForModalToClose() {
    return this.waitForElementNotVisible('@createModalDescriptionInput')
      .waitForElementVisible('@apiKeysTableRow');
  }
};

module.exports = {
  url: `https://localhost:8080/#/instances/${globals.instanceName}/api_keys`,
  commands: [apiKeysCommands],
  elements: {
    addApiKeyButton: {
      selector: '//span[@class="synicon-plus"]',
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
      selector: `//div[text()="${utils.addSuffix('api_key_description')}"]`,
      locateStrategy: 'xpath'
    },
    selectApiKey: {
      selector: `//div[text()="${utils.addSuffix('api_key_description')}"]/preceding-sibling::div//span`,
      locateStrategy: 'xpath'
    },
    apiKeyValue: {
      selector: `//div[text()="${utils.addSuffix('api_key_description')}"]/../following-sibling::div[2]/div[1]`,
      locateStrategy: 'xpath'
    },
    deleteButton: {
      selector: '.synicon-delete'
    },
    resetButton: {
      selector: '.synicon-backup-restore'
    }
  }
};
