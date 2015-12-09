var webhookTracesCommands = {
  clickButton: function(button) {
    return this.waitForElementVisible(button, 5000)
      .click(button);
  },
};

module.exports = {
  commands: [webhookTracesCommands],
  elements: {
    instancesDropdown: {
      selector: '.instances-dropdown'
    },
    webhookTracesEmptyView: {
      selector: '//span[text()="There are no traces for this "]',
      locateStrategy: 'xpath'
    }
  }
};
