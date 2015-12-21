import commonCommands from '../commands/commonCommands';

export default {
  commands: [commonCommands],
  elements: {
    channelListItem: {
      selector: '//div[text()="channel_123"]',
      locateStrategy: 'xpath'
    }
  }
};
