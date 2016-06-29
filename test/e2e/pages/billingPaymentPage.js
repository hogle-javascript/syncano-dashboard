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
      selector: '//div[@class="col-flex-2"][1]/div/div/div',
      locateStrategy: 'xpath'
    },
    yearExpirationInput: {
      selector: '//div[@class="col-flex-2"][2]/div/div/div',
      locateStrategy: 'xpath'
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
