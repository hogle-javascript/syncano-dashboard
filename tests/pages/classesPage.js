const globals = require('../globals');
const utils = require('../utils');


const classesCommands = {
  clickFAB: function() {
    return this.waitForElementVisible('@fab', 1000)
      .click('@fab')
      .waitForElementVisible('@confirmButton', 5000);
  },
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
  fillClassDescription: function(description) {
    return this.waitForElementVisible('@createModalDescriptionInput', 1000)
      .clearValue('@createModalDescriptionInput')
      .setValue('@createModalDescriptionInput', description);
  },
  fillClassFieldName: function(description) {
    return this.waitForElementVisible('@createModalDescriptionInput', 1000)
      .clearValue('@createModalDescriptionInput')
      .setValue('@createModalDescriptionInput', description);
  },
  clickSelectClass: function() {
    return this.waitForElementVisible('@selectClass', 5000)
      .click('@selectClass');
  },
  clickButton: function(button) {
    return this.waitForElementVisible(button)
      .click(button);
  }
};

module.exports = {
  url: 'https://localhost:8080/#/instances/' + globals.instanceName + '/classes',
  commands: [classesCommands],
  elements: {
    fab: {
      selector: '(//span[@class="synicon-plus"])[2]',
      locateStrategy: 'xpath'
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
    classTableRowDescription: {
      selector: '//div[text()="' + utils.addSuffix('class') + '"]/../following-sibling::div[1]',
      locateStrategy: 'xpath'
    },
    classTableName: {
      selector: '//div[text()="' + utils.addSuffix('class') + '"]',
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
    }
  }
};
