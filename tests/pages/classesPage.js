const globals = require('../globals');
const utils = require('../utils');


const classesCommands = {
  fillInputField: function(field, value) {
    return this.waitForElementVisible(field)
      .clearValue(field)
      .setValue(field, value);
  },
  selectFromDropdown: function(field, value) {
    return this.waitForElementVisible(field)
      .click(field)
      .waitForElementVisible(value)
      .click(value);
  },
  clickButton: function(button) {
    return this.waitForElementVisible(button)
      .click(button);
  },
  clickDropdown: function() {
    return this.waitForElementVisible('@classItemDropdown').click('@classItemDropdown');
  },
};

module.exports = {
  url: 'https://localhost:8080/#/instances/' + globals.instanceName + '/classes',
  commands: [classesCommands],
  elements: {
    classItemDropdown: {
      selector: '//span[@class="synicon-dots-vertical"]',
      locateStrategy: 'xpath'
    },
    editDropdownItem: {
      selector: '//a[@class="dropdown-item-edit-class"]',
      locateStrategy: 'xpath'
    },
    fab: {
      selector: '.synicon-plus'
    },
    createModalNameInput: {
      selector: 'input[name=name]'
    },
    createModalFieldNameInput: {
      selector: 'input[name=fieldName]'
    },
    createModalDropdown: {
      selector: '//form//label[text()="Type"]',
      locateStrategy: 'xpath'
    },
    createModalDropdownType: {
      selector: '//div[@class="type-dropdown"]',
      locateStrategy: 'xpath'
    },
    createModalSchemaString: {
      selector: '//span[text()="string"]',
      locateStrategy: 'xpath'
    },
    createModalDescriptionInput: {
      selector: 'input[name="description"]'
    },
    confirmButton: {
      selector: 'button[type="submit"]'
    },
    addButton: {
      selector: '//span[text()="Add"]',
      locateStrategy: 'xpath'
    },
    editButton: {
      selector: '.synicon-pencil'
    },
    classTableRow: {
      selector: '//div[text()="' + utils.addSuffix('class') + '"]',
      locateStrategy: 'xpath'
    },
    userProfileClassName: {
      selector: '//div[@class="classes-list-container"]//div[text()="user_profile"]',
      locateStrategy: 'xpath'
    },
    userClassListItem: {
      selector: '//div[text()="Class that holds profiles for users."]',
      locateStrategy: 'xpath'
    },
    selectClass: {
      selector: '//div[text()="' + utils.addSuffix('class') + '"]/../div[1]/span',
      locateStrategy: 'xpath'
    },
    selectUserClass: {
      selector: '//div[text()="user_profile"]/preceding-sibling::div/span',
      locateStrategy: 'xpath'
    },
    classToSelect: {
      selector: '.synicon-checkbox-blank-outline'
    },
    classTableRowDescription: {
      selector: '//div[text()="' + utils.addSuffix('class') + '"]/../following-sibling::div[1]',
      locateStrategy: 'xpath'
    },
    classTableName: {
      selector: '//div[text()="' + utils.addSuffix('class') + '"]',
      locateStrategy: 'xpath'
    },
    inactiveDeleteButton: {
      selector: '//span[@class="synicon-delete"]/../../button[@disabled]',
      locateStrategy: 'xpath'
    },
    deleteButton: {
      selector: '.synicon-delete'
    },
    confirmDeleteButton: {
      selector: '//span[text()="Confirm"]',
      locateStrategy: 'xpath'
    },
    addClassTitle: {
      selector: '//span[text()="Add a Class"]',
      locateStrategy: 'xpath'
    },
    editClassTitle: {
      selector: '//span[text()="Update a Class"]',
      locateStrategy: 'xpath'
    },
    deleteClassModalTitle: {
      selector: '//h3[text()="Delete a Class"]',
      locateStrategy: 'xpath'
    },
    checkboxSelected: {
      selector: '.synicon-checkbox-marked-outline'
    }
  }
};
