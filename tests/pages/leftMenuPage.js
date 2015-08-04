var leftMenuCommands = {
  clickButton: function(button) {
    return this.waitForElementVisible(button, 5000)
      .click(button);
  },
};

module.exports = {
  commands: [leftMenuCommands],
  elements: {
    classes: {
      selector: '//div[@tabindex="0"]//span[text()="Classes"]',
      locateStrategy: 'xpath'
    },
    codeBoxes: {
      selector: '//div[@tabindex="0"]//span[text()="CodeBoxes"]',
      locateStrategy: 'xpath'
    }
  }
};
