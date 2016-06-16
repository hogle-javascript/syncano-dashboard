import path from 'path';
import accounts from '../../tempAccounts';

module.exports = {
  tags: ['navigation'],
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
