module.exports = {
  tags: ['scripts'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .login(process.env.NIGHTWATCH_EMAIL, process.env.NIGHTWATCH_PASSWORD);
  },
  after(client) {
    client.end();
  },
  'User goes to Script edit view': (client) => {
    const socketsPage = client.page.socketsPage();
    const leftMenuPage = client.page.leftMenuPage();
    const scriptsPage = client.page.scriptsPage();
    const scriptEditPage = client.page.scriptEditPage();

    socketsPage.waitForElementPresent('@codeBoxSocketItem');
    leftMenuPage.clickElement('@scripts');
    scriptsPage.clickElement('@scriptListItem');
    scriptEditPage.waitForElementPresent('@scriptEditView');
  }
  //'User goes to Script traces view': (client) => {
  //  const instancesPage = client.page.instancesPage();
  //  const socketsPage = client.page.socketsPage();
  //  const leftMenuPage = client.page.leftMenuPage();
  //  const scriptsPage = client.page.scriptsPage();
  //  const scriptEditPage = client.page.scriptEditPage();
  //
  //  client.url(instancesPage.url);
  //  instancesPage.clickElement('@instancesTableName');
  //  socketsPage.waitForElementPresent('@codeBoxSocketItem');
  //  leftMenuPage.clickElement('@scripts');
  //  scriptsPage.clickElement('@scriptListItem');
  //  scriptEditPage.clickElement('@traces');
  //  scriptEditPage.waitForElementPresent('@tracesEmpty');
  //}
};
