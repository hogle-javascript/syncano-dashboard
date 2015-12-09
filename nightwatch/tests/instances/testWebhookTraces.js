module.exports = {
  tags: ['webhookTraces'],
  before: function(client) {
    var loginPage = client.page.loginPage();
    loginPage.navigate();
    loginPage.typeEmail();
    loginPage.typePassword();
    loginPage.clickSignInButton();
    loginPage.verifyLoginSuccessful();

  },
  after: function(client) {
    client.end();
  },
  'User goes to Webhook Traces View' : function(client) {
    var instancesPage = client.page.instancesPage();
    instancesPage.clickButton('@instancesTableRow');

    var socketsPage = client.page.socketsPage();
    socketsPage.waitForElementPresent('@codeBoxSocketItem');

    socketsPage.clickButton('@codeBoxSocketItem');

    var webhookTracesPage = client.page.webhookTracesPage();

    webhookTracesPage.waitForElementPresent('@webhookTracesEmptyView');
  }
};