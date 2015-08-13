var solutionsCommands = {
  clickButton: function(button) {
    return this.waitForElementVisible(button, 5000)
      .click(button);
  },
};

module.exports = {
  commands: [solutionsCommands],
  elements: {
    solutionsView: {
      selector: 'div#solutions'
    },
    solutionDetails: {
      selector: '//button//span[text()="SEE DETAILS"]',
      locateStrategy: 'xpath'
    }
  }
};
