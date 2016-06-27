import utils from '../utils';

export default {
  url: `${utils.testBaseUrl()}/#/account/payment-methods/`,
  elements: {
    paymentTopBarText: {
      selector: '//div/span[text()="Payment methods"]',
      locateStrategy: 'xpath'
    },
    cardNumberInput: {
      selector: 'input[name="number"]'
    },
    cvcInput: {
      selector: 'input[name="cvc"]'
    },
    monthExpirationInput: {
      selector: 'input[name="exp_month"]'
    },
    yearExpirationInput: {
      selector: 'input[name="exp_year"]'
    },
    addPaymentButton: {
      selector: '//div/span[text()="Add payment"]',
      locateStrategy: 'xpath'
    },
    updatePaymentButton: {
      selector: '//div/span[text()="Update payment"]',
      locateStrategy: 'xpath'
    },
    planBarLocator: {
      selector: '//span/strong',
      locateStrategy: 'xpath'
    },
    filledOutCard: {
      selector: '//div[@class="vm-6-b"]/div[2]/div[2]/div',
      locateStrategy: 'xpath'
    },
    lastFourDigits: {
      selector: '//div[text()="Card number"]/../div[2][contains(text(), "")]',
      locateStrategy: 'xpath'
    }
  }
};
