import utils from '../utils';
import globals from '../globals';

const usersCommands = {
  clickButton(button) {
    return this.waitForElementVisible(button)
      .click(button);
  },
  fillInputField(field, value) {
    return this.waitForElementVisible(field)
      .clearValue(field)
      .setValue(field, value);
  },
  clickDropdown(element) {
    return this.waitForElementVisible(element)
               .waitForElementNotPresent('@dropdownClickAnimation')
               .click(element);
  }
};

module.exports = {
  url: 'https://localhost:8080/#/instances/' + globals.instanceName + '/users',
  commands: [usersCommands],
  elements: {
    usersListMenu: {
      selector: '//div[@class="users-list"]/div[1]/div[@class="col-menu"]/div/button',
      locateStrategy: 'xpath'
    },
    user: {
      selector: '//div[text()="username"]',
      locateStrategy: 'xpath'
    },
    addUserButton: {
      selector: '//span[@class="synicon-account-plus"]',
      locateStrategy: 'xpath'
    },
    addUserModalTitle: {
      selector: '//h3[text()="Create a User"]',
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
      selector: '//div[text()="Delete User(s)"]',
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
      selector: '//h3[text()="Create a Group"]',
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
    },
    groupEditButton: {
      selector: '//span[@class="synicon-dots-vertical"]',
      locateStrategy: 'xpath'
    },
    userList: {
      selector: '//div[@class="col-lg-27"]//div[@class="col-xs-10"]',
      locateStrategy: 'xpath'
    },
    groupList: {
      selector: '//div[@class="col-lg-8"]/div/div[2]',
      locateStrategy: 'xpath'
    },
    dropdownClickAnimation: {
      selector: '//span[@class="synicon-dots-vertical"]/preceding-sibling::span/div',
      locateStrategy: 'xpath'
    }
  }
};
