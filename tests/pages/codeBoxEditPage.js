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
    configKeyField: {
      selector: '//div[@class="config-input-key"]',
      locateStrategy: 'xpath'
    },
    configValueField: {
      selector: '//div[@class="config-input-value"]',
      locateStrategy: 'xpath'
    },
    configAddFieldButton: {
      selector: '//button[@class="add-field-button"]',
      locateStrategy: 'xpath'
    },
    configAutosaveCheckbox: {
      selector: '//div[@class="config-autosave-checkbox"]',
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
