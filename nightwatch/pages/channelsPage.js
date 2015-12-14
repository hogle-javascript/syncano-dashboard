const channelsCommands = {
  clickButton(button) {
    return this.waitForElementVisible(button)
      .click(button);
  }
};

export default {
  commands: [channelsCommands],
  elements: {
    channelListItem: {
      selector: '//div[text()="channel_123"]',
      locateStrategy: 'xpath'
    }
  }
};
