export default {
  url: 'https://localhost:8080/#/account/authentication/',
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
    }
  }
};
