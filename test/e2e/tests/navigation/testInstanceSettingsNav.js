import accounts from '../../tempAccounts';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['instanceSettingsNav'],
  before(client) {
    const loginPage = client.page.loginPage();
    const { email, password } = accounts.navigationUser;

    loginPage
      .navigate()
      .setResolution(client)
      .login(email, password);
  },
  after(client) {
    client.end();
  },
  beforeEach(client) {
    const instancesPage = client.page.instancesPage();

    instancesPage
      .navigate()
      .clickElement('@instancesTableName');
    client.pause(500);
  },
  'User goes to General settings view': (client) => {
    const leftMenuPage = client.page.leftMenuPage();
    const generalPage = client.page.generalPage();
    const instanceName = accounts.navigationUser.instanceName;
    const instanceNameField = generalPage.elements.instanceNameField.selector;

    leftMenuPage.clickElement('@general');
    generalPage.waitForElementPresent('@instanceNameField');
    client.getValue('xpath', instanceNameField, (result) => {
      client.assert.equal(result.value, instanceName);
    });
  },
  'User goes to Administrators settings View': (client) => {
    const leftMenuPage = client.page.leftMenuPage();
    const adminsPage = client.page.adminsPage();

    leftMenuPage.clickElement('@administrators');
    adminsPage.waitForElementPresent('@adminsListItem');
  },
  'User goes to API Keys settings View': (client) => {
    const leftMenuPage = client.page.leftMenuPage();
    const apiKeysPage = client.page.apiKeysPage();

    leftMenuPage.clickElement('@apiKeys');
    apiKeysPage.waitForElementPresent('@apiKeysListItem');
  }
});
