import accounts from '../../tempAccounts.js';
import utils from '../../utils.js';

export default {
  tags: ['plansAndPricing'],
  before: (client) => {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .setResolution(client)
      .login(accounts.navigationUser.email, accounts.navigationUser.password);
  },
  after: (client) => {
    client.end();
  },
  'User opens plans explorer': (client) => {
    const billingPage = client.page.billingPlanPage();

    billingPage
      .navigate()
      .clickElement('@openPlansExplorerButton');
  }
};
