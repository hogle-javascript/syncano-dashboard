var snippetEditPage = {
  clickButton(button)  {
    return this.waitForElementVisible(button, 5000).click(button);
  }
};

module.exports = {
  commands: [snippetEditPage],
  elements: {
    snippetListItem: {
      selector: '//div[text()="codebox"]',
      locateStrategy: 'xpath'
    }
  }
};
