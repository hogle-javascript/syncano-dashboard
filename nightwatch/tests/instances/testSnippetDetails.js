module.exports = {
  tags: ['snippets'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .login(process.env.NIGHTWATCH_EMAIL, process.env.NIGHTWATCH_PASSWORD);
  },
  after(client) {
    client.end();
  },
  'User goes to Snippet edit view': (client) => {
    const socketsPage = client.page.socketsPage();
    const leftMenuPage = client.page.leftMenuPage();
    const snippetsPage = client.page.snippetsPage();
    const snippetEditPage = client.page.snippetEditPage();

    socketsPage.waitForElementPresent('@codeBoxSocketItem');
    leftMenuPage.clickElement('@snippets');
    snippetsPage.clickElement('@snippetListItem');
    snippetEditPage.waitForElementPresent('@snippetEditView');
  }
  //'User goes to Snippet traces view': (client) => {
  //  const instancesPage = client.page.instancesPage();
  //  const socketsPage = client.page.socketsPage();
  //  const leftMenuPage = client.page.leftMenuPage();
  //  const snippetsPage = client.page.snippetsPage();
  //  const snippetEditPage = client.page.snippetEditPage();
  //
  //  client.url(instancesPage.url);
  //  instancesPage.clickElement('@instancesTableName');
  //  socketsPage.waitForElementPresent('@codeBoxSocketItem');
  //  leftMenuPage.clickElement('@snippets');
  //  snippetsPage.clickElement('@snippetListItem');
  //  snippetEditPage.clickElement('@traces');
  //  snippetEditPage.waitForElementPresent('@tracesEmpty');
  //}
};
