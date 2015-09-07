const globals = require('../globals');
const utils = require('../utils');

var tasksCommands = {
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
  }
};

module.exports = {
  url: 'https://localhost:8080/#/instances/' + globals.instanceName + '/admins',
  commands: [tasksCommands],
  elements: {
    confirmButton: {
      selector: '//span[text()="Confirm"]',
      locateStrategy: 'xpath'
    },
    administratorsListItem: {
      selector: '//div[text()="Owner (cannot be edited)"]',
      locateStrategy: 'xpath'
    },
    addAdministratorButton: {
      selector: '//span[@class="synicon-plus"]',
      locateStrategy: 'xpath'     
    },
    addAdministratorModalTitle: {
      selector: '//h3[text()="Invite an Administrator"]',
      locateStrategy: 'xpath'
    },
    addAdministratorModalEmailInput: {
      selector: '//input[@name="email"]',
      locateStrategy: 'xpath'
    },
    addAdministratorModalRoleDropdown: {
      selector: '//form/div[2]/div',
      locateStrategy: 'xpath'
    },
    addAdministratorModalRoleDropdownRead: {
      selector: '//form//div[@tabindex="0"]//span[text()="read"]',
      locateStrategy: 'xpath'
    },
    administratorTableRow: {
      selector: '//div[text()="' + utils.addSuffix('admin') + '@gmail.com' +'"]',
      locateStrategy: 'xpath'
    },
  }
};
