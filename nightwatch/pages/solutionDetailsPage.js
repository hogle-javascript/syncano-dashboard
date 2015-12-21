import commonCommands from '../commands/commonCommands';

export default {
  commands: [commonCommands],
  elements: {
    installSolutionButton: {
      selector: '//span[text()="Install solution"]',
      locateStrategy: 'xpath'
    }
  }
};
