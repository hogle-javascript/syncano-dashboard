var channelsCommands = {
  clickButton: function(button) {
    return this.waitForElementVisible(button, 5000)
      .click(button);
  },
};

module.exports = {
  commands: [channelsCommands],
  elements: {
    channelListItem: {
      selector: '//div[text()="channel_123"]',
      locateStrategy: 'xpath'
    }
  }
};
