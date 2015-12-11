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
  }
};

module.exports = {
  url: 'https://localhost:8080/#/instances/' + globals.instanceName + '/sockets',
  commands: [dataCommands],
  elements: {
    codeBoxSocketDropDown: {
      selector: `//div[text()="${utils.addSuffix('codeBox')}"]/../../../../..//button`,
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
    addCodeBoxButton: {
      selector: '//span[@class="synicon-socket-codebox"]',
      locateStrategy: 'xpath'
    },
    codeBoxSocketItem: {
      selector: '//div[text()="webhook_description"]',
      locateStrategy: 'xpath'
    },
    codeBoxSocketItemTraces: {
      selector: '//div[text()="webhook_description"]/following-sibling::div[1]/a',
      locateStrategy: 'xpath'
    },
    addCodeBoxModalTitle: {
      selector: '//h3[text()="Create a CodeBox"]',
      locateStrategy: 'xpath'
    },
    addCodeBoxModalNameInput: {
      selector: '//input[@name="name"]',
      locateStrategy: 'xpath'
    },
    addCodeBoxModalDescriptionInput: {
      selector: '//input[@name="description"]',
      locateStrategy: 'xpath'
    },
    addCodeBoxModalCodeBoxDropdown: {
      selector: '//div[@class="codebox-dropdown"]',
      locateStrategy: 'xpath'
    },
    addCodeBoxModalCodeBoxDropdownChoice: {
      selector: '//div[@class="codebox-dropdown"]//span[text()="codebox"]',
      locateStrategy: 'xpath'
    },
    codeBoxTableRow: {
      selector: `//div[text()="${utils.addSuffix('codeBox')}"]`,
      locateStrategy: 'xpath'
    },
    selectCodeBoxTableRow: {
      selector: `//div[text()="${utils.addSuffix('codeBox')}"]/../../div[1]/span`,
      locateStrategy: 'xpath'
    },
    codeBoxTableRowDescription: {
      selector: `//div[text()="${utils.addSuffix('codeBox')}"]/../../../../following-sibling::div[1]`,
      locateStrategy: 'xpath'
    },
    deleteCodeBoxModalTitle: {
      selector: '//h3[text()="Delete a CodeBox Socket"]',
      locateStrategy: 'xpath'
    },
    editCodeBoxModalTitle: {
      selector: '//h3[text()="Edit a CodeBox"]',
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
    codeBoxToSelect: {
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
    },
    emptySocketsHeading: {
      selector: '//div[text()="Start building your app here!"]',
      locateStrategy: 'xpath'
    }
  }
};
