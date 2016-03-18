export default {
  url: 'https://localhost:8080/#/account',
  elements: {
    updateButton: {
      selector: '//button[@class="raised-button"]',
      locateStrategy: 'xpath'
    },
    title: {
      selector: '//div[@class="container"]//div[text()="Profile"]',
      locateStrategy: 'xpath'
    },
    firstName: {
      selector: 'input[name=firstName]'
    },
    email: {
      selector: 'input[name=email]'
    }
  }
};
