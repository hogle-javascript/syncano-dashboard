var dataCommands = {
  clickButton: function(button) {
    return this.waitForElementVisible(button, 5000)
      .click(button);
  },
};

module.exports = {
  commands: [dataCommands],
  elements: {
    instancesDropdown: {
      selector: '.instances-dropdown'
    },
    cogIcon: {
      selector: '.synicon-cog'
    },
    webhookListItem: {
      selector: '//div[text()="webhook_description"]',
      locateStrategy: 'xpath'
    }
  }
};
