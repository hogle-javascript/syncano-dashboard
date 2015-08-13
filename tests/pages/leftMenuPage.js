var leftMenuCommands = {
  clickButton: function(button) {
    return this.waitForElementVisible(button, 5000)
      .click(button);
  },
};

module.exports = {
  commands: [leftMenuCommands],
  elements: {
    leftMenu: {
      selector: '.left-nav'
    },
    classes: {
      selector: '//div[@class="left-nav"]//span[text()="Classes"]',
      locateStrategy: 'xpath'
    },
    codeBoxes: {
      selector: '//div[@class="left-nav"]//span[text()="CodeBoxes"]',
      locateStrategy: 'xpath'
    },
    users: {
      selector: '//div[@class="left-nav"]//span[text()="Users"]',
      locateStrategy: 'xpath'
    },
    channels: {
      selector: '//div[@class="left-nav"]//span[text()="Channels"]',
      locateStrategy: 'xpath'
    },
    tasks: {
      selector: '//div[@class="left-nav"]//span[text()="Tasks"]',
      locateStrategy: 'xpath'
    },
    administrators: {
      selector: '//div[@class="left-nav"]//span[text()="Administrators"]',
      locateStrategy: 'xpath'
    },
    apiKeys: {
      selector: '//div[@class="left-nav"]//span[text()="API keys"]',
      locateStrategy: 'xpath'
    }
  }
};
