import commonCommands from '../commands/commonCommands';

export default {
  commands: [commonCommands],
  elements: {
    snippetEditView: {
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
