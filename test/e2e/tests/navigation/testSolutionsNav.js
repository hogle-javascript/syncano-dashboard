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
      .clickElement('@instancesTableName');
    client.pause(500);
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
