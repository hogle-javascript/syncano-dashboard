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
      selector: '//label[text()="Expiration month"]',
      locateStrategy: 'xpath'
    },
    yearExpirationInput: {
      selector: '//label[text()="Expiration year"]',
      locateStrategy: 'xpath'
    },
    confirmButton: {
      selector: '//button/div/span[text()="Confirm"]',
      locateStrategy: 'xpath'
    },
    planBarLocator: {
      selector: '//span/strong',
      locateStrategy: 'xpath'
    },
    cancelPlanButton: {
      selector: '//button/div/span[text()="Cancel my plan"]',
      locateStrategy: 'xpath'
    },
    confirmCancelPlanButton: {
      selector: '//button/div/div/span[text()="Yes, I want to cancel"]',
      locateStrategy: 'xpath'
    },
    expiredTextLocation: {
      selector: '(//div[@class="vm-1-b"]/div)[1]',
      locateStrategy: 'xpath'
    },
    softLimitInput: {
      selector: 'input[name=soft_limit]'
    },
    hardLimitInput: {
      selector: 'input[name=hard_limit]'
    },
    setLimitsButton: {
      selector: '//button/div/span[text()="Set Limits"]',
      locateStrategy: 'xpath'
    }
  }
};
