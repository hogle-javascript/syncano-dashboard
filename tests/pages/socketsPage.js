const globals = require('../globals');
const utils = require('../utils');

const dataCommands = {
  clickButton(button) {
    return this.waitForElementVisible(button)
      .click(button);
  },
  selectFromDropdown(field, value) {
    return this.waitForElementVisible(field)
      .click(field)
      .waitForElementVisible(value)
      .click(value);
  },
  fillInputField(field, value) {
    return this.waitForElementVisible(field)
      .clearValue(field)
      .setValue(field, value);
  },
  clickWebhookDropdown() {
    return this.waitForElementVisible('@webhookDropdown').click('@webhookDropdown');
  }
};

module.exports = {
  url: 'https://localhost:8080/#/instances/' + globals.instanceName + '/sockets',
  commands: [dataCommands],
  elements: {
    webhookDropdown: {
      selector: `//div[text()="${utils.addSuffix('webhook')}"]/../../following-sibling::div[@class="col-menu"]`,
      locateStrategy: 'xpath'
    },
    editDropdownItem: {
      selector: '//a[@class="dropdown-item-edit"]',
      locateStrategy: 'xpath'
    },
    deleteDropdownItem: {
      selector: '//a[@class="dropdown-item-delete"]',
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
      selector: '.synicon-socket-codebox'
    },
    codeBoxSocketItem: {
      selector: '//div[text()="webhook_description"]',
      locateStrategy: 'xpath'
    },
    addWebhookModalTitle: {
      selector: '//h3[text()="Create a Webhook"]',
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
    addWebhookModalCodeBoxDropdown: {
      selector: '//div[@class="codebox-dropdown"]',
      locateStrategy: 'xpath'
    },
    addWebhookModalCodeBoxDropdownChoice: {
      selector: '//div[@class="codebox-dropdown"]//span[text()="codebox"]',
      locateStrategy: 'xpath'
    },
    webhookTableRow: {
      selector: `//div[text()="${utils.addSuffix('webhook')}"]`,
      locateStrategy: 'xpath'
    },
    selectWebhookTableRow: {
      selector: `//div[text()="${utils.addSuffix('webhook')}"]/../../div[1]/span`,
      locateStrategy: 'xpath'
    },
    webhookTableRowDescription: {
      selector: `//div[text()="${utils.addSuffix('webhook')}"]/../../following-sibling::div[1]`,
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
    },
    webhookToSelect: {
      selector: '.col-xs-12 .synicon-arrow-up-bold'
    },
    checkboxToSelect: {
      selector: '.synicon-checkbox-blank-outline'
    },
    checkboxSelected: {
      selector: '.synicon-checkbox-marked-outline'
    },
    selectMultipleButton: {
      selector: '.synicon-checkbox-multiple-marked-outline'
    },
    deselectMultipleButton: {
      selector: '.synicon-checkbox-multiple-blank-outline'
    },
    emptyListItem: {
      selector: '.empty-list-item'
    },
    dataSocketTableTitle: {
      selector: '//div[text()="Data Sockets"]',
      locateStrategy: 'xpath'
    }
  }
};
