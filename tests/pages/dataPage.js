const globals = require('../globals');
const utils = require('../utils');

const dataCommands = {
  clickButton: function(button) {
    return this.waitForElementVisible(button)
      .click(button);
  },
  selectFromDropdown: function(field, value) {
    return this.waitForElementVisible(field)
      .click(field)
      .waitForElementVisible(value)
      .click(value);
  },
  fillInputField: function(field, value) {
    return this.waitForElementVisible(field)
      .clearValue(field)
      .setValue(field, value);
  },
  clickWebhookDropdown: function() {
    return this.waitForElementVisible('@webhookDropdown').click('@webhookDropdown');
  }
};

module.exports = {
  url: 'https://localhost:8080/#/instances/' + globals.instanceName + '/webhooks',
  commands: [dataCommands],
  elements: {
    webhookDropdown: {
      selector: '//span[@class="synicon-dots-vertical"]',
      locateStrategy: 'xpath'
    },
    editDropdownItem: {
      selector: '//a[@class="dropdown-item-edit"]',
      locateStrategy: 'xpath'
    },
    instancesDropdown: {
      selector: '.instances-dropdown'
    },
    cogIcon: {
      selector: '.synicon-cog'
    },
    confirmButton: {
      selector: '//span[text()="Confirm"]',
      locateStrategy: 'xpath'
    },
    deleteButton: {
      selector: '//span[@class="synicon-delete"]',
      locateStrategy: 'xpath'
    },
    editButton: {
      selector: '//span[@class="synicon-pencil"]',
      locateStrategy: 'xpath'
    },
    addWebhookButton: {
      selector: '.synicon-arrow-up-bold'
    },
    webhookListItem: {
      selector: '//div[text()="webhook_description"]',
      locateStrategy: 'xpath'
    },
    addWebhookModalTitle: {
      selector: '//h3[text()="Add a Webhook"]',
      locateStrategy: 'xpath'
    },
    addWebhookModalNameInput: {
      selector: '//input[@name="name"]',
      locateStrategy: 'xpath'
    },
    addWebhookModalDescriptionInput: {
      selector: '//input[@name="description"]',
      locateStrategy: 'xpath'
    },
    addWebhookModalCodeboxDropdown: {
      selector: '//div[@class="codebox-dropdown"]',
      locateStrategy: 'xpath'
    },
    addWebhookModalCodeboxDropdownChoice: {
      selector: '//div[@class="codebox-dropdown"]//span[text()="codebox"]',
      locateStrategy: 'xpath'
    },
    webhookTableRow: {
      selector: '//div[text()="' + utils.addSuffix('webhook') + '"]',
      locateStrategy: 'xpath'
    },
    selectWebhookTableRow: {
      selector: '//div[text()="' + utils.addSuffix('webhook') + '"]/../div[1]/span',
      locateStrategy: 'xpath'
    },
    webhookTableRowDescription: {
      selector: '//div[text()="' + utils.addSuffix('webhook') + '"]/../following-sibling::div[1]',
      locateStrategy: 'xpath'
    },
    deleteWebhookModalTitle: {
      selector: '//h3[text()="Delete a Webhook"]',
      locateStrategy: 'xpath'
    },
    editWebhookModalTitle: {
      selector: '//h3[text()="Edit a Webhook"]',
      locateStrategy: 'xpath'
    },
    dataListItem: {
      selector: '//div[text()="data_view"]',
      locateStrategy: 'xpath'
    },
    dataListItemTitle: {
      selector: '//div[text()="Data Endpoints"]',
      locateStrategy: 'xpath'
    }
  }
};
