var codeBoxEditPage = {
  clickButton: function(button) {
    return this.waitForElementVisible(button, 5000)
      .click(button);
  },
};

module.exports = {
  commands: [codeBoxEditPage],
  elements: {
    codeBoxListItem: {
      selector: '//div[text()="codebox_description"]',
      locateStrategy: 'xpath'
    }
  }
};
