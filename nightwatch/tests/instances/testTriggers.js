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

    triggersPage.navigate();
    triggersPage.clickElement('@addTriggerButton');
    triggersPage.waitForElementPresent('@addTriggerModalTitle');
    triggersPage.fillInputField('@addTriggerModalLabel', suffix, client);
    triggersPage.selectFromDropdown('@addTriggerModalSnippet', '@addScheduleModalSnippetName', client);
    triggersPage.selectFromDropdown('@addTriggerModalSignal', '@addTriggerModalSignalCreate', client);
    triggersPage.selectFromDropdown('@addTriggerModalClass', '@addTriggerModalClassName', client);
    triggersPage.clickElement('@confirm');
    triggersPage.waitForElementPresent('@triggerTableRow');
  },
  'Administrator edits a Trigger Signal': (client) => {
    const triggersPage = client.page.triggersPage();

    triggersPage.navigate();
    triggersPage.clickDropdown('@triggerDropdown', client);
    triggersPage.clickElement('@editDropdownItem');
    triggersPage.waitForElementVisible('@confirm');
    triggersPage.selectFromDropdown('@addTriggerModalSignal', '@addTriggerModalSignalUpdate', client);
    triggersPage.clickElement('@confirm');
    triggersPage.waitForElementPresent('@signalTriggerTableRow');
  },
  'Administrator deletes a Trigger': (client) => {
    const triggersPage = client.page.triggersPage();

    triggersPage.clickElement('@selectTriggerTableRow');
    triggersPage.clickElement('@triggersListMenu');
    triggersPage.clickElement('@triggersDeleteButton');
    triggersPage.waitForElementVisible('@confirm');
    triggersPage.clickElement('@confirm');
    triggersPage.waitForElementNotPresent('@selectTriggerTableRow');
  }
};
