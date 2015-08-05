var codeBoxEditPage = {
  clickButton: function(button) {
    return this.waitForElementVisible(button, 5000)
      .click(button);
  },
};

module.exports = {
  commands: [codeBoxEditPage],
  elements: {
    codeBoxEditView: {
      selector: '#brace-editor'
      },
    config: {
      selector: '//div[text()="Config"]',
      locateStrategy: 'xpath'
      },
    configEmpty: {
      selector: '//span[@class="ace_paren ace_lparen"]',
      locateStrategy: 'xpath'
    },
    traces: {
      selector: '//div[text()="Traces"]',
      locateStrategy: 'xpath'
    },
    tracesEmpty: {
      selector: '//span[text()="There are no traces for this "]',
      locateStrategy: "xpath"
    }
  }
};
