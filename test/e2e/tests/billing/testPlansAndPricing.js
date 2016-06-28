import accounts from '../../tempAccounts';

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
      .fillInput('@cardNumberInput', '4000056655665556')
      .clickListItemDropdown('@monthExpirationInput', '01')
      .clickListItemDropdown('@yearExpirationInput', '2019')
      .fillInput('@cvcInput', '666')
      .clickElement('@confirmButton')
      .waitForElementVisible('@openPlansExplorerButton');
    // To avoid test failing as site take some time to reload after payment
    client.pause(1500);
    billingPage
      .verify.containsText('@planBarLocator', 'Production');
  }
};
