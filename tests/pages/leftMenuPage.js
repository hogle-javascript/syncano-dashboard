const leftMenuCommands = {
  clickButton(button) {
    return this.waitForElementVisible(button)
      .click(button);
  }
};

export default {
  commands: [leftMenuCommands],
  elements: {
    leftMenu: {
      selector: '.left-nav'
    },
    instancesDropdown: {
      selector: '//div[@class="left-nav"]/div/div[1]/div',
      locateStrategy: 'xpath'
    },
    instancesDropdownItems: {
      selector: '//div[@class="instances-dropdown"]/div[2]/div',
      locateStrategy: 'xpath'
    },
    instancesListSecondItem: {
      selector: '//div[@class="instances-list"]/div[2]/div/div[3]',
      locateStrategy: 'xpath'
    },
    classes: {
      selector: '//div[@class="left-nav"]//a[text()="Classes"]',
      locateStrategy: 'xpath'
    },
    codeBoxes: {
      selector: '//div[@class="left-nav"]//a[text()="CodeBoxes"]',
      locateStrategy: 'xpath'
    },
    users: {
      selector: '//div[@class="left-nav"]//a[text()="Users"]',
      locateStrategy: 'xpath'
    },
    channels: {
      selector: '//div[@class="left-nav"]//a[text()="Channels"]',
      locateStrategy: 'xpath'
    },
    tasks: {
      selector: '//div[@class="left-nav"]//a[text()="Tasks"]',
      locateStrategy: 'xpath'
    },
    administrators: {
      selector: '//div[@class="left-nav"]//a[text()="Administrators"]',
      locateStrategy: 'xpath'
    },
    apiKeys: {
      selector: '//div[@class="left-nav"]//a[text()="API keys"]',
      locateStrategy: 'xpath'
    },
    authentication: {
      selector: '//div[@class="left-nav"]//a[text()="Authentication"]',
      locateStrategy: 'xpath'
    },
    invitations: {
      selector: '//div[@class="left-nav"]//a[text()="Invitations"]',
      locateStrategy: 'xpath'
    },
    billingPlan: {
      selector: '//div[@class="left-nav"]//a[text()="Billing plan"]',
      locateStrategy: 'xpath'
    },
    paymentMethods: {
      selector: '//div[@class="left-nav"]//a[text()="Payment methods"]',
      locateStrategy: 'xpath'
    },
    invoices: {
      selector: '//div[@class="left-nav"]//a[text()="Invoices"]',
      locateStrategy: 'xpath'
    },
    billingAddress: {
      selector: '//div[@class="left-nav"]//a[text()="Billing address"]',
      locateStrategy: 'xpath'
    }
  }
};
