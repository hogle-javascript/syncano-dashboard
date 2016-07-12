import accounts from '../../tempAccounts';
import utils, { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['triggers'],
  before(client) {
    const loginPage = client.page.loginPage();
    const { email, password } = accounts.alternativeUser;

    loginPage
      .navigate()
      .setResolution(client)
      .login(email, password);
  },
  after(client) {
    client.end();
  },
  'Administrator adds a Trigger': (client) => {
    const triggersPage = client.page.triggersPage();
    const suffix = utils.addSuffix('trigger');
    const { instanceName } = accounts.alternativeUser;

    triggersPage
      .goToUrl(instanceName, 'triggers')
      .clickElement('@addTriggerButton')
      .waitForElementPresent('@addTriggerModalTitle')
      .fillInput('@addTriggerModalLabel', suffix)
      .selectDropdownValue('@addTriggerModalSignal', 'create')
      .selectDropdownValue('@addTriggerModalClass', 'user_profile')
      .selectDropdownValue('@addTriggerModalScript', accounts.alternativeUser.tempScriptNames[0])
      .clickElement('@confirm')
      .clickElement('@summaryDialogCloseButton')
      .waitForElementPresent('@triggerTableRow');
  },
  'Administrator edits a Trigger Signal': (client) => {
    const triggersPage = client.page.triggersPage();

    triggersPage
      .clickListItemDropdown('@triggerDropdown', 'Edit')
      .waitForElementVisible('@confirm')
      .selectDropdownValue('@addTriggerModalSignal', 'update')
      .clickElement('@confirm')
      .waitForElementPresent('@signalTriggerTableRow');
  },
  'Administrator deletes a Trigger': (client) => {
    const triggersPage = client.page.triggersPage();

    triggersPage
      .clickListItemDropdown('@triggerDropdown', 'Delete')
      .waitForElementVisible('@confirm')
      .clickElement('@confirm')
      .waitForElementNotPresent('@triggerTableRow');
  }
});
