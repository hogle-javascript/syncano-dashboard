const globals = require('../globals');
const utils = require('../utils');

const tasksCommands = {
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
    deleteButton: {
      selector: '//span[@class="synicon-delete"]',
      locateStrategy: 'xpath'
    },
    adminsListItem: {
      selector: '//div[text()="Owner (cannot be edited)"]',
      locateStrategy: 'xpath'
    },
    addAdminButton: {
      selector: '//span[@class="synicon-plus"]',
      locateStrategy: 'xpath'
    },
    addAdminModalTitle: {
      selector: '//h3[text()="Invite an Administrator"]',
      locateStrategy: 'xpath'
    },
    addAdminModalEmailInput: {
      selector: '//input[@name="email"]',
      locateStrategy: 'xpath'
    },
    addAdminModalRoleDropdown: {
      selector: '//form/div[2]/div',
      locateStrategy: 'xpath'
    },
    addAdminModalRoleDropdownRead: {
      selector: '//form//div[@tabindex="0"]//span[text()="read"]',
      locateStrategy: 'xpath'
    },
    adminTableRow: {
      selector: '//div[text()="' + utils.addSuffix('admin') + '@syncano.com' + '"]',
      locateStrategy: 'xpath'
    },
    selectAdminTableRow: {
      selector: '//div[text()="' + utils.addSuffix('admin') + '@syncano.com' + '"]/../../preceding-sibling::div',
      locateStrategy: 'xpath'
    },
    deleteAdminModalTitle: {
      selector: '//h3[text()="Delete an Invitation"]',
      locateStrategy: 'xpath'
    }
  }
};
