import utils from '../utils';
import globals from '../globals';

export default {
  url: `https://localhost:8080/#/instances/${globals.instanceName}/schedules`,
  elements: {
    schedulesListMenu: {
      selector: '//div[@class="schedules-list"]/div[1]/div[@class="col-menu"]//button',
      locateStrategy: 'xpath'
    },
    scheduleDropdown: {
      selector: `//div[text()="${utils.addSuffix('schedule')}"]/../../../following-sibling::div[@class="col-menu"]//button`,
      locateStrategy: 'xpath'
    },
    editDropdownItem: {
      selector: '//span[@class="dropdown-item-edit"]',
      locateStrategy: 'xpath'
    },
    confirm: {
      selector: '//span[text()="Confirm"]',
      locateStrategy: 'xpath'
    },
    schedulesDeleteButton: {
      selector: '//div[text()="Delete a Schedule Socket"]',
      locateStrategy: 'xpath'
    },
    schedulesEditButton: {
      selector: '//span[text()="Edit a Schedule Socket"]',
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
      selector: '//h3[text()="Create a Schedule Socket"]',
      locateStrategy: 'xpath'
    },
    addScheduleModalLabel: {
      selector: '//input[@name="label"]',
      locateStrategy: 'xpath'
    },
    addScheduleModalScript: {
      selector: '//div[@class="script-dropdown"]',
      locateStrategy: 'xpath'
    },
    addScheduleModalCronTab: {
      selector: '//label[text()="Crontab"]/following-sibling::input',
      locateStrategy: 'xpath'
    },
    scheduleTableRow: {
      selector: `//div[text()="${utils.addSuffix('schedule')}"]`,
      locateStrategy: 'xpath'
    },
    selectScheduleTableRow: {
      selector: `//div[text()="${utils.addSuffix('schedule')}"]/../../preceding-sibling::div`,
      locateStrategy: 'xpath'
    },
    cronTabScheduleTableRow: {
      selector: `//div[text()="${utils.addSuffix('schedule')}"]/../../parent::div/following-sibling::div[text()="*/5 * * * *"]`,
      locateStrategy: 'xpath'
    },
    deleteScheduleModalTitle: {
      selector: '//h3[text()="Delete a Schedule Socket"]',
      locateStrategy: 'xpath'
    },
    editScheduleModalTitle: {
      selector: '//h3[text()="Edit a Schedule Socket"]',
      locateStrategy: 'xpath'
    },
    runEvery5minutes: {
      selector: '//div[text()="Run every 5 minutes"]',
      locateStrategy: 'xpath'
    },
    runOnceAYear: {
      selector: '//div[text()="Run once a year at midnight"]',
      locateStrategy: 'xpath'
    }
  }
};
