module.exports = {
  tags: ['codeBoxTraces'],
  before(client) {
    var loginPage = client.page.loginPage();
    loginPage.navigate();
    loginPage.typeEmail();
    loginPage.typePassword();
    loginPage.clickSignInButton();
    loginPage.verifyLoginSuccessful();

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
