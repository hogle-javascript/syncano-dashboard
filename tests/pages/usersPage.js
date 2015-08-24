var utils = require('../utils');

var usersCommands = {
  clickButton: function(button) {
    return this.waitForElementVisible(button, 5000)
      .click(button);
  },
  fillInputField: function(field, value) {
    return this.waitForElementVisible(field)
      .clearValue(field)
      .setValue(field, value);
  },
};

module.exports = {
  url: 'https://localhost:8080/#/instances/enter_this_instance_now/users',
  commands: [usersCommands],
  elements: {
    user: {
      selector: '//div[text()="username"]',
      locateStrategy: 'xpath'
    },
    addUserButton: {
      selector: '//span[@class="synicon-account-plus"]',
      locateStrategy: 'xpath'
    },
    addUserModalTitle: {
      selector: '//h3[text()="Add a User"]',
      locateStrategy: 'xpath'
    },
    username: {
      selector: '//div[text()="Username"]/following-sibling::input',
      locateStrategy: 'xpath'
    },
    password: {
      selector: '//div[text()="User password"]/following-sibling::input',
      locateStrategy: 'xpath'
    },
    confirm: {
      selector: '//span[text()="Confirm"]',
      locateStrategy: 'xpath'
    },
    userTableRow: {
      selector: '//div[text()="' + utils.addSuffix('user') + '"]',
      locateStrategy: 'xpath'
    },
    selectUserTableRow: {
      selector: '//div[text()="' + utils.addSuffix('user') + '"]/preceding-sibling::div',
      locateStrategy: 'xpath'
    },
    deleteButton: {
      selector: '//span[@class="synicon-delete"]',
      locateStrategy: 'xpath'      
    },
    deleteUserModalTitle: {
      selector: '//h3[text()="Delete a User"]',
      locateStrategy: 'xpath'
    },
    addGroupButton: {
      selector: '//span[@class="synicon-account-multiple-plus"]',
      locateStrategy: 'xpath'
    },
    addGroupModalTitle: {
      selector: '//h3[text()="Add a Group"]',
      locateStrategy: 'xpath'
    },
    groupName: {
      selector: '//input[@label="label"]',
      locateStrategy: 'xpath'
    },
    groupTableRow: {
      selector: '//span[text()="' + utils.addSuffix('group') + '"]',
      locateStrategy: 'xpath'
    },
    groupTableRowDropdown: {
      selector: '//span[text()="' + utils.addSuffix('group') + '"]/following-sibling::div/button',
      locateStrategy: 'xpath'      
    },
    deleteButtonDropdown: {
      selector: '//span[text()="Delete"]',
      locateStrategy: 'xpath'      
    },
    deleteGroupModalTitle: {
      selector: '//h3[text()="Delete a Group"]',
      locateStrategy: 'xpath'  
    }
  }
};
