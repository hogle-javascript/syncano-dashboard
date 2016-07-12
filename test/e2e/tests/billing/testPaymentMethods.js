import accounts from '../../tempAccounts';
import { addTestNamePrefixes } from '../../utils';

export default addTestNamePrefixes({
  tags: ['paymentMethods'],
  beforeEach: (client) => {
    const loginPage = client.page.loginPage();
    const { email, password } = accounts.instanceUser;

    loginPage
      .navigate()
      .setResolution(client)
      .login(email, password);
  },
  afterEach: (client, done) => {
    client.end(done);
  },
  'User adds Payment Method': (client) => {
    const paymentPage = client.page.billingPaymentPage();

    paymentPage
      .navigate()
      .waitForElementVisible('@paymentTopBarText')
      .fillInput('@cardNumberInput', '4000056655665556')
      .selectDropdownValue('@monthExpirationInput', 10)
      .selectDropdownValue('@yearExpirationInput', 2020)
      .fillInput('@cvcInput', '666')
      .click('@addPaymentButton')
      .waitForElementVisible('@updatePaymentButton');
  },
  'User updates Payment Method': (client) => {
    const paymentPage = client.page.billingPaymentPage();
    const visibleEndNumber = '**** **** **** 4444';
    const cardNumberLocator = paymentPage.elements.lastFourDigits.selector;

    paymentPage
      .navigate()
      .clickElement('@updatePaymentButton')
      .fillInput('@cardNumberInput', '5555555555554444')
      .selectDropdownValue('@monthExpirationInput', 11)
      .selectDropdownValue('@yearExpirationInput', 2022)
      .fillInput('@cvcInput', '777')
      .click('@updatePaymentButton')
      .waitForElementVisible('@filledOutCard');

    client
      .pause(500)
      .element('xpath', cardNumberLocator, (result) => {
        client.elementIdText(result.value.ELEMENT, (text) => {
          client.assert.equal(text.value, visibleEndNumber);
        });
      });
  },
  'User deletes Payment Method': (client) => {
    const paymentPage = client.page.billingPaymentPage();

    paymentPage
      .navigate()
      .clickElement('@removePaymentButton')
      .click('@confirmRemoveButton')
      .waitForElementVisible('@addPaymentButton');
  }
});
