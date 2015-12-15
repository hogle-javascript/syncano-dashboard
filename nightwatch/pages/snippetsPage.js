const snippetsPage = {
  clickButton(button) {
    return this.waitForElementVisible(button).click(button);
  }
};

export default {
  commands: [snippetsPage],
  elements: {
    snippetListItem: {
      selector: '//div[text()="snippet"]',
      locateStrategy: 'xpath'
    }
  }
};
