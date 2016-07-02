import accounts from '../../tempAccounts';

module.exports = {
  tags: ['instanceNav'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .setResolution(client)
      .login(accounts.navigationUser.email, accounts.navigationUser.password);
  },
  after(client) {
    client.end();
  },
  beforeEach(client) {
    const instancesPage = client.page.instancesPage();

    instancesPage
      .navigate()
      .clickElement('@instancesTableName');
    client.pause(500);
  },
  // 'User goes to Sockets View': (client) => {
  //   const socketsPage = client.page.socketsPage();

  //   socketsPage.waitForElementPresent('@socketsDropDownAll');
  // },
  'User goes to Classes View': (client) => {
    const leftMenuPage = client.page.leftMenuPage();
    const classesPage = client.page.classesPage();

    leftMenuPage.clickElement('@classes');
    classesPage.waitForElementPresent('@userProfileClassName');
  },
  'User goes to Scripts edit view': (client) => {
    const leftMenuPage = client.page.leftMenuPage();
    const scriptsPage = client.page.scriptsPage();
    const scriptEditPage = client.page.scriptEditPage();

    leftMenuPage.clickElement('@scripts');
    // Workaround for endless loadings
    client.pause(1500);
    scriptsPage.clickElement('@scriptListItem');
    scriptEditPage.waitForElementPresent('@scriptEditView');
  },
  'User goes to Script traces view': (client) => {
    const leftMenuPage = client.page.leftMenuPage();
    const scriptsPage = client.page.scriptsPage();
    const scriptEditPage = client.page.scriptEditPage();

    leftMenuPage.clickElement('@scripts');
    // Workaround for endless loadings
    client.pause(1500);
    scriptsPage.clickElement('@scriptListItem');
    scriptEditPage
      .clickElement('@traces')
      .waitForElementPresent('@tracesEmpty');
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
  'User goes to Script Endpoint Traces View': (client) => {
    const scriptEndpointTracesPage = client.page.scriptEndpointTracesPage();
    const instanceName = accounts.navigationUser.instanceName;
    const tempScriptEndpointsNames = accounts.navigationUser.tempScriptEndpointsNames[0];

    scriptEndpointTracesPage
      .goToUrl(instanceName, `script-endpoints/${tempScriptEndpointsNames}/traces`)
      .waitForElementPresent('@scriptEndpointTracesEmptyView');
  }
};
