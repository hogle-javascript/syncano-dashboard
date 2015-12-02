const instancesCommands = {
  clickFAB() {
    return this.waitForElementVisible('@fab')
      .click('@fab')
      .waitForElementVisible('@confirmButton');
  },
  fillInstanceDescription(description) {
    return this.waitForElementVisible('@createModalDescriptionInput')
      .clearValue('@createModalDescriptionInput')
      .setValue('@createModalDescriptionInput', description);
  },
  clickSelectInstance() {
    return this.waitForElementVisible('@selectInstance').click('@selectInstance');
  },
  clickButton(button) {
    return this.waitForElementVisible(button).click(button);
  },
  clickDropdown() {
    return this.waitForElementVisible('@instanceDropdown').click('@instanceDropdown');
  },
  isModalClosed(element) {
    return this.waitForElementNotVisible(element);
  }
};

export default {
  url: 'https://localhost:8080/#/instances',
  commands: [instancesCommands],
  elements: {
    instanceDropdown: {
      selector: '//span[@class="synicon-dots-vertical"]',
      locateStrategy: 'xpath'
    },
    instancesTable: {
      selector: 'div[id=instances]'
    },
    fab: {
      selector: '.synicon-plus'
    },
    createModalNameInput: {
      selector: 'input[name=name]'
    },
    createModalDescriptionInput: {
      selector: 'input[name=description]'
    },
    confirmButton: {
      selector: '//span[text()="Confirm"]',
      locateStrategy: 'xpath'
    },
    confirmDeleteButton: {
      selector: 'button[data-reactid*="$deleteInstanceDialog"] + button'
    },
    instancesTableRow: {
      selector: '//div[@class="description-field col-flex-1"]',
      locateStrategy: 'xpath'
    },
    instancesTableName: {
      selector: '//div[@class="instances-list-container"]/div[2]/div/div[1]/div[2]',
      locateStrategy: 'xpath'
    },
    selectInstance: {
      selector: '//div[@class="instances-list-container"]//span[contains(@class, "synicon")]',
      locateStrategy: 'xpath'
    },
    editDropdownItem: {
      selector: '//a[@class="dropdown-item-instance-edit"]',
      locateStrategy: 'xpath'
    },
    editButton: {
      selector: '.synicon-pencil'
    },
    deleteButton: {
      selector: '.synicon-delete'
    },
    selectButton: {
      selector: '.synicon-checkbox-multiple-marked-outline'
    },
    instanceSelected: {
      selector: '.synicon-checkbox-marked-outline'
    },
    instanceToSelect: {
      selector: '.synicon-checkbox-blank-outline'
    },
    instancesTableRowDescription: {
      selector: '//div[@class="instances-list-container"]/div[2]//div[@class="col-flex-1"]',
      locateStrategy: 'xpath'
    },
    emptyListItem: {
      selector: '.empty-list-item'
    },
    addInstanceModalTitle: {
      selector: '//h3[text()="Create an Instance"]',
      locateStrategy: 'xpath'
    },
    editInstanceModalTitle: {
      selector: '//h3[text()="Update an Instance"]',
      locateStrategy: 'xpath'
    },
    deleteInstanceModalTitle: {
      selector: '//h3[text()="Delete an Instance"]',
      locateStrategy: 'xpath'
    },
    welcomeDialogCreateInstance: {
      selector: '//div[@class="welcome-dialog"]//button',
      locateStrategy: 'xpath'
    },
    instanceDescription: {
      selector: '//div[@class="instances-list-container"]//*[text()="nightwatch_test_instance"]',
      locateStrategy: 'xpath'
    },
    socketsHeaderTitle: {
      selector: '//span[text()="Sockets"]',
      locateStrategy: 'xpath'
    }
  }
};
