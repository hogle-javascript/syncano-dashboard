import commonCommands from '../commands/commonCommands';

export default {
  commands: [commonCommands],
  url: 'https://localhost:8080/#/instances',
  elements: {
    syncanoLogo: {
      selector: '.logo-white'
    },
    solutions: {
      selector: '//ul[@class="toolbar-list"]/li[1]/a',
      locateStrategy: 'xpath'
    },
    account: {
      selector: '//ul[@class="toolbar-list"]//li[@id="menu-account"]',
      locateStrategy: 'xpath'
    },
    accountDropdown: {
      selector: '//div[@id="menu-account--dropdown"]/div/div[1]',
      locateStrategy: 'xpath'
    },
    instancesListDropdown: {
      selector: '//div[@id="menu-account--dropdown"]/div/div[2]',
      locateStrategy: 'xpath'
    },
    billingDropdown: {
      selector: '//div[@id="menu-account--dropdown"]/div/div[3]',
      locateStrategy: 'xpath'
    },
    logoutDropdown: {
      selector: '//div[@id="menu-account--dropdown"]/div/div[4]',
      locateStrategy: 'xpath'
    },
    support: {
      selector: '//a[@href="http://www.syncano.com/support/"]',
      locateStrategy: 'xpath'
    },
    docs: {
      selector: '//a[@href="http://docs.syncano.com/"]',
      locateStrategy: 'xpath'
    },
    menuNotifications: {
      selector: '//ul[@class="toolbar-list"]//li[@id="menu-notifications"]',
      locateStrategy: 'xpath'
    },
    notificationsDropdown: {
      selector: '//div[@id="menu-notifications--dropdown"]//div[text()="Notifications"]',
      locateStrategy: 'xpath'
    },
    fox: {
      selector: '//div[@id="menu-account--dropdown"]//img[contains(@style, "did-flip:true")]',
      locateStrategy: 'xpath'
    }
  }
};
