const utils = require('../utils');

module.exports = {
  tags: ['triggers'],
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
      .clickDropdown('@triggerDropdown')
      .clickButton('@editDropdownItem')
      .waitForElementVisible('@confirm')
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
      .clickButton('@triggersListMenu')
      .clickButton('@triggersDeleteButton')
      .waitForElementVisible('@confirm')
      .clickButton('@confirm')
      .waitForElementNotPresent('@selectTriggerTableRow');
  }
};
