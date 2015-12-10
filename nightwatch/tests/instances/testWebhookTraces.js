module.exports = {
  tags: ['webhookTraces'],
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
  'User goes to Webhook Traces View': (client) => {
    var instancesPage = client.page.instancesPage();
    instancesPage.clickButton('@instancesTableName');

    var socketsPage = client.page.socketsPage();
    socketsPage.waitForElementPresent('@codeBoxSocketItem');

    socketsPage.clickButton('@codeBoxSocketItem');

    var webhookTracesPage = client.page.webhookTracesPage();

    webhookTracesPage.waitForElementPresent('@webhookTracesEmptyView');
  }
};