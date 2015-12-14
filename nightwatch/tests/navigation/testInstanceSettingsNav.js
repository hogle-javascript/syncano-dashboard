import path from 'path';

module.exports = {
  tags: ['navigation'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .login(process.env.NIGHTWATCH_EMAIL, process.env.NIGHTWATCH_PASSWORD)
  },
  after(client) {
    client.end();
  },
  beforeEach(client) {
    const instancesPage = client.page.instancesPage();
    const socketsPage = client.page.socketsPage();

    instancesPage.navigate();
    instancesPage.clickButton('@instancesTableName');
    socketsPage.waitForElementPresent('@snippetSocketItem');
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
    const instanceName = client.globals.instanceName;
    const instanceNameField = generalPage.elements.instanceNameField.selector;

    leftMenuPage.clickButton('@general');
    generalPage.waitForElementPresent('@instanceNameField');
    client.getValue('xpath', instanceNameField, (result) => {
      client.assert.equal(result.value, instanceName);
    });
  },
  'User goes to Administrators settings View': (client) => {
    const leftMenuPage = client.page.leftMenuPage();
    const adminsPage = client.page.adminsPage();

    leftMenuPage.clickButton('@administrators');
    adminsPage.waitForElementPresent('@adminsListItem');
  },
  'User goes to API Keys settings View': (client) => {
    const leftMenuPage = client.page.leftMenuPage();
    const apiKeysPage = client.page.apiKeysPage();

    leftMenuPage.clickButton('@apiKeys');
    apiKeysPage.waitForElementPresent('@apiKeysListItem');
  }
};
