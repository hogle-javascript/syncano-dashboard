var topNavigationCommands = {
  clickButton: function(button) {
    return this.waitForElementVisible(button)
      .click(button);
  },
};

module.exports = {
  commands: [topNavigationCommands],
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
    docs: {
      selector: '//ul[@class="toolbar-list"]/li[1]/a',
      locateStrategy: 'xpath'
    },
    support: {
      selector: '//ul[@class="toolbar-list"]/li[2]/a',
      locateStrategy: 'xpath'
    },
  }
};
