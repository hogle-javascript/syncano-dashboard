export default {
  elements: {
    leftMenu: {
      selector: '.left-nav'
    },
    instancesDropdown: {
      selector: '//span[@class="synicon-menu-down"]',
      locateStrategy: 'xpath'
    },
    instancesDropdownName: {
      selector: '//span[@class="synicon-menu-down"]/preceding-sibling::div',
      locateStrategy: 'xpath'
    },
    instancesDropdownItems: {
      selector: '//div[@class="instances-dropdown"]/div[2]/div',
      locateStrategy: 'xpath'
    },
    instancesListSecondItem: {
      selector: '//div[@class="my-instances-list"]/div[2]',
      locateStrategy: 'xpath'
    },
    classes: {
      selector: '//span[@class="synicon-layers"]',
      locateStrategy: 'xpath'
    },
    scripts: {
      selector: '//span[@class="synicon-code-tags"]',
      locateStrategy: 'xpath'
    },
    users: {
      selector: '//div[@class="col-flex-0 left-nav"]//div[text()="Users & Groups"]',
      locateStrategy: 'xpath'
    },
    schedules: {
      selector: '//div[@class="col-flex-0 left-nav"]//div[text()="Schedules"]',
      locateStrategy: 'xpath'
    },
    triggers: {
      selector: '//div[@class="col-flex-0 left-nav"]//div[text()="Triggers"]',
      locateStrategy: 'xpath'
    },
    general: {
      selector: '//span[@class="synicon-settings"]',
      locateStrategy: 'xpath'
    },
    administrators: {
      selector: '//div[@class="col-flex-0 left-nav"]//div[text()="Administrators"]',
      locateStrategy: 'xpath'
    },
    apiKeys: {
      selector: '//div[@class="col-flex-0 left-nav"]//div[text()="API Keys"]',
      locateStrategy: 'xpath'
    },
    authentication: {
      selector: '//div[@class="col-flex-0 left-nav"]//div[text()="Authentication"]',
      locateStrategy: 'xpath'
    },
    invitations: {
      selector: '//div[@class="col-flex-0 left-nav"]//div[text()="Invitations"]',
      locateStrategy: 'xpath'
    },
    billingPlan: {
      selector: '//div[@class="col-flex-0 left-nav"]//div[text()="Billing Plan"]',
      locateStrategy: 'xpath'
    },
    paymentMethods: {
      selector: '//div[@class="col-flex-0 left-nav"]//div[text()="Payment Methods"]',
      locateStrategy: 'xpath'
    },
    invoices: {
      selector: '//div[@class="col-flex-0 left-nav"]//div[text()="Invoices"]',
      locateStrategy: 'xpath'
    },
    billingAddress: {
      selector: '//div[@class="col-flex-0 left-nav"]//div[text()="Billing Address"]',
      locateStrategy: 'xpath'
    }
  }
};
