import accounts from '../../tempAccounts';
import utils from '../../utils';

export default {
  tags: ['schedules'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .setResolution(client)
      .login(accounts.instanceUser.email, accounts.instanceUser.password);
  },
  after(client) {
    client.end();
  },
  'Administrator adds a Schedule Socket': (client) => {
    const schedulesPage = client.page.schedulesPage();
    const schedule = utils.addSuffix('schedule');
    const instanceName = accounts.instanceUser.instanceName;

    schedulesPage
      .goToUrl(instanceName, 'schedules')
      .clickElement('@addScheduleButton')
      .waitForElementPresent('@addScheduleModalTitle')
      .fillInput('@addScheduleModalLabel', schedule)
      .selectDropdownValue('@addScheduleModalScript', accounts.instanceUser.tempScriptNames[1])
      .sendKeys('@addScheduleModalCronTab', '0 0 1 1 *')
      // click into title as workaround for enter key closing modal view
      .clickElement('@addScheduleModalTitle')
      .clickElement('@confirm')
      .clickElement('@summaryDialogCloseButton')
      .waitForElementPresent('@scheduleTableRow');
  },
  'Administrator edits a Schedule Socket Crontab': (client) => {
    const schedulesPage = client.page.schedulesPage();
    const schedule = utils.addSuffix('schedule');
    const instanceName = accounts.instanceUser.instanceName;

    schedulesPage
      .goToUrl(instanceName, 'schedules')
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
    const instanceName = accounts.instanceUser.instanceName;

    schedulesPage
      .goToUrl(instanceName, 'schedules')
      .clickListItemDropdown(schedule, 'Delete')
      .waitForElementPresent('@deleteScheduleModalTitle')
      .clickElement('@addScheduleButton');
  }
};
