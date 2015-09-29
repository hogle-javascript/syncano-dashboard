const topNavigationCommands = {
  clickButtona: function(button) {
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
      selector: '//ul[@class="toolbar-list"]//div[@class="dropdown"]',
      locateStrategy: 'xpath'
    },
    accountDropdown: {
      selector: '//div[@class="dropdown-menu-section"]/div/div[1]',
      locateStrategy: 'xpath'
    },
    support: {
      selector: '//ul[@class="toolbar-list"]/li[2]/a',
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
