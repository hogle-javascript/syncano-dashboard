const solutionDetailsCommands = {
  clickButton(button) {
    return this.waitForElementVisible(button)
      .click(button);
  }
};

export default {
  commands: [solutionDetailsCommands],
  elements: {
    installSolutionButton: {
      selector: '//span[text()="Install solution"]',
      locateStrategy: 'xpath'
    }
  }
};
