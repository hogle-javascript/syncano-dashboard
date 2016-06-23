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
    }
  }
};
