import utils from '../utils';

export default {
  url: `${utils.testBaseUrl()}/#/account/plan/`,
  elements: {
    openPlansExplorerButton: {
      selector: '//button//span[text()="Upgrade my plan"]',
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
    confirmButton: {
      selector: '//button/div/span[text()="Confirm"]',
      locateStrategy: 'xpath'
    },
    planBarLocator: {
      selector: '//span/strong',
      locateStrategy: 'xpath'
    }
  }
};
