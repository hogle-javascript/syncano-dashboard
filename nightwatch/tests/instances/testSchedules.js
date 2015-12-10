const utils = require('../utils');

module.exports = {
  tags: ['schedules'],
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
    const schedulesPage = client.page.schedulesPage();
    const suffix = utils.addSuffix('schedule');

    schedulesPage
      .navigate()
      .clickButton('@addScheduleButton')
      .waitForElementPresent('@addScheduleModalTitle')
      .fillInputField('@addScheduleModalLabel', suffix)
      .selectFromDropdown('@addScheduleModalSnippet', '@addScheduleModalSnippetName')
      .selectFromDropdown('@addScheduleModalCronTab', '@addScheduleModalCronTabName')
      .waitForElementNotVisible('@runEvery5minutes')
      .clickButton('@confirm')
      .waitForElementPresent('@scheduleTableRow');
  },
  'Administrator edits a Schedule Crontab': (client) => {
    const schedulesPage = client.page.schedulesPage();

    schedulesPage
      .navigate()
      .clickDropdown('@scheduleDropdown');
    client.pause(1000);
    schedulesPage
      .clickButton('@editDropdownItem')
      .waitForElementVisible('@editScheduleModalTitle')
      .selectFromDropdown('@addScheduleModalCronTab', '@runEvery5minutes')
      .waitForElementNotVisible('@addScheduleModalCronTabName')
      .clickButton('@confirm')
      .waitForElementVisible('@cronTabScheduleTableRow');
  },
  'Administrator deletes a Schedule': (client) => {
    const schedulesPage = client.page.schedulesPage();

    schedulesPage
      .navigate()
      .clickButton('@selectScheduleTableRow')
      .clickButton('@schedulesListMenu')
      .clickButton('@schedulesDeleteButton')
      .waitForElementPresent('@deleteScheduleModalTitle')
      .clickButton('@confirm')
      .waitForElementNotPresent('@selectScheduleTableRow');
  }
};
