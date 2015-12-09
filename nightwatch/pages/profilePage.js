module.exports = {
  elements: {
    updateButton: {
      selector: '//button[@class="raised-button"]',
      locateStrategy: 'xpath'
    },
    title: {
      selector: '//div[@class="container"]//div[text()="Profile"]',
      locateStrategy: 'xpath'
    },
  }
};
