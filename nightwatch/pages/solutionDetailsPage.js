var solutionDetailsCommands = {
  clickButton: function(button) {
    return this.waitForElementVisible(button, 5000)
      .click(button);
  },
};

module.exports = {
  commands: [solutionDetailsCommands],
  elements: {
    installSolutionButton: {
      selector: '//span[text()="Install solution"]',
      locateStrategy: 'xpath'
    }
  }
};
