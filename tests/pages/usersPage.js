var usersCommands = {
  clickButton: function(button) {
    return this.waitForElementVisible(button, 5000)
      .click(button);
  },
};

module.exports = {
  commands: [usersCommands],
  elements: {
    user: {
      selector: '//div[text()="username"]',
      locateStrategy: 'xpath'
    }
  }
};
