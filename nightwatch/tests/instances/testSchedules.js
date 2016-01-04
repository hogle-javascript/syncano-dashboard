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

    schedulesPage
      .navigate()
      .clickElement('@addScheduleButton')
      .waitForElementPresent('@addScheduleModalTitle')
      .fillInput('@addScheduleModalLabel', suffix)
      .selectDropdownValue('@addScheduleModalSnippet', 'snippet')
      .selectDropdownValue('@addScheduleModalCronTab', 'Run once a year at midnight')
      .clickElement('@confirm')
      .waitForElementPresent('@scheduleTableRow');
  },
  'Administrator edits a Schedule Socket Crontab': (client) => {
    const schedulesPage = client.page.schedulesPage();

    schedulesPage
      .navigate()
      .clickListItemDropdown('@scheduleDropdown', 'Edit')
      .waitForElementVisible('@editScheduleModalTitle')
      .selectDropdownValue('@addScheduleModalCronTab', 'Run every 5 minutes')
      .clickElement('@confirm')
      .waitForElementVisible('@cronTabScheduleTableRow');
  },
  'Administrator deletes a Schedule Socket': (client) => {
    const schedulesPage = client.page.schedulesPage();

    schedulesPage
      .navigate()
      .clickElement('@selectScheduleTableRow')
      .clickElement('@schedulesListMenu')
      .clickElement('@schedulesDeleteButton')
      .waitForElementPresent('@deleteScheduleModalTitle')
      .clickElement('@confirm')
      .waitForElementNotPresent('@selectScheduleTableRow');
  }
};
