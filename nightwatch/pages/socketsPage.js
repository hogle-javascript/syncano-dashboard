import utils from '../utils';
import globals from '../globals';

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

export default {
  url: 'https://localhost:8080/#/instances/' + globals.instanceName + '/sockets',
  commands: [dataCommands],
  elements: {
    snippetSocketDropDown: {
      selector: `//div[text()="${utils.addSuffix('codebox')}"]/../../../../..//button`,
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
    snippetSocketItem: {
      selector: '//div[text()="webhook_description"]',
      locateStrategy: 'xpath'
    },
    codeBoxSocketItemTraces: {
      selector: '//div[text()="webhook_description"]/following-sibling::div[1]/a',
      locateStrategy: 'xpath'
    },
    addCodeBoxModalTitle: {
      selector: '//h3[text()="Create a CodeBox Socket"]',
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
    addCodeBoxModalSnippetDropdown: {
      selector: '//div[@class="snippet-dropdown"]',
      locateStrategy: 'xpath'
    },
    addCodeBoxModalSnippetDropdownChoice: {
      selector: '//div[@class="snippet-dropdown"]//span[text()="snippet"]',
      locateStrategy: 'xpath'
    },
    codeBoxTableRow: {
      selector: `//div[text()="${utils.addSuffix('codebox')}"]`,
      locateStrategy: 'xpath'
    },
    selectCodeBoxTableRow: {
      selector: `//div[text()="${utils.addSuffix('codebox')}"]/../../div[1]/span`,
      locateStrategy: 'xpath'
    },
    codeBoxTableRowDescription: {
      selector: `//div[text()="${utils.addSuffix('codebox')}"]/../../../../following-sibling::div[1]`,
      locateStrategy: 'xpath'
    },
    deleteCodeBoxModalTitle: {
      selector: '//h3[text()="Delete a CodeBox Socket"]',
      locateStrategy: 'xpath'
    },
    editCodeBoxModalTitle: {
      selector: '//h3[text()="Edit a CodeBox Socket"]',
      locateStrategy: 'xpath'
    },
    dataListItem: {
      selector: '//div[text()="data_view"]',
      locateStrategy: 'xpath'
    },
    dataListItemTitle: {
      selector: '//div[text()="Data Sockets"]',
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
      selector: '//div[text()="Start building your app here"]',
      locateStrategy: 'xpath'
    }
  }
};
