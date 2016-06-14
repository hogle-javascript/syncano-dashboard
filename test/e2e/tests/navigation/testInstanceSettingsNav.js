import path from 'path';
import accounts from '../../tempAccounts';

module.exports = {
  tags: ['instanceSettingsNav'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .setResolution(client)
      .login(accounts.navigationUser.email, accounts.navigationUser.password);
  },
  after(client) {
    client.end();
  },
  beforeEach(client) {
    const instancesPage = client.page.instancesPage();

    instancesPage
      .navigate()
      .setResolution(client)
      .clickElement('@instancesTableName');
  },
  afterEach(client, done) {
    if (!process.env.CI || process.env.CIRCLE_BRANCH !== 'screenshots') {
      done();
      return;
    }
    const res = client.globals.test_settings.resolution;
    const prefix = client.currentTest.name.replace(/\s/g, '-').replace(/"|'/g, '');
    const fileNamePath = path.resolve(path.join(client.options.screenshotsPath, '_navigation', res, prefix + '.png'));

    client.saveScreenshot(fileNamePath, done);
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
  }
  // 'User goes to API Keys settings View': (client) => {
  //   const leftMenuPage = client.page.leftMenuPage();
  //   const apiKeysPage = client.page.apiKeysPage();

  //   leftMenuPage.clickElement('@apiKeys');
  //   apiKeysPage.waitForElementPresent('@apiKeysListItem');
  // }
};
