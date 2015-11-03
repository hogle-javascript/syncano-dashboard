const utils = require('../utils');
const globals = require('../globals');

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
  },
  clickScheduleDropdown: function() {
    return this.waitForElementVisible('@scheduleDropdown').click('@scheduleDropdown');
  },
  clickTriggerDropdown: function() {
    return this.waitForElementVisible('@triggerDropdown').click('@triggerDropdown');
  },
};

module.exports = {
  url: 'https://localhost:8080/#/instances/' + globals.instanceName + '/tasks',
  commands: [tasksCommands],
  elements: {
    scheduleDropdown: {
      selector: '//span[@class="synicon-dots-vertical"]',
      locateStrategy: 'xpath'
    },
    triggerDropdown: {
      selector: '//div[@class="triggers-list"]/div[3]/div/div[1]/div[7]/div[2]',
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
    deleteButton: {
      selector: '//span[@class="synicon-delete"]',
      locateStrategy: 'xpath'
    },
    editButton: {
      selector: '//span[@class="synicon-pencil"]',
      locateStrategy: 'xpath'
    },
    scheduleListItem: {
      selector: '//div[text()="schedule_123"]',
      locateStrategy: 'xpath'
    },
    triggerListItem: {
      selector: '//div[text()="trigger_123"]',
      locateStrategy: 'xpath'
    },
    addScheduleButton: {
      selector: '//button//span[@class="synicon-camera-timer"]',
      locateStrategy: 'xpath'
    },
    addScheduleModalTitle: {
      selector: '//h3[text()="Create a Schedule"]',
      locateStrategy: 'xpath'
    },
    addScheduleModalLabel: {
      selector: '//input[@name="label"]',
      locateStrategy: 'xpath'
    },
    addScheduleModalCodeBox: {
      selector: '//div[@class="codebox-dropdown"]',
      locateStrategy: 'xpath'
    },
    addScheduleModalCodeBoxName: {
      selector: '//span[text()="codebox"]',
      locateStrategy: 'xpath'
    },
    addScheduleModalCronTab: {
      selector: '//div[@class="crontab-dropdown"]',
      locateStrategy: 'xpath'
    },
    addScheduleModalCronTabName: {
      selector: '//span[text()="Run once a year at midnight"]',
      locateStrategy: 'xpath'
    },
    scheduleTableRow: {
      selector: '//div[text()="' + utils.addSuffix('schedule') + '"]',
      locateStrategy: 'xpath'
    },
    selectScheduleTableRow: {
      selector: '//div[text()="' + utils.addSuffix('schedule') + '"]/preceding-sibling::div',
      locateStrategy: 'xpath'
    },
    cronTabScheduleTableRow: {
      // lolpath!
      selector: '//div[text()="' + utils.addSuffix('schedule') +
      '"]/parent::div/following-sibling::div[text()="*/5 * * * *"]',
      locateStrategy: 'xpath'
    },
    deleteScheduleModalTitle: {
      selector: '//h3[text()="Delete a Schedule"]',
      locateStrategy: 'xpath'
    },
    editScheduleModalTitle: {
      selector: '//h3[text()="Edit a Schedule"]',
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
    }
  }
};
