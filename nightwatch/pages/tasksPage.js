import utils from '../utils';
import globals from '../globals';
import commonCommands from '../commands/commonCommands';

export default {
  url: 'https://localhost:8080/#/instances/${globals.instanceName}/tasks',
  commands: [commonCommands],
  elements: {
    scheduleDropdown: {
      selector: '//span[@class="synicon-dots-vertical"]',
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
      selector: '//h3[text()="Create a Schedule Socket"]',
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
      selector: '//div[text()="snippet"]',
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
      selector: '//h3[text()="Delete a Schedule Socket"]',
      locateStrategy: 'xpath'
    },
    editScheduleModalTitle: {
      selector: '//h3[text()="Edit a Schedule Socket"]',
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
    addTriggerModalSnippet: {
      selector: '//div[@class="snippet-dropdown"]',
      locateStrategy: 'xpath'
    },
    triggerTableRow: {
      selector: `//div[text()="${utils.addSuffix('trigger')}"]`,
      locateStrategy: 'xpath'
    },
    selectTriggerTableRow: {
      selector: `//div[text()="${utils.addSuffix('trigger')}"]/preceding-sibling::div`,
      locateStrategy: 'xpath'
    },
    addTriggerModalSignalUpdate: {
      selector: '//span[text()="update"]',
      locateStrategy: 'xpath'
    },
    signalTriggerTableRow: {
      selector: `//div[text()="${utils.addSuffix('trigger')}"]/parent::div/following-sibling::div[text()="post_update"]`,
      locateStrategy: 'xpath'
    }
  }
};
