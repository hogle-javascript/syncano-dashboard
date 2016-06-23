import accounts from '../../tempAccounts.js';

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
  'User switches to production plan': (client) => {
    const billingPage = client.page.billingPlanPage();

    billingPage
      .navigate()
      .waitForElementVisible('@openPlansExplorerButton')
      .verify.containsText('@planBarLocator', 'Builder')
      .clickElement('@openPlansExplorerButton')
      .fillInput('@cardNumberInput', 4000056655665556)
      .fillInput('@cvcInput', 666)
      .fillInput('@monthExpirationInput', 10)
      .fillInput('@yearExpirationInput', 2020)
      .click('@confirmButton')
      .waitForElementVisible('@newPlanText')
      .verify.containsText('@planBarLocator', 'Production');
  }
};
