import utils from '../../utils';

export default {
  tags: ['schedules'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .setResolution(client)
      .login(process.env.NIGHTWATCH_EMAIL, process.env.NIGHTWATCH_PASSWORD);
  },
  after(client) {
    client.end();
  },
  'Administrator adds a Schedule Socket': (client) => {
    const schedulesPage = client.page.schedulesPage();
    const schedule = utils.addSuffix('schedule');

    schedulesPage
      .navigate()
      .clickElement('@addScheduleButton')
      .waitForElementPresent('@addScheduleModalTitle')
      .fillInput('@addScheduleModalLabel', schedule)
      .selectDropdownValue('@addScheduleModalScript', 'snippet')
      .sendKeys('@addScheduleModalCronTab', '0 0 1 1 *')
      // click into title as workaround for enter key closing modal view
      .clickElement('@addScheduleModalTitle')
      .clickElement('@confirm')
      .waitForElementPresent('@scheduleTableRow');
  },
  'Administrator edits a Schedule Socket Crontab': (client) => {
    const schedulesPage = client.page.schedulesPage();
    const schedule = utils.addSuffix('schedule');

    schedulesPage
      .navigate()
      .clickListItemDropdown(schedule, 'Edit')
      .waitForElementVisible('@editScheduleModalTitle')
      .fillInput('@addScheduleModalCronTab', '0 0 * * *')
      // click into title as workaround for enter key closing modal view
      .clickElement('@editScheduleModalTitle')
      .clickElement('@confirm')
      .waitForElementVisible('@cronTabScheduleTableRow');
  },
  'Administrator deletes a Schedule Socket': (client) => {
    const schedulesPage = client.page.schedulesPage();
    const schedule = utils.addSuffix('schedule');

    schedulesPage
      .navigate()
      .clickListItemDropdown(schedule, 'Delete')
      .waitForElementPresent('@deleteScheduleModalTitle')
      .clickElement('@confirm')
      .waitForElementNotPresent('@selectScheduleTableRow');
  }
};
