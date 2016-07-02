import accounts from '../../tempAccounts';

export default {
  tags: ['invoices'],
  beforeEach: (client) => {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .setResolution(client)
      .login(accounts.alternativeUser.email, accounts.alternativeUser.password);
  },
  afterEach: (client, done) => {
    client.end(done);
  },
  'User views paid Invoices List': (client) => {
    const invoicesPage = client.page.invoicesPage();

    invoicesPage
      .navigate()
      .waitForElementVisible('@invoicesPageTitle')
      .waitForElementVisible('@invoiceAmountColumn')
      .verify.containsText('@invoiceAmountColumn', '$');
  }
};
