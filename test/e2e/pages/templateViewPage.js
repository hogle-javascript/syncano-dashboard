export default {
  elements: {
    codeEditor: {
      selector: '//div[@id="contentEditor"]/textarea',
      locateStrategy: 'xpath'
    },
    codeEditorContent: {
      selector: '//div[@id="contentEditor"]',
      locateStrategy: 'xpath'
    },
    saveButton: {
      selector: '//span[text()="SAVE"]',
      locateStrategy: 'xpath'
    },
    contextEditor: {
      selector: '//div[@id="contextEditor"]/textarea',
      locateStrategy: 'xpath'
    },
    contextEditorContent: {
      selector: '//div[@id="contextEditor"]',
      locateStrategy: 'xpath'
    },
    inputDataSourceUrl: {
      selector: 'input[name="dataSourceUrl"]'
    },
    renderButton: {
      selector: '//span[text()="RENDER"]',
      locateStrategy: 'xpath'
    },
    previewEditorContent: {
      selector: '//div[@id="previewEditor"]',
      locateStrategy: 'xpath'
    },
    htmlTestTemplateRow: {
      selector: '//div[text()="templates_123"]',
      locateStrategy: 'xpath'
    },
    renderInTabButton: {
      selector: '//span[text()="RENDER IN TAB"]',
      locateStrategy: 'xpath'
    }
  }
};
