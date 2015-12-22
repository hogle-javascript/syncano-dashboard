import path from 'path';

module.exports = {
  tags: ['navigation'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .login(process.env.NIGHTWATCH_EMAIL, process.env.NIGHTWATCH_PASSWORD);
  },
  after(client) {
    client.end();
  },
  beforeEach(client) {
    const instancesPage = client.page.instancesPage();
    const socketsPage = client.page.socketsPage();

    instancesPage.navigate();
    instancesPage.clickElement('@instancesTableName');
    socketsPage.waitForElementPresent('@codeBoxSocketItem');
  },
  afterEach(client, done) {
    if (!process.env.CI || process.env.CIRCLE_BRANCH !== 'screenshots') {
      done();
      return;
    }
    const res = client.globals.test_settings.resolution;
    const prefix = client.currentTest.name.replace(/\s/g, '-').replace(/"|'/g, '');
    const fileNamePath = path.resolve(path.join(client.options.screenshotsPath, '_navigation', res, prefix + '.png'));

    client.saveScreenshot(fileNamePath, done);
  },
  'User goes to Sockets View': (client) => {
    const instancesPage = client.page.instancesPage();
    const socketsPage = client.page.socketsPage();
    const channelsPage = client.page.channelsPage();
    const schedulesPage = client.page.schedulesPage();
    const triggersPage = client.page.triggersPage();

    instancesPage.navigate();
    instancesPage.clickElement('@instancesTableName');
    socketsPage.waitForElementPresent('@codeBoxSocketItem');
    socketsPage.waitForElementPresent('@dataListItem');
    channelsPage.waitForElementPresent('@channelListItem');
    schedulesPage.waitForElementPresent('@scheduleListItem');
    triggersPage.waitForElementPresent('@triggerListItem');
  },
  'User goes to Classes View': (client) => {
    const leftMenuPage = client.page.leftMenuPage();
    const classesPage = client.page.classesPage();

    leftMenuPage.clickElement('@classes');
    classesPage.waitForElementPresent('@userProfileClassName');
  },
  'User goes to Snippets edit view': (client) => {
    const leftMenuPage = client.page.leftMenuPage();
    const snippetsPage = client.page.snippetsPage();
    const snippetEditPage = client.page.snippetEditPage();

    leftMenuPage.clickElement('@snippets');
    snippetsPage.clickElement('@snippetListItem');
    snippetEditPage.waitForElementPresent('@snippetEditView');
  },
  'User goes to Snippet config view': (client) => {
    const leftMenuPage = client.page.leftMenuPage();
    const snippetsPage = client.page.snippetsPage();
    const snippetEditPage = client.page.snippetEditPage();

    leftMenuPage.clickElement('@snippets');
    snippetsPage.clickElement('@snippetListItem');
    snippetEditPage.clickElement('@config');
    snippetEditPage.waitForElementPresent('@configKeyField');
    snippetEditPage.waitForElementPresent('@configValueField');
    snippetEditPage.waitForElementPresent('@configAddFieldButton');
    snippetEditPage.verify.containsText('@configKeyField', '');
    snippetEditPage.verify.containsText('@configValueField', '');
  },
  'User goes to Snippet traces view': (client) => {
    const leftMenuPage = client.page.leftMenuPage();
    const snippetsPage = client.page.snippetsPage();
    const snippetEditPage = client.page.snippetEditPage();

    leftMenuPage.clickElement('@snippets');
    snippetsPage.clickElement('@snippetListItem');
    snippetEditPage.clickElement('@traces');
    snippetEditPage.waitForElementPresent('@tracesEmpty');
  },
  'User goes to Data Objects View': (client) => {
    const leftMenuPage = client.page.leftMenuPage();
    const classesPage = client.page.classesPage();
    const dataObjectsPage = client.page.dataObjectsPage();

    leftMenuPage.clickElement('@classes');
    classesPage.clickElement('@userClassListItem');
    dataObjectsPage.waitForElementPresent('@dataObjectsTableBody');
  },
  'User goes to Users & Groups View': (client) => {
    const leftMenuPage = client.page.leftMenuPage();
    const usersPage = client.page.usersPage();

    leftMenuPage.clickElement('@users');
    usersPage.waitForElementPresent('@user');
  },
  'User goes to CodeBox Socket Traces View': (client) => {
    const socketsPage = client.page.socketsPage();
    const codeBoxTracesPage = client.page.codeBoxTracesPage();

    socketsPage.clickElement('@codeBoxSocketItemTraces');
    codeBoxTracesPage.waitForElementPresent('@codeBoxTracesEmptyView');
  }
};
