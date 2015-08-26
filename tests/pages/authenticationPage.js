module.exports = {
  elements: {
    updateButton: {
      selector: '//button[@class="raised-button"]',
      locateStrategy: 'xpath'
    },
    accountKey: {
      selector: '//div[@class="container"]//div[text()="Account key"]',
      locateStrategy: 'xpath'
    }
  }
};