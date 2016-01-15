export default {
  url: 'https://localhost:8080/#/account/authentication/',
  elements: {
    updateButton: {
      selector: '//button[@class="raised-button"]',
      locateStrategy: 'xpath'
    },
    accountKey: {
      selector: '//div[text()="Account key"]',
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
      selector: '//div[@class="notification__content"]/div[2]',
      locateStrategy: 'xpath'
    }
  }
};
