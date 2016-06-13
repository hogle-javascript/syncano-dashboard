import accounts from '../tempAccounts';
import utils from '../utils';

export default {
  url: `https://localhost:8080/#/instances/${accounts.instanceUser.instanceName}/classes`,
  elements: {
    classesListMenu: {
      selector: '//div[@class="classes-list"]/div[1]/div[@class="col-menu"]//button',
      locateStrategy: 'xpath'
    },
    deleteClasses: {
      selector: '//div[text()="Delete Classes"]',
      locateStrategy: 'xpath'
    },
    addClassButton: {
      selector: '//span[text()="Add"]',
      locateStrategy: 'xpath'
    },
    createModalNameInput: {
      selector: 'input[name=name]'
    },
    createModalFieldNameInput: {
      selector: 'input[name=fieldName]'
    },
    createModalDropdownType: {
      selector: '//div[@class="fieldType-dropdown"]',
      locateStrategy: 'xpath'
    },
    createModalDescriptionInput: {
      selector: 'input[name="description"]'
    },
    confirmButton: {
      selector: '//button//span[text()="Confirm"]',
      locateStrategy: 'xpath'
    },
    addButton: {
      selector: '(//span[text()="Add"])[2]',
      locateStrategy: 'xpath'
    },
    classTableRows: {
      selector: '//div[@class="classes-list"]/div[2]/div',
      locateStrategy: 'xpath'
    },
    classTableRow: {
      selector: `//div[text()="${utils.addSuffix('class')}"]`,
      locateStrategy: 'xpath'
    },
    userProfileClassName: {
      selector: '//div[@class="classes-list"]//div[text()="user_profile"]',
      locateStrategy: 'xpath'
    },
    selectUserClass: {
      selector: '//div[text()="user_profile"]/../../../../button//span',
      locateStrategy: 'xpath'
    },
    userClassListItem: {
      selector: '//div[text()="user_profile"]',
      locateStrategy: 'xpath'
    },
    userClassDropDown: {
      selector: '//div[text()="user_profile"]/../../../../../div[@class="col-menu"]//button',
      locateStrategy: 'xpath'
    },
    classToSelect: {
      selector: '//span[@class="synicon-checkbox-blank-outline"]',
      locateStrategy: 'xpath'
    },
    classTableRowDescription: {
      selector: `//div[text()="${utils.addSuffix('class')}"]/../../following-sibling::div[1]`,
      locateStrategy: 'xpath'
    },
    classTableName: {
      selector: `//div[text()="${utils.addSuffix('class')}"]`,
      locateStrategy: 'xpath'
    },
    inactiveDeleteButton: {
      selector: '//div[text()="Delete"]/..',
      locateStrategy: 'xpath'
    },
    confirmDeleteButton: {
      selector: '//span[text()="Confirm"]',
      locateStrategy: 'xpath'
    },
    addClassTitle: {
      selector: '//h3[text()="Add a Class"]',
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
      selector: '//span[@class="synicon-checkbox-marked-outline"]',
      locateStrategy: 'xpath'
    },
    classesListItemDropDown: {
      selector: `//div[text()="${utils.addSuffix('class')}"]/../../../../
        following-sibling::div//span[@class="synicon-dots-vertical"]`,
      locateStrategy: 'xpath'
    },
    editButton: {
      selector: '//div[text()="Edit"]',
      locateStrategy: 'xpath'
    },
    deleteButton: {
      selector: '//div[text()="Delete"]',
      locateStrategy: 'xpath'
    }
  }
};
