const codeBoxTracesCommands = {
  clickButton(button) {
    return this.waitForElementVisible(button)
      .click(button);
  }
};

export default {
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
