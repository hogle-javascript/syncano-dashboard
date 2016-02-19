import utils from '../utils';
import globals from '../globals';

export default {
  url: `https://localhost:8080/#/instances/${globals.instanceName}/classes`,
  elements: {
    classesListMenu: {
      selector: '//div[@class="classes-list"]/div[1]/div[@class="col-menu"]//button',
      locateStrategy: 'xpath'
    },
    selectAll: {
      selector: '//div[text()="Select All"]',
      locateStrategy: 'xpath'
    },
    deleteClasses: {
      selector: '//div[text()="Delete Classes"]',
      locateStrategy: 'xpath'
    },
    classItemDropdown: {
      selector: `//div[text()="${utils.addSuffix('class')}"]/../../../following-sibling::div[@class="col-menu"]//button`,
      locateStrategy: 'xpath'
    },
    editDropdownItem: {
      selector: '//span[@class="dropdown-item-edit-class"]',
      locateStrategy: 'xpath'
    },
    deleteDropdownItem: {
      selector: '//span[@class="dropdown-item-delete-class"]',
      locateStrategy: 'xpath'
    },
    addClassButton: {
      selector: '//span[@class="synicon-plus-circle-outline"]',
      locateStrategy: 'xpath'
    },
    createModalNameInput: {
      selector: 'input[name=name]'
    },
    createModalFieldNameInput: {
      selector: 'input[name=fieldName]'
    },
    createModalDropdown: {
      selector: '//label[text()="Type"]',
      locateStrategy: 'xpath'
    },
    createModalDropdownType: {
      selector: '//div[@class="fieldType-dropdown"]',
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
    multipleSelectButton: {
      selector: '.synicon-checkbox-multiple-marked-outline'
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
    userClassListItem: {
      selector: '//div[text()="user_profile"]',
      locateStrategy: 'xpath'
    },
    selectClass: {
      selector: `//div[text()="${utils.addSuffix('class')}"]/../div[1]/span`,
      locateStrategy: 'xpath'
    },
    selectUserClass: {
      selector: '//div[text()="user_profile"]/../../preceding-sibling::div/span',
      locateStrategy: 'xpath'
    },
    userClassDropDown: {
      selector: '//div[text()="user_profile"]/../../../../div[@class="col-menu"]//button',
      locateStrategy: 'xpath'
    },
    classToSelect: {
      selector: '.synicon-checkbox-blank-outline'
    },
    classTableRowDescription: {
      selector: `//div[text()="${utils.addSuffix('class')}"]/../following-sibling::div[1]/div`,
      locateStrategy: 'xpath'
    },
    classTableName: {
      selector: `//div[text()="${utils.addSuffix('class')}"]`,
      locateStrategy: 'xpath'
    },
    inactiveDeleteButton: {
      selector: '//div[text()="Delete a Class"]/..',
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
