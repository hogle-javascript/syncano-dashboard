module.exports = {
  tags: ['snippetTraces'],
  before(client) {
    const loginPage = client.page.loginPage();

    loginPage
      .navigate()
      .login(process.env.NIGHTWATCH_EMAIL, process.env.NIGHTWATCH_PASSWORD);
  },
  after(client) {
    client.end();
  },
  'User goes to CodeBox Traces View': (client) => {
    var socketsPage = client.page.socketsPage();
    socketsPage.waitForElementPresent('@codeBoxSocketItem');

    socketsPage.clickButton('@codeBoxSocketItemTraces');

    var codeBoxTracesPage = client.page.codeBoxTracesPage();

    codeBoxTracesPage.waitForElementPresent('@codeBoxTracesEmptyView');
  }
};
