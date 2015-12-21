import commonCommands from '../commands/commonCommands';

export default {
  commands: [commonCommands],
  elements: {
    snippetListItem: {
      selector: '//div[text()="snippet"]',
      locateStrategy: 'xpath'
    }
  }
};
