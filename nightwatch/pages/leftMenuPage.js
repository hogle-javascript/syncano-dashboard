import commonCommands from '../commands/commonCommands';

export default {
  commands: [commonCommands],
  elements: {
    leftMenu: {
      selector: '.left-nav'
    },
    instancesDropdown: {
      selector: '//div[@class="left-nav"]/div/div[1]/div',
      locateStrategy: 'xpath'
    },
    instancesDropdownName: {
      selector: '//span[@class="synicon-menu-down"]/preceding-sibling::div/div',
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
      selector: '//div[@class="left-nav"]//div[text()="Classes"]',
      locateStrategy: 'xpath'
    },
    snippets: {
      selector: '//div[@class="left-nav"]//div[text()="Snippets"]',
      locateStrategy: 'xpath'
    },
    users: {
      selector: '//div[@class="left-nav"]//div[text()="Users & Groups"]',
      locateStrategy: 'xpath'
    },
    schedules: {
      selector: '//div[@class="left-nav"]//div[text()="Schedules"]',
      locateStrategy: 'xpath'
    },
    triggers: {
      selector: '//div[@class="left-nav"]//div[text()="Triggers"]',
      locateStrategy: 'xpath'
    },
    general: {
      selector: '//div[@class="left-nav"]//div[text()="General"]',
      locateStrategy: 'xpath'
    },
    administrators: {
      selector: '//div[@class="left-nav"]//div[text()="Administrators"]',
      locateStrategy: 'xpath'
    },
    apiKeys: {
      selector: '//div[@class="left-nav"]//div[text()="API keys"]',
      locateStrategy: 'xpath'
    },
    authentication: {
      selector: '//div[@class="left-nav"]//div[text()="Authentication"]',
      locateStrategy: 'xpath'
    },
    invitations: {
      selector: '//div[@class="left-nav"]//div[text()="Invitations"]',
      locateStrategy: 'xpath'
    },
    billingPlan: {
      selector: '//div[@class="left-nav"]//div[text()="Billing plan"]',
      locateStrategy: 'xpath'
    },
    paymentMethods: {
      selector: '//div[@class="left-nav"]//div[text()="Payment methods"]',
      locateStrategy: 'xpath'
    },
    invoices: {
      selector: '//div[@class="left-nav"]//div[text()="Invoices"]',
      locateStrategy: 'xpath'
    },
    billingAddress: {
      selector: '//div[@class="left-nav"]//div[text()="Billing address"]',
      locateStrategy: 'xpath'
    }
  }
};
