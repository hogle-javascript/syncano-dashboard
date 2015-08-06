module.exports = {
  tags: ['channels'],
  before: function(client) {
    var loginPage = client.page.loginPage();
    loginPage.goToLoginPage();
    loginPage.typeEmail();
    loginPage.typePassword();
    loginPage.clickSignInButton();
    loginPage.verifyLoginSuccessful();

  },
  after: function(client) {
    client.end();
  },
  'User goes to Channels View' : function(client) {
    var instancesPage = client.page.instancesPage();
    instancesPage.clickButton('@instancesTableRow');
    
    var leftMenuPage = client.page.leftMenuPage();
    leftMenuPage.clickButton('@channels');

    var channelsPage = client.page.channelsPage();
    channelsPage.waitForElementPresent('@channelListItem');
  }
};