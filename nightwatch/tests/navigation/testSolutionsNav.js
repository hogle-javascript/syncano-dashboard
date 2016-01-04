import path from 'path';

module.exports = {
  tags: ['navigation'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .login(process.env.NIGHTWATCH_EMAIL, process.env.NIGHTWATCH_PASSWORD);
  },
  after(client) {
    client.end();
  },
  beforeEach(client) {
    const instancesPage = client.page.instancesPage();
    const socketsPage = client.page.socketsPage();

    instancesPage
      .navigate()
      .clickElement('@instancesTableName');
    socketsPage.waitForElementPresent('@codeBoxSocketItem');
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
  'User goes to Solutions View': (client) => {
    const topNavigationPage = client.page.topNavigationPage();
    const solutionsPage = client.page.solutionsPage();

    topNavigationPage.clickElement('@solutions');
    solutionsPage
      .waitForElementPresent('@solutionDetails')
      .waitForElementVisible('@solutionAvatars');
  },
  'User goes to Solution Details View': (client) => {
    const topNavigationPage = client.page.topNavigationPage();
    const solutionsPage = client.page.solutionsPage();
    const solutionDetailsPage = client.page.solutionDetailsPage();

    topNavigationPage.clickElement('@solutions');
    solutionsPage
      .waitForElementPresent('@solutionsView')
      .clickElement('@solutionDetails');
    solutionDetailsPage.waitForElementPresent('@installSolutionButton');
  }
};
