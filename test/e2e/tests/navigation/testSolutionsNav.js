import accounts from '../../tempAccounts';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['navigation'],
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
});
