import path from 'path';

module.exports = {
  tags: ['navigation'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .login(process.env.NIGHTWATCH_EMAIL, process.env.NIGHTWATCH_PASSWORD)
  },
  after(client) {
    client.end();
  },
  beforeEach(client) {
    const instancesPage = client.page.instancesPage();
    const socketsPage = client.page.socketsPage();

    instancesPage.navigate();
    instancesPage.clickButton('@instancesTableName', client);
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
    const channelsPage = client.page.channelsPage();
    const tasksPage = client.page.tasksPage();
    const socketsPage = client.page.socketsPage();

    instancesPage.navigate();
    instancesPage.clickButton('@instancesTableName', client);
    socketsPage.waitForElementPresent('@codeBoxSocketItem');
    socketsPage.waitForElementPresent('@dataListItem');
    channelsPage.waitForElementPresent('@channelListItem');
    tasksPage.waitForElementPresent('@scheduleListItem');
    tasksPage.waitForElementPresent('@triggerListItem');
  },
  'User goes to Classes View': (client) => {
    const leftMenuPage = client.page.leftMenuPage();
    const classesPage = client.page.classesPage();

    leftMenuPage.clickButton('@classes', client);
    classesPage.waitForElementPresent('@userProfileClassName');
  },
  'User goes to Snippets edit view': (client) => {
    const leftMenuPage = client.page.leftMenuPage();
    const snippetsPage = client.page.snippetsPage();
    const snippetEditPage = client.page.snippetEditPage();

    leftMenuPage.clickButton('@snippets', client);
    snippetsPage.clickButton('@snippetListItem', client);
    snippetEditPage.waitForElementPresent('@snippetEditView');
  },
  'User goes to Snippet config view': (client) => {
    const leftMenuPage = client.page.leftMenuPage();
    const snippetsPage = client.page.snippetsPage();
    const snippetEditPage = client.page.snippetEditPage();

    leftMenuPage.clickButton('@snippets', client);
    snippetsPage.clickButton('@snippetListItem', client);
    snippetEditPage.clickButton('@config', client);
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

    leftMenuPage.clickButton('@snippets', client);
    snippetsPage.clickButton('@snippetListItem', client);
    snippetEditPage.clickButton('@traces', client);
    snippetEditPage.waitForElementPresent('@tracesEmpty');
  },
  'User goes to Data Objects View': (client) => {
    const leftMenuPage = client.page.leftMenuPage();
    const classesPage = client.page.classesPage();
    const dataObjectsPage = client.page.dataObjectsPage();

    leftMenuPage.clickButton('@classes', client);
    classesPage.clickButton('@userClassListItem', client);
    dataObjectsPage.waitForElementPresent('@dataObjectsTableBody');
  },
  'User goes to Users & Groups View': (client) => {
    const leftMenuPage = client.page.leftMenuPage();
    const usersPage = client.page.usersPage();

    leftMenuPage.clickButton('@users', client);
    usersPage.waitForElementPresent('@user');
  },
  'User goes to CodeBox Socket Traces View': (client) => {
    const socketsPage = client.page.socketsPage();
    const codeBoxTracesPage = client.page.codeBoxTracesPage();

    socketsPage.clickButton('@codeBoxSocketItemTraces', client);
    codeBoxTracesPage.waitForElementPresent('@codeBoxTracesEmptyView');
  }
};
