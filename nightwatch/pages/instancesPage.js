import commonCommands from '../commands/commonCommands';
const instancesCommands = {
  clickFAB() {
    return this.waitForElementVisible('@fab')
      .click('@fab')
      .waitForElementVisible('@confirmButton');
  },
  fillInstanceDescription(field, description) {
    return this.waitForElementVisible(field)
      .clearValue(field)
      .setValue(field, '')
      .clearValue(field)
      .setValue(field, description);
  },
  isModalClosed(element) {
    return this.waitForElementNotVisible(element, 25000);
  }
};

export default {
  url: 'https://localhost:8080/#/instances',
  commands: [commonCommands, instancesCommands],
  elements: {
    instanceDropdown: {
      selector: '(//span[@class="synicon-dots-vertical"])[2]',
      locateStrategy: 'xpath'
    },
    instancesDropdown: {
      selector: '(//span[@class="synicon-dots-vertical"])[1]',
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
      selector: '//button//span[text()="Confirm"]',
      locateStrategy: 'xpath'
    },
    instancesTableRow: {
      selector: '//div[@class="description-field col-flex-1"]',
      locateStrategy: 'xpath'
    },
    instancesTableName: {
      selector: '(//div[@class="instances-list"]/div[2]/div/div[1]/div[2])[1]',
      locateStrategy: 'xpath'
    },
    selectInstance: {
      selector: '//div[@class="instances-list"]/div[2]/div[1]/div[1]//span',
      locateStrategy: 'xpath'
    },
    editDropdownItem: {
      selector: '//span[@class="dropdown-item-instance-edit"]',
      locateStrategy: 'xpath'
    },
    deleteDropdownItem: {
      selector: '//span[@class="dropdown-item-instance-delete"]',
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
