import commonCommands from '../commands/commonCommands';

export default {
  commands: [commonCommands],
  elements: {
    instancesDropdown: {
      selector: '.instances-dropdown'
    },
    codeBoxTracesEmptyView: {
      selector: '//span[text()="There are no traces for this "]',
      locateStrategy: 'xpath'
    }
  }
};
