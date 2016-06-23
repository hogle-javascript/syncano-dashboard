import utils from '../utils';

export default {
  url: `${utils.testBaseUrl()}/#/account/plan/`,
  elements: {
    openPlansExplorerButton: {
      selector: '//button//span[text()="Upgrade my plan"]',
      locateStrategy: 'xpath'
    }
  }
};
