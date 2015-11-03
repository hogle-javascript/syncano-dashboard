var snippetEditPage = {
  clickButton: function(button) {
    return this.waitForElementVisible(button, 5000)
      .click(button);
  },
};

module.exports = {
  commands: [snippetEditPage],
  elements: {
    snippetListItem: {
      selector: '//div[text()="codebox_description"]',
      locateStrategy: 'xpath'
    }
  }
};
