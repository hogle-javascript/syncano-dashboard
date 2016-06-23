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
      selector: 'input[name="exp_month"]'
    },
    yearExpirationInput: {
      selector: 'input[name="exp_year"]'
    },
    confirmButton: {
      selector: '//button/div/span[text()="Confirm"]',
      locateStrategy: 'xpath'
    },
    planBarLocator: {
      selector: '//span/strong',
      locateStrategy: 'xpath'
    },
    newPlanText: {
      selector: '//div[text()="New plan "]',
      locateStrategy: 'xpath'
    }
  }
};
