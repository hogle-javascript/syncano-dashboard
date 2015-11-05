const topNavigationCommands = {
  clickButton: function(button) {
    return this.waitForElementVisible(button)
      .click(button);
  }
};

module.exports = {
  commands: [topNavigationCommands],
  url: 'https://localhost:8080/#/instances',
  elements: {
    syncanoLogo: {
      selector: '.logo-white'
    },
    solutions: {
      selector: '//ul[@class="toolbar-list"]/li[3]/a',
      locateStrategy: 'xpath'
    },
    account: {
      selector: '//ul[@class="toolbar-list"]//li[@id="menu-account"]',
      locateStrategy: 'xpath'
    },
    accountDropdown: {
      selector: '//li[@id="menu-account"]/div/span/div/div/div/div/div/div[1]',
      locateStrategy: 'xpath'
    },
    billingDropdown: {
      selector: '//li[@id="menu-account"]/div/span/div/div/div/div/div/div[2]',
      locateStrategy: 'xpath'
    },
    logoutDropdown: {
      selector: '//li[@id="menu-account"]/div/span/div/div/div/div/div/div[3]',
      locateStrategy: 'xpath'
    },
    support: {
      selector: '//a[@href="http://www.syncano.com/support/"]',
      locateStrategy: 'xpath'
    },
    docs: {
      selector: '//a[@href="http://docs.syncano.com/"]',
      locateStrategy: 'xpath'
    },
    menuNotifications: {
      selector: '//li[@id="menu-notifications"]',
      locateStrategy: 'xpath'
    },
    notificationsDropdown: {
      selector: '//li[@id="menu-notifications"]//div[text()="Notifications"]',
      locateStrategy: 'xpath'
    }
  }
};
