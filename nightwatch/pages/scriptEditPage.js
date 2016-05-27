export default {
  elements: {
    scriptEditView: {
      selector: '//div[@id="brace-editor"]',
      locateStrategy: 'xpath'
    },
    config: {
      selector: '//div/span[text()="Config"]',
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
    traces: {
      selector: '//div/span[text()="TRACES"]',
      locateStrategy: 'xpath'
    },
    tracesEmpty: {
      selector: '//p[text()="There are no traces for this "]',
      locateStrategy: 'xpath'
    }
  }
};
