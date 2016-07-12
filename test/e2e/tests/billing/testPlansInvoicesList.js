import accounts from '../../tempAccounts';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['invoices'],
  beforeEach: (client) => {
    const loginPage = client.page.loginPage();
    const { email, password } = accounts.alternativeUser;

    loginPage
      .navigate()
      .setResolution(client)
      .login(email, password);
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
});
