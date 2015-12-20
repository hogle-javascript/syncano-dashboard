import utils from '../../utils';

export default {
  tags: ['schedules'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .login(process.env.NIGHTWATCH_EMAIL, process.env.NIGHTWATCH_PASSWORD);
  },
  after(client) {
    client.end();
  },
  'Administrator adds a Schedule Socket': (client) => {
    const schedulesPage = client.page.schedulesPage();
    const suffix = utils.addSuffix('schedule');

    schedulesPage.navigate();
    schedulesPage.clickButton('@addScheduleButton', client);
    schedulesPage.waitForElementPresent('@addScheduleModalTitle');
    schedulesPage.fillInputField('@addScheduleModalLabel', suffix, client);
    schedulesPage.selectFromDropdown('@addScheduleModalSnippet', '@addScheduleModalSnippetName', client);
    schedulesPage.selectFromDropdown('@addScheduleModalCronTab', '@addScheduleModalCronTabName', client);
    schedulesPage.waitForElementNotPresent('@runEvery5minutes');
    schedulesPage.clickButton('@confirm', client);
    schedulesPage.waitForElementPresent('@scheduleTableRow');
  },
  'Administrator edits a Schedule Socket Crontab': (client) => {
    const schedulesPage = client.page.schedulesPage();

    schedulesPage.navigate();
    schedulesPage.clickDropdown('@scheduleDropdown', client);
    schedulesPage.clickButton('@editDropdownItem', client);
    schedulesPage.waitForElementVisible('@editScheduleModalTitle');
    schedulesPage.selectFromDropdown('@addScheduleModalCronTab', '@runEvery5minutes', client);
    schedulesPage.waitForElementNotPresent('@addScheduleModalCronTabName');
    schedulesPage.clickButton('@confirm', client);
    schedulesPage.waitForElementVisible('@cronTabScheduleTableRow');
  },
  'Administrator deletes a Schedule Socket': (client) => {
    const schedulesPage = client.page.schedulesPage();

    schedulesPage.navigate();
    schedulesPage.clickButton('@selectScheduleTableRow', client);
    schedulesPage.clickButton('@schedulesListMenu', client);
    schedulesPage.clickButton('@schedulesDeleteButton', client);
    schedulesPage.waitForElementPresent('@deleteScheduleModalTitle');
    schedulesPage.clickButton('@confirm', client);
    schedulesPage.waitForElementNotPresent('@selectScheduleTableRow');
  }
};
