const utils = require('../utils');

module.exports = {
  tags: ['tasks'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .typeEmail()
      .typePassword()
      .clickSignInButton()
      .verifyLoginSuccessful();
  },
  after(client) {
    client.end();
  },
  'Administrator adds a Schedule': (client) => {
    const tasksPage = client.page.tasksPage();
    const suffix = utils.addSuffix('schedule');

    tasksPage
      .navigate()
      .clickButton('@addScheduleButton')
      .waitForElementPresent('@addScheduleModalTitle')
      .fillInputField('@addScheduleModalLabel', suffix)
      .selectFromDropdown('@addScheduleModalCodeBox', '@addScheduleModalCodeBoxName')
      .selectFromDropdown('@addScheduleModalCronTab', '@addScheduleModalCronTabName')
      .waitForElementNotVisible('@runEvery5minutes')
      .clickButton('@confirm')
      .waitForElementPresent('@scheduleTableRow');
  },
  'Administrator edits a Schedule Crontab': (client) => {
    const tasksPage = client.page.tasksPage();

    tasksPage
      .navigate()
      .clickDropdown('@scheduleDropdown');
    client.pause(1000);
    tasksPage
      .clickButton('@editDropdownItem')
      .waitForElementVisible('@editScheduleModalTitle')
      .selectFromDropdown('@addScheduleModalCronTab', '@runEvery5minutes')
      .waitForElementNotVisible('@addScheduleModalCronTabName')
      .clickButton('@confirm')
      .waitForElementVisible('@cronTabScheduleTableRow');
  },
  'Administrator deletes a Schedule': (client) => {
    const tasksPage = client.page.tasksPage();

    tasksPage
      .navigate()
      .clickButton('@selectScheduleTableRow')
      .clickButton('@schedulesListMenu')
      .clickButton('@schedulesDeleteButton')
      .waitForElementPresent('@deleteScheduleModalTitle')
      .clickButton('@confirm')
      .waitForElementNotPresent('@selectScheduleTableRow');
  },
  'Administrator adds a Trigger': (client) => {
    const tasksPage = client.page.tasksPage();
    const suffix = utils.addSuffix('trigger');

    tasksPage
      .navigate()
      .clickButton('@addTriggerButton')
      .waitForElementPresent('@addTriggerModalTitle')
      .fillInputField('@addTriggerModalLabel', suffix)
      .selectFromDropdown('@addTriggerModalCodeBox', '@addScheduleModalCodeBoxName')
      .selectFromDropdown('@addTriggerModalSignal', '@addTriggerModalSignalCreate')
      .selectFromDropdown('@addTriggerModalClass', '@addTriggerModalClassName')
      .waitForElementNotVisible('@addTriggerModalClassName')
      .clickButton('@confirm')
      .waitForElementPresent('@triggerTableRow');
  },
  'Administrator edits a Trigger Signal': (client) => {
    const tasksPage = client.page.tasksPage();

    tasksPage
      .navigate()
      .clickDropdown('@triggerDropdown')
      .clickButton('@editDropdownItem')
      .waitForElementVisible('@confirm')
      .selectFromDropdown('@addTriggerModalSignal', '@addTriggerModalSignalUpdate')
      .waitForElementNotVisible('@addTriggerModalSignalUpdate')
      .clickButton('@confirm')
      .waitForElementPresent('@signalTriggerTableRow');
  },
  'Administrator deletes a Trigger': (client) => {
    const tasksPage = client.page.tasksPage();

    tasksPage
      .navigate()
      .clickButton('@selectTriggerTableRow')
      .clickButton('@triggersListMenu')
      .clickButton('@triggersDeleteButton')
      .waitForElementVisible('@confirm')
      .clickButton('@confirm')
      .waitForElementNotPresent('@selectTriggerTableRow');
  }
};
