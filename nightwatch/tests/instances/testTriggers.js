import utils from '../../utils';

export default {
  tags: ['triggers'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .login(process.env.NIGHTWATCH_EMAIL, process.env.NIGHTWATCH_PASSWORD);
  },
  after(client) {
    client.end();
  },
  'Administrator adds a Trigger': (client) => {
    const triggersPage = client.page.triggersPage();
    const suffix = utils.addSuffix('trigger');

    triggersPage
      .navigate()
      .clickElement('@addTriggerButton')
      .waitForElementPresent('@addTriggerModalTitle')
      .fillInput('@addTriggerModalLabel', suffix)
      .selectDropdownValue('@addTriggerModalScript', 'script')
      .selectDropdownValue('@addTriggerModalSignal', 'create')
      .selectDropdownValue('@addTriggerModalClass', 'user_profile')
      .clickElement('@confirm')
      .waitForElementPresent('@triggerTableRow');
  },
  'Administrator edits a Trigger Signal': (client) => {
    const triggersPage = client.page.triggersPage();

    triggersPage
      .navigate()
      .clickListItemDropdown('@triggerDropdown', 'Edit')
      .waitForElementVisible('@confirm')
      .selectDropdownValue('@addTriggerModalSignal', 'update')
      .clickElement('@confirm')
      .waitForElementPresent('@signalTriggerTableRow');
  },
  'Administrator deletes a Trigger': (client) => {
    const triggersPage = client.page.triggersPage();

    triggersPage
      .clickElement('@selectTriggerTableRow')
      .clickElement('@triggersListMenu')
      .clickElement('@triggersDeleteButton')
      .waitForElementVisible('@confirm')
      .clickElement('@confirm')
      .waitForElementNotPresent('@selectTriggerTableRow');
  }
};
