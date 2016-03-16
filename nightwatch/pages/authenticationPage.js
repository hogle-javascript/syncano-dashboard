import Utils from '../utils';

export default {
  url: `${Utils.testBaseUrl()}/#/account/authentication/`,
  elements: {
    updateButton: {
      selector: '//button[@class="raised-button"]',
      locateStrategy: 'xpath'
    },
    accountKey: {
      selector: '//div[@style="font-family:monospace;"]',
      locateStrategy: 'xpath'
    },
    copyButton: {
      selector: '//span[text()="COPY"]',
      locateStrategy: 'xpath'
    },
    resetButton: {
      selector: '//span[text()="RESET"]',
      locateStrategy: 'xpath'
    },
    currentPassword: {
      selector: 'input[name="currentPassword"]'
    },
    newPassword: {
      selector: 'input[name="newPassword"]'
    },
    confirmNewPassword: {
      selector: 'input[name="confirmNewPassword"]'
    },
    notificationMessage: {
      selector: '//span[text()="Password changed successfully"]',
      locateStrategy: 'xpath'
    }
  }
};
