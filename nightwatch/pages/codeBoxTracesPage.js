var codeBoxTracesCommands = {
  clickButton(button) {
    return this.waitForElementVisible(button, 5000)
      .click(button);
  }
};

module.exports = {
  commands: [codeBoxTracesCommands],
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
