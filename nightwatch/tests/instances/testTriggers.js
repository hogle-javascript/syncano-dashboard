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
    triggersPage.clickButton('@addTriggerButton', client);
    triggersPage.waitForElementPresent('@addTriggerModalTitle');
    triggersPage.fillInputField('@addTriggerModalLabel', suffix, client);
    triggersPage.selectFromDropdown('@addTriggerModalSnippet', '@addScheduleModalSnippetName', client);
    triggersPage.selectFromDropdown('@addTriggerModalSignal', '@addTriggerModalSignalCreate', client);
    triggersPage.selectFromDropdown('@addTriggerModalClass', '@addTriggerModalClassName', client);
    triggersPage.clickButton('@confirm', client);
    triggersPage.waitForElementPresent('@triggerTableRow');
  },
  'Administrator edits a Trigger Signal': (client) => {
    const triggersPage = client.page.triggersPage();

    triggersPage.navigate();
    triggersPage.clickDropdown('@triggerDropdown', client);
    triggersPage.clickButton('@editDropdownItem', client);
    triggersPage.waitForElementVisible('@confirm', client);
    triggersPage.selectFromDropdown('@addTriggerModalSignal', '@addTriggerModalSignalUpdate', client);
    triggersPage.clickButton('@confirm', client);
    triggersPage.waitForElementPresent('@signalTriggerTableRow');
  },
  'Administrator deletes a Trigger': (client) => {
    const triggersPage = client.page.triggersPage();

    triggersPage.clickButton('@selectTriggerTableRow', client);
    triggersPage.clickButton('@triggersListMenu', client);
    triggersPage.clickButton('@triggersDeleteButton', client);
    triggersPage.waitForElementVisible('@confirm');
    triggersPage.clickButton('@confirm', client);
    triggersPage.waitForElementNotPresent('@selectTriggerTableRow');
  }
};
