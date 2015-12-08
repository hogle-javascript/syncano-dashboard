const utils = require('../utils');
const globals = require('../globals');

const triggersCommands = {
  clickButton(button) {
    return this.waitForElementVisible(button)
                .click(button);
  },
  selectFromDropdown(field, value) {
    return this.waitForElementVisible(field)
               .click(field)
               .waitForElementVisible(value)
               .click(value);
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
  url: `https://localhost:8080/#/instances/${globals.instanceName}/triggers`,
  commands: [triggersCommands],
  elements: {
    triggersListMenu: {
      selector: '//div[@class="triggers-list"]/div[1]/div[@class="col-menu"]//button',
      locateStrategy: 'xpath'
    },
    triggerDropdown: {
      selector: '//button[@class="triggers-list--button"]',
      locateStrategy: 'xpath'
    },
    editDropdownItem: {
      selector: '//a[@class="dropdown-item-edit"]',
      locateStrategy: 'xpath'
    },
    confirm: {
      selector: '//span[text()="Confirm"]',
      locateStrategy: 'xpath'
    },
    triggersDeleteButton: {
      selector: '//div[text()="Delete Trigger(s)"]',
      locateStrategy: 'xpath'
    },
    triggersEditButton: {
      selector: '//span[text()="Edit a Trigger"]',
      locateStrategy: 'xpath'
    },
    triggerListItem: {
      selector: '//div[text()="trigger_123"]',
      locateStrategy: 'xpath'
    },
    addScheduleModalCodeBoxName: {
      selector: '//span[text()="codebox"]',
      locateStrategy: 'xpath'
    },
    runEvery5minutes: {
      selector: '//span[text()="Run every 5 minutes"]',
      locateStrategy: 'xpath'
    },
    addTriggerButton: {
      selector: '//button//span[@class="synicon-arrow-up-bold"]',
      locateStrategy: 'xpath'
    },
    addTriggerModalTitle: {
      selector: '//h3[text()="Create a Trigger"]',
      locateStrategy: 'xpath'
    },
    addTriggerModalLabel: {
      selector: '//input[@name="label"]',
      locateStrategy: 'xpath'
    },
    addTriggerModalSignal: {
      selector: '//div[@class="signal-dropdown"]',
      locateStrategy: 'xpath'
    },
    addTriggerModalSignalCreate: {
      selector: '//span[text()="create"]',
      locateStrategy: 'xpath'
    },
    addTriggerModalClass: {
      selector: '//div[@class="class-dropdown"]',
      locateStrategy: 'xpath'
    },
    addTriggerModalClassName: {
      selector: '//span[text()="user_profile"]',
      locateStrategy: 'xpath'
    },
    addTriggerModalCodeBox: {
      selector: '//div[@class="codebox-dropdown"]',
      locateStrategy: 'xpath'
    },
    triggerTableRow: {
      selector: '//div[text()="' + utils.addSuffix('trigger') + '"]',
      locateStrategy: 'xpath'
    },
    selectTriggerTableRow: {
      selector: '//div[text()="' + utils.addSuffix('trigger') + '"]/preceding-sibling::div',
      locateStrategy: 'xpath'
    },
    addTriggerModalSignalUpdate: {
      selector: '//span[text()="update"]',
      locateStrategy: 'xpath'
    },
    signalTriggerTableRow: {
      // moar lolpath!!!
      selector: '//div[text()="' + utils.addSuffix('trigger') +
      '"]/parent::div/following-sibling::div[text()="post_update"]',
      locateStrategy: 'xpath'
    },
    dropdownClickAnimation: {
      selector: '//span[@class="synicon-dots-vertical"]/preceding-sibling::span/div',
      locateStrategy: 'xpath'
    }
  }
};
