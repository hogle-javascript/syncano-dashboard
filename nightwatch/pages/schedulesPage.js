import utils from '../../utils';
import globals from '../../globals';

const schedulesCommands = {
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

export default {
  url: `https://localhost:8080/#/instances/${globals.instanceName}/schedules`,
  commands: [schedulesCommands],
  elements: {
    schedulesListMenu: {
      selector: '//div[@class="schedules-list"]/div[1]/div[@class="col-menu"]//button',
      locateStrategy: 'xpath'
    },
    scheduleDropdown: {
      selector: `//div[text()="${utils.addSuffix('schedule')}"]/../following-sibling::div[@class="col-menu"]//button`,
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
    schedulesDeleteButton: {
      selector: '//div[text()="Delete Schedule"]',
      locateStrategy: 'xpath'
    },
    schedulesEditButton: {
      selector: '//span[text()="Edit a Schedule"]',
      locateStrategy: 'xpath'
    },
    scheduleListItem: {
      selector: '//div[text()="schedule_123"]',
      locateStrategy: 'xpath'
    },
    addScheduleButton: {
      selector: '//button//span[@class="synicon-socket-schedule"]',
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
    addScheduleModalSnippet: {
      selector: '//div[@class="snippet-dropdown"]',
      locateStrategy: 'xpath'
    },
    addScheduleModalSnippetName: {
      selector: '//span[text()="snippet"]',
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
      selector: `//div[text()="${utils.addSuffix('schedule')}"]`,
      locateStrategy: 'xpath'
    },
    selectScheduleTableRow: {
      selector: `//div[text()="${utils.addSuffix('schedule')}"]/preceding-sibling::div`,
      locateStrategy: 'xpath'
    },
    cronTabScheduleTableRow: {
      selector: `//div[text()="${utils.addSuffix('schedule')}"]/parent::div/following-sibling::div[text()="*/5 * * * *"]`,
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
    dropdownClickAnimation: {
      selector: '//span[@class="synicon-dots-vertical"]/preceding-sibling::span/div',
      locateStrategy: 'xpath'
    }
  }
};
