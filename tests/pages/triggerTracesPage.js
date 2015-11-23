const triggerTracesCommands = {
  clickButton(button) {
    return this.waitForElementVisible(button)
      .click(button);
  }
};

module.exports = {
  commands: [triggerTracesCommands],
  elements: {
    traceDetails: {
      selector: '//div[text()="foo"]',
      locateStrategy: 'xpath'
    },
    traceCheckIcon: {
      selector: '.synicon-check'
    }
  }
};
