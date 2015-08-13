var topNavigationCommands = {
  clickButton: function(button) {
    return this.waitForElementVisible(button, 5000)
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
    }
  }
};
