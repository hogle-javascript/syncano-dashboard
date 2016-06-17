import accounts from '../tempAccounts';
import utils from '../utils';

export default {
  elements: {
    usersListMenu: {
      selector: '//div[@class="users-list"]/div[1]/div[@class="col-menu"]//button',
      locateStrategy: 'xpath'
    },
    user: {
      selector: `//div[text()="${accounts.navigationUser.tempUserNames}"]`,
      locateStrategy: 'xpath'
    },
    addUserButton: {
      selector: '//button//span[text()="Add a User"]',
      locateStrategy: 'xpath'
    },
    addUserModalTitle: {
      selector: '//h3[text()="Add a User"]',
      locateStrategy: 'xpath'
    },
    username: {
      selector: '//div[text()="User\'s name"]/following-sibling::input',
      locateStrategy: 'xpath'
    },
    password: {
      selector: '//div[text()="User\'s password"]/following-sibling::input',
      locateStrategy: 'xpath'
    },
    confirm: {
      selector: '//span[text()="Confirm"]',
      locateStrategy: 'xpath'
    },
    userTableRow: {
      selector: `//div[text()="${utils.addSuffix('user')}"]`,
      locateStrategy: 'xpath'
    },
    selectUserTableRow: {
      selector: `//div[text()="${utils.addSuffix('user')}"]/../../../..//span[@class="synicon-dots-vertical"]`,
      locateStrategy: 'xpath'
    },
    deleteButton: {
      selector: '//div[text()="Delete User"]',
      locateStrategy: 'xpath'
    },
    deleteUserModalTitle: {
      selector: '//h3[text()="Delete a User"]',
      locateStrategy: 'xpath'
    },
    addGroupButton: {
      selector: '//button//span[text()="Add a Group"]',
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
      selector: `//div[text()="${utils.addSuffix('group')}"]`,
      locateStrategy: 'xpath'
    },
    groupTableRowDropdown: {
      selector: `//div[text()="${utils.addSuffix('group')}"]/../../../following-sibling::div//button`,
      locateStrategy: 'xpath'
    },
    deleteButtonDropdown: {
      selector: '//div[text()="Delete a Group"]',
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
      selector: '//div[@class="col-md-27"]//div[@class="col-xs-12"]',
      locateStrategy: 'xpath'
    },
    groupList: {
      selector: '//div[@class="col-md-8"]/div/div[2]',
      locateStrategy: 'xpath'
    }
  }
};
