import accounts from '../../tempAccounts';

export default {
  tags: ['paymentMethods'],
  before: (client) => {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .setResolution(client)
      .login(accounts.alternativeUser.email, accounts.alternativeUser.password);
  },
  after: (client) => {
    client.end();
  },
  'User adds Payment Method': (client) => {
    const paymentPage = client.page.billingPaymentPage();

    paymentPage
      .navigate()
      .waitForElementVisible('@paymentTopBarText')
      .fillInput('@cardNumberInput', 4000056655665556)
      .fillInput('@cvcInput', 666)
      .fillInput('@monthExpirationInput', 10)
      .fillInput('@yearExpirationInput', 2020)
      .click('@addPaymentButton')
      .waitForElementVisible('@updatePaymentButton');
  }
};
