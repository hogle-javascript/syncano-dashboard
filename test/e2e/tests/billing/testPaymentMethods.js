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
  },
  'User updates Payment Method': (client) => {
    const paymentPage = client.page.billingPaymentPage();
    const visibleEndNumber = '*** **** *** 4444';
    const cardNumberLocator = paymentPage.elements.lastFourDigits.selector;

    paymentPage
      .click('@updatePaymentButton')
      .fillInput('@cardNumberInput', 5555555555554444)
      .fillInput('@cvcInput', 777)
      .fillInput('@monthExpirationInput', 11)
      .fillInput('@yearExpirationInput', 2022)
      .click('@updatePaymentButton')
      .waitForElementVisible('@filledOutCard');

    client
      .pause(500)
      .element('xpath', cardNumberLocator, (result) => {
        client.elementIdText(result.value.ELEMENT, (text) => {
          client.assert.equal(text.value, visibleEndNumber);
        });
      });
  }
};
