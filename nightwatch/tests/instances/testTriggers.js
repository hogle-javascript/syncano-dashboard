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
      .clickButton('@addTriggerButton')
      .waitForElementPresent('@addTriggerModalTitle')
      .fillInputField('@addTriggerModalLabel', suffix)
      .selectFromDropdown('@addTriggerModalSnippet', '@addScheduleModalSnippetName')
      .selectFromDropdown('@addTriggerModalSignal', '@addTriggerModalSignalCreate')
      .selectFromDropdown('@addTriggerModalClass', '@addTriggerModalClassName')
      .waitForElementNotVisible('@addTriggerModalClassName')
      .clickButton('@confirm')
      .waitForElementPresent('@triggerTableRow');
  },
  'Administrator edits a Trigger Signal': (client) => {
    const triggersPage = client.page.triggersPage();

    triggersPage
      .navigate()
      .clickDropdown('@triggerDropdown');
    client.pause(1000);
    triggersPage.clickButton('@editDropdownItem');
    client.pause(1000);
    triggersPage.waitForElementVisible('@confirm')
      .selectFromDropdown('@addTriggerModalSignal', '@addTriggerModalSignalUpdate')
      .waitForElementNotVisible('@addTriggerModalSignalUpdate')
      .clickButton('@confirm')
      .waitForElementPresent('@signalTriggerTableRow');
  },
  'Administrator deletes a Trigger': (client) => {
    const triggersPage = client.page.triggersPage();

    triggersPage
      .navigate()
      .clickButton('@selectTriggerTableRow')
      .clickButton('@triggersListMenu');
    client.pause(1000);
    triggersPage
      .clickButton('@triggersDeleteButton')
      .waitForElementVisible('@confirm');
    client.pause(1000);
    triggersPage.clickButton('@confirm');
    client.pause(1000);
    triggersPage.waitForElementNotPresent('@selectTriggerTableRow');
  }
};
