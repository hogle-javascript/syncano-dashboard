var utils = require('../utils');

var apiKeysCommands = {
  clickButton: function(button) {
    return this.waitForElementVisible(button)
      .click(button);
  },
  fillApiKeyDescription: function(description) {
    return this.waitForElementVisible('@createModalDescriptionInput', 1000)
      .clearValue('@createModalDescriptionInput')
      .setValue('@createModalDescriptionInput', description);
  },
  waitForModalToClose: function() {
    return this.waitForElementNotVisible('@createModalDescriptionInput')
      .waitForElementVisible('@apiKeysTableRow');
  }
};

module.exports = {
  url: 'https://localhost:8080/#/instances/',
  commands: [apiKeysCommands],
  elements: {
    addApiKeyButton: {
      selector: '//span[@class="synicon-plus"]',
      locateStrategy: 'xpath'
    },
    apiKeysListName: {
      selector: '//div[text()="API Keys"]',
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
      selector: 'button span[data-reactid*="$submitLabel"]'
    },
    apiKeysTableRow: {
      selector: '//div[text()="' + utils.addSuffix('test_api_key_description') + '"]',
      locateStrategy: 'xpath'
    },
    selectApiKey: {
      selector: '//span[@class="synicon-key"]',
      locateStrategy: 'xpath'
    },
    deleteButton: {
      selector: '.synicon-delete'
    },
    confirmDeleteButton: {
      selector: '//span[text()="Confirm"]',
      locateStrategy: 'xpath'
    },
  }
};
